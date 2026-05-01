package com.flowboard.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskResponse {
    private Long id;
    private String title;
    private String description;
    private LocalDate dueDate;
    private String priority;
    private String status;
    private Long projectId;
    private String projectName;
    private UserResponse assignee;
    private UserResponse createdBy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public boolean isOverdue() {
        return dueDate != null && dueDate.isBefore(LocalDate.now()) && !"DONE".equals(status);
    }
}
