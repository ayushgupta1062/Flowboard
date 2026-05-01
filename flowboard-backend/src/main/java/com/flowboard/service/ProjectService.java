package com.flowboard.service;

import com.flowboard.dto.request.AddMemberRequest;
import com.flowboard.dto.request.CreateProjectRequest;
import com.flowboard.dto.request.UpdateProjectRequest;
import com.flowboard.dto.response.MemberResponse;
import com.flowboard.dto.response.ProjectDetailResponse;
import com.flowboard.dto.response.ProjectResponse;
import com.flowboard.dto.response.UserResponse;
import com.flowboard.entity.Project;
import com.flowboard.entity.ProjectMember;
import com.flowboard.entity.User;
import com.flowboard.enums.ProjectRole;
import com.flowboard.enums.TaskStatus;
import com.flowboard.exception.ConflictException;
import com.flowboard.exception.ForbiddenException;
import com.flowboard.exception.ResourceNotFoundException;
import com.flowboard.repository.ProjectMemberRepository;
import com.flowboard.repository.ProjectRepository;
import com.flowboard.repository.TaskRepository;
import com.flowboard.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectMemberRepository projectMemberRepository;
    private final UserRepository userRepository;
    private final TaskRepository taskRepository;

    private ProjectMember getProjectMember(Long projectId, Long userId) {
        return projectMemberRepository.findByProjectIdAndUserId(projectId, userId)
                .orElseThrow(() -> new ForbiddenException("You are not a member of this project"));
    }

    private void requireAdmin(Long projectId, Long userId) {
        ProjectMember member = getProjectMember(projectId, userId);
        if (member.getRole() != ProjectRole.ADMIN) {
            throw new ForbiddenException("Admin privileges required");
        }
    }

    public ProjectResponse createProject(CreateProjectRequest request, Long currentUserId) {
        User currentUser = userRepository.findById(currentUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Project project = Project.builder()
                .name(request.getName())
                .description(request.getDescription())
                .createdBy(currentUser)
                .build();

        project = projectRepository.save(project);

        ProjectMember member = ProjectMember.builder()
                .project(project)
                .user(currentUser)
                .role(ProjectRole.ADMIN)
                .build();

        projectMemberRepository.save(member);

        return buildProjectResponse(project, currentUser, ProjectRole.ADMIN, 1, 0, 0);
    }

    public List<ProjectResponse> getMyProjects(Long currentUserId) {
        List<Project> projects = projectRepository.findAllByMemberUserId(currentUserId);

        return projects.stream().map(project -> {
            ProjectMember myMembership = getProjectMember(project.getId(), currentUserId);
            int memberCount = (int) projectMemberRepository.countByProjectId(project.getId());
            long totalTasks = taskRepository.countByProjectId(project.getId());
            long completedTasks = taskRepository.countByProjectIdAndStatus(project.getId(), TaskStatus.DONE);

            return buildProjectResponse(project, project.getCreatedBy(), myMembership.getRole(), memberCount, totalTasks, completedTasks);
        }).collect(Collectors.toList());
    }

    public ProjectDetailResponse getProjectDetail(Long projectId, Long currentUserId) {
        ProjectMember myMembership = getProjectMember(projectId, currentUserId);

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));

        List<ProjectMember> members = projectMemberRepository.findAllByProjectId(projectId);

        List<MemberResponse> memberResponses = members.stream()
                .map(m -> MemberResponse.builder()
                        .id(m.getUser().getId())
                        .name(m.getUser().getName())
                        .email(m.getUser().getEmail())
                        .role(m.getRole().name())
                        .joinedAt(m.getJoinedAt())
                        .build())
                .collect(Collectors.toList());

        return ProjectDetailResponse.builder()
                .id(project.getId())
                .name(project.getName())
                .description(project.getDescription())
                .createdBy(buildUserResponse(project.getCreatedBy()))
                .members(memberResponses)
                .myRole(myMembership.getRole().name())
                .createdAt(project.getCreatedAt())
                .build();
    }

    public ProjectResponse updateProject(Long projectId, UpdateProjectRequest request, Long currentUserId) {
        requireAdmin(projectId, currentUserId);

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));

        if (request.getName() != null) {
            project.setName(request.getName());
        }
        if (request.getDescription() != null) {
            project.setDescription(request.getDescription());
        }

        project = projectRepository.save(project);

        int memberCount = (int) projectMemberRepository.countByProjectId(project.getId());
        long totalTasks = taskRepository.countByProjectId(project.getId());
        long completedTasks = taskRepository.countByProjectIdAndStatus(project.getId(), TaskStatus.DONE);

        return buildProjectResponse(project, project.getCreatedBy(), ProjectRole.ADMIN, memberCount, totalTasks, completedTasks);
    }

    public void deleteProject(Long projectId, Long currentUserId) {
        requireAdmin(projectId, currentUserId);
        
        if (!projectRepository.existsById(projectId)) {
            throw new ResourceNotFoundException("Project not found");
        }
        
        projectRepository.deleteById(projectId);
    }

    public MemberResponse addMember(Long projectId, AddMemberRequest request, Long currentUserId) {
        requireAdmin(projectId, currentUserId);

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));

        User targetUser = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + request.getEmail()));

        if (projectMemberRepository.existsByProjectIdAndUserId(projectId, targetUser.getId())) {
            throw new ConflictException("User is already a member of this project");
        }

        ProjectMember member = ProjectMember.builder()
                .project(project)
                .user(targetUser)
                .role(ProjectRole.MEMBER)
                .build();

        member = projectMemberRepository.save(member);

        return MemberResponse.builder()
                .id(targetUser.getId())
                .name(targetUser.getName())
                .email(targetUser.getEmail())
                .role(member.getRole().name())
                .joinedAt(member.getJoinedAt())
                .build();
    }

    public void removeMember(Long projectId, Long targetUserId, Long currentUserId) {
        requireAdmin(projectId, currentUserId);

        if (currentUserId.equals(targetUserId)) {
            List<ProjectMember> admins = projectMemberRepository.findAllByProjectId(projectId).stream()
                    .filter(m -> m.getRole() == ProjectRole.ADMIN)
                    .collect(Collectors.toList());

            if (admins.size() <= 1) {
                throw new ConflictException("Cannot remove the only admin of the project");
            }
        }

        if (!projectMemberRepository.existsByProjectIdAndUserId(projectId, targetUserId)) {
            throw new ResourceNotFoundException("User is not a member of this project");
        }

        projectMemberRepository.deleteByProjectIdAndUserId(projectId, targetUserId);
    }

    private ProjectResponse buildProjectResponse(Project project, User createdBy, ProjectRole role, int memberCount, long totalTasks, long completedTasks) {
        return ProjectResponse.builder()
                .id(project.getId())
                .name(project.getName())
                .description(project.getDescription())
                .createdBy(buildUserResponse(createdBy))
                .createdAt(project.getCreatedAt())
                .memberCount(memberCount)
                .totalTasks(totalTasks)
                .completedTasks(completedTasks)
                .myRole(role.name())
                .build();
    }

    private UserResponse buildUserResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
