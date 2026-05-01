package com.flowboard.service;

import com.flowboard.dto.response.DashboardResponse;
import com.flowboard.dto.response.TaskResponse;
import com.flowboard.dto.response.UserResponse;
import com.flowboard.entity.Project;
import com.flowboard.entity.Task;
import com.flowboard.entity.User;
import com.flowboard.enums.TaskStatus;
import com.flowboard.repository.ProjectRepository;
import com.flowboard.repository.TaskRepository;
import com.flowboard.repository.UserRepository;
import com.flowboard.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.flowboard.repository.ProjectMemberRepository;
import com.flowboard.enums.ProjectRole;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DashboardService {

    private final ProjectRepository projectRepository;
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final ProjectMemberRepository projectMemberRepository;

    public DashboardResponse getSummary(Long currentUserId) {
        List<Project> userProjects = projectRepository.findAllByMemberUserId(currentUserId);
        
        if (userProjects.isEmpty()) {
            return DashboardResponse.builder()
                    .totalProjects(0L)
                    .totalTasks(0L)
                    .todoCount(0L)
                    .inProgressCount(0L)
                    .doneCount(0L)
                    .overdueCount(0L)
                    .overdueTasks(new ArrayList<>())
                    .tasksByUser(new ArrayList<>())
                    .recentTasks(new ArrayList<>())
                    .build();
        }

        List<Long> projectIds = userProjects.stream().map(Project::getId).collect(Collectors.toList());

        long totalProjects = projectIds.size();
        
        long totalTasks = 0;
        long todoCount = 0;
        long inProgressCount = 0;
        long doneCount = 0;

        List<Long> adminProjectIds = new ArrayList<>();
        List<Long> memberProjectIds = new ArrayList<>();

        for (Project project : userProjects) {
            ProjectRole role = projectMemberRepository.findByProjectIdAndUserId(project.getId(), currentUserId)
                    .map(com.flowboard.entity.ProjectMember::getRole)
                    .orElse(ProjectRole.MEMBER);

            if (role == ProjectRole.ADMIN) {
                adminProjectIds.add(project.getId());
                totalTasks += taskRepository.countByProjectId(project.getId());
                todoCount += taskRepository.countByProjectIdAndStatus(project.getId(), TaskStatus.TODO);
                inProgressCount += taskRepository.countByProjectIdAndStatus(project.getId(), TaskStatus.IN_PROGRESS);
                doneCount += taskRepository.countByProjectIdAndStatus(project.getId(), TaskStatus.DONE);
            } else {
                memberProjectIds.add(project.getId());
                totalTasks += taskRepository.countByAssigneeIdAndProjectId(currentUserId, project.getId());
                todoCount += taskRepository.countByAssigneeIdAndProjectIdAndStatus(currentUserId, project.getId(), TaskStatus.TODO);
                inProgressCount += taskRepository.countByAssigneeIdAndProjectIdAndStatus(currentUserId, project.getId(), TaskStatus.IN_PROGRESS);
                doneCount += taskRepository.countByAssigneeIdAndProjectIdAndStatus(currentUserId, project.getId(), TaskStatus.DONE);
            }
        }

        List<Task> overdueTaskList = new ArrayList<>();
        if (!adminProjectIds.isEmpty()) {
            overdueTaskList.addAll(taskRepository.findOverdueTasks(adminProjectIds, LocalDate.now()));
        }
        if (!memberProjectIds.isEmpty()) {
            overdueTaskList.addAll(taskRepository.findOverdueTasksForAssignee(currentUserId, memberProjectIds, LocalDate.now()));
        }

        List<Task> recentTaskList = new ArrayList<>();
        if (!adminProjectIds.isEmpty()) {
            recentTaskList.addAll(taskRepository.findRecentTasks(adminProjectIds, PageRequest.of(0, 5)));
        }
        if (!memberProjectIds.isEmpty()) {
            recentTaskList.addAll(taskRepository.findRecentTasksForAssignee(currentUserId, memberProjectIds, PageRequest.of(0, 5)));
        }
        
        // Sort and limit recent tasks
        recentTaskList = recentTaskList.stream()
                .sorted((t1, t2) -> t2.getUpdatedAt().compareTo(t1.getUpdatedAt()))
                .limit(5)
                .collect(Collectors.toList());

        long overdueCount = overdueTaskList.size();
        List<TaskResponse> overdueTasks = overdueTaskList.stream()
                .limit(10)
                .map(this::buildTaskResponse)
                .collect(Collectors.toList());

        List<TaskResponse> recentTasks = recentTaskList.stream()
                .map(this::buildTaskResponse)
                .collect(Collectors.toList());

        List<Object[]> userStatsRaw = taskRepository.countTasksGroupedByAssignee(projectIds);
        List<DashboardResponse.TaskUserStat> tasksByUser = userStatsRaw.stream()
                .map(obj -> new DashboardResponse.TaskUserStat((Long) obj[0], (String) obj[1], (Long) obj[2]))
                .collect(Collectors.toList());

        return DashboardResponse.builder()
                .totalProjects(totalProjects)
                .totalTasks(totalTasks)
                .todoCount(todoCount)
                .inProgressCount(inProgressCount)
                .doneCount(doneCount)
                .overdueCount(overdueCount)
                .overdueTasks(overdueTasks)
                .tasksByUser(tasksByUser)
                .recentTasks(recentTasks)
                .build();
    }

    private TaskResponse buildTaskResponse(Task task) {
        UserResponse assigneeRes = task.getAssignee() != null ? buildUserResponse(task.getAssignee()) : null;
        UserResponse createdByRes = buildUserResponse(task.getCreatedBy());

        return TaskResponse.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .dueDate(task.getDueDate())
                .priority(task.getPriority().name())
                .status(task.getStatus().name())
                .projectId(task.getProject().getId())
                .projectName(task.getProject().getName())
                .assignee(assigneeRes)
                .createdBy(createdByRes)
                .createdAt(task.getCreatedAt())
                .updatedAt(task.getUpdatedAt())
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
