package com.flowboard.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResponse {
    private Long totalProjects;
    private Long totalTasks;
    private Long todoCount;
    private Long inProgressCount;
    private Long doneCount;
    private Long overdueCount;
    private List<TaskResponse> overdueTasks;
    private List<TaskUserStat> tasksByUser;
    private List<TaskResponse> recentTasks;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class TaskUserStat {
        private Long userId;
        private String userName;
        private Long taskCount;
    }
}
