package com.flowboard.dto.request;

import com.flowboard.enums.TaskPriority;
import com.flowboard.enums.TaskStatus;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UpdateTaskRequest {

    private String title;

    private String description;

    private LocalDate dueDate;

    private TaskPriority priority;

    private TaskStatus status;

    private Long assigneeId;
}
