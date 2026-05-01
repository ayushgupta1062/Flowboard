package com.flowboard.service;

import com.flowboard.dto.request.CreateTaskRequest;
import com.flowboard.dto.request.UpdateTaskRequest;
import com.flowboard.dto.response.TaskResponse;
import com.flowboard.dto.response.UserResponse;
import com.flowboard.entity.Project;
import com.flowboard.entity.ProjectMember;
import com.flowboard.entity.Task;
import com.flowboard.entity.User;
import com.flowboard.enums.ProjectRole;
import com.flowboard.enums.TaskPriority;
import com.flowboard.enums.TaskStatus;
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
public class TaskService {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final ProjectMemberRepository projectMemberRepository;
    private final UserRepository userRepository;

    private void requireAdmin(Long projectId, Long userId) {
        ProjectMember member = projectMemberRepository.findByProjectIdAndUserId(projectId, userId)
                .orElseThrow(() -> new ForbiddenException("You are not a member of this project"));
        if (member.getRole() != ProjectRole.ADMIN) {
            throw new ForbiddenException("Admin privileges required");
        }
    }

    private void verifyMember(Long projectId, Long userId) {
        if (!projectMemberRepository.existsByProjectIdAndUserId(projectId, userId)) {
            throw new ForbiddenException("You are not a member of this project");
        }
    }

    public TaskResponse createTask(Long projectId, CreateTaskRequest request, Long currentUserId) {
        requireAdmin(projectId, currentUserId);

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));

        User createdBy = userRepository.findById(currentUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        User assignee = null;
        if (request.getAssigneeId() != null) {
            verifyMember(projectId, request.getAssigneeId());
            assignee = userRepository.findById(request.getAssigneeId())
                    .orElseThrow(() -> new ResourceNotFoundException("Assignee not found"));
        }

        Task task = Task.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .dueDate(request.getDueDate())
                .priority(request.getPriority() != null ? request.getPriority() : TaskPriority.MEDIUM)
                .status(TaskStatus.TODO)
                .project(project)
                .assignee(assignee)
                .createdBy(createdBy)
                .build();

        task = taskRepository.save(task);

        return buildTaskResponse(task);
    }

    public List<TaskResponse> getProjectTasks(Long projectId, Long currentUserId) {
        ProjectMember member = projectMemberRepository.findByProjectIdAndUserId(projectId, currentUserId)
                .orElseThrow(() -> new ForbiddenException("You are not a member of this project"));

        List<Task> tasks;
        if (member.getRole() == ProjectRole.ADMIN) {
            tasks = taskRepository.findAllByProjectIdOrderByCreatedAtDesc(projectId);
        } else {
            tasks = taskRepository.findAllByProjectIdAndAssigneeIdOrderByCreatedAtDesc(projectId, currentUserId);
        }
        
        return tasks.stream().map(this::buildTaskResponse).collect(Collectors.toList());
    }

    public TaskResponse getTask(Long taskId, Long currentUserId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        verifyMember(task.getProject().getId(), currentUserId);

        return buildTaskResponse(task);
    }

    public TaskResponse updateTask(Long taskId, UpdateTaskRequest request, Long currentUserId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        ProjectMember member = projectMemberRepository.findByProjectIdAndUserId(task.getProject().getId(), currentUserId)
                .orElseThrow(() -> new ForbiddenException("You are not a member of this project"));

        boolean isAdmin = member.getRole() == ProjectRole.ADMIN;
        boolean isAssignee = task.getAssignee() != null && task.getAssignee().getId().equals(currentUserId);

        if (!isAdmin) {
            if (!isAssignee) {
                throw new ForbiddenException("You can only update tasks assigned to you");
            }
            // Members can only update status
            if (request.getTitle() != null || request.getDescription() != null || request.getDueDate() != null || request.getPriority() != null || request.getAssigneeId() != null) {
                throw new ForbiddenException("Members can only update task status");
            }
        }

        if (request.getTitle() != null) task.setTitle(request.getTitle());
        if (request.getDescription() != null) task.setDescription(request.getDescription());
        if (request.getDueDate() != null) task.setDueDate(request.getDueDate());
        if (request.getPriority() != null) task.setPriority(request.getPriority());
        if (request.getStatus() != null) task.setStatus(request.getStatus());

        if (isAdmin && request.getAssigneeId() != null) {
            if (request.getAssigneeId() == -1L) {
                task.setAssignee(null);
            } else {
                verifyMember(task.getProject().getId(), request.getAssigneeId());
                User newAssignee = userRepository.findById(request.getAssigneeId())
                        .orElseThrow(() -> new ResourceNotFoundException("Assignee not found"));
                task.setAssignee(newAssignee);
            }
        }

        task = taskRepository.save(task);

        return buildTaskResponse(task);
    }

    public void deleteTask(Long taskId, Long currentUserId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        requireAdmin(task.getProject().getId(), currentUserId);

        taskRepository.delete(task);
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
