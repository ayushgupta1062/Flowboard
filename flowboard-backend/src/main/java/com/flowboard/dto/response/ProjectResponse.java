package com.flowboard.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectResponse {
    private Long id;
    private String name;
    private String description;
    private UserResponse createdBy;
    private LocalDateTime createdAt;
    private int memberCount;
    private long totalTasks;
    private long completedTasks;
    private String myRole;
    
    public double getProgressPercentage() {
        return totalTasks > 0 ? (completedTasks * 100.0 / totalTasks) : 0;
    }
}
