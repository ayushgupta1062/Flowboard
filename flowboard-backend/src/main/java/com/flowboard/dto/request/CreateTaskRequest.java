package com.flowboard.dto.request;

import com.flowboard.enums.TaskPriority;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;

@Data
public class CreateTaskRequest {

    @NotBlank(message = "Task title is required")
    @Size(max = 200)
    private String title;

    private String description;

    private LocalDate dueDate;

    private TaskPriority priority;

    private Long assigneeId;
}
