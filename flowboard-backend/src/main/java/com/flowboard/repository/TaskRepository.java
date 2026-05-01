package com.flowboard.repository;

import com.flowboard.entity.Task;
import com.flowboard.enums.TaskStatus;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findAllByProjectId(Long projectId);

    List<Task> findAllByProjectIdOrderByCreatedAtDesc(Long projectId);
    
    List<Task> findAllByProjectIdAndAssigneeIdOrderByCreatedAtDesc(Long projectId, Long assigneeId);

    long countByProjectIdAndStatus(Long projectId, TaskStatus status);

    long countByProjectId(Long projectId);

    long countByAssigneeIdAndProjectId(Long assigneeId, Long projectId);

    long countByAssigneeIdAndProjectIdAndStatus(Long assigneeId, Long projectId, TaskStatus status);

    @Query("SELECT t FROM Task t WHERE t.project.id IN :projectIds AND t.dueDate < :today AND t.status != 'DONE' ORDER BY t.dueDate ASC")
    List<Task> findOverdueTasks(@Param("projectIds") List<Long> projectIds, @Param("today") LocalDate today);

    @Query("SELECT t FROM Task t WHERE t.project.id IN :projectIds ORDER BY t.updatedAt DESC")
    List<Task> findRecentTasks(@Param("projectIds") List<Long> projectIds, Pageable pageable);

    @Query("SELECT t.assignee.id, t.assignee.name, COUNT(t) FROM Task t WHERE t.project.id IN :projectIds AND t.assignee IS NOT NULL GROUP BY t.assignee.id, t.assignee.name")
    List<Object[]> countTasksGroupedByAssignee(@Param("projectIds") List<Long> projectIds);
    @Query("SELECT COUNT(t) FROM Task t WHERE t.assignee.id = :assigneeId AND t.project.id IN :projectIds")
    long countByAssigneeIdAndProjectIds(@Param("assigneeId") Long assigneeId, @Param("projectIds") List<Long> projectIds);

    @Query("SELECT COUNT(t) FROM Task t WHERE t.assignee.id = :assigneeId AND t.project.id IN :projectIds AND t.status = :status")
    long countByAssigneeIdAndProjectIdsAndStatus(@Param("assigneeId") Long assigneeId, @Param("projectIds") List<Long> projectIds, @Param("status") TaskStatus status);

    @Query("SELECT t FROM Task t WHERE t.project.id IN :projectIds AND t.assignee.id = :assigneeId AND t.dueDate < :today AND t.status != 'DONE' ORDER BY t.dueDate ASC")
    List<Task> findOverdueTasksForAssignee(@Param("assigneeId") Long assigneeId, @Param("projectIds") List<Long> projectIds, @Param("today") LocalDate today);

    @Query("SELECT t FROM Task t WHERE t.project.id IN :projectIds AND t.assignee.id = :assigneeId ORDER BY t.updatedAt DESC")
    List<Task> findRecentTasksForAssignee(@Param("assigneeId") Long assigneeId, @Param("projectIds") List<Long> projectIds, Pageable pageable);
}
