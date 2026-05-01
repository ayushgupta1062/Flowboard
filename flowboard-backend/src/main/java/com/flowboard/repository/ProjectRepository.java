package com.flowboard.repository;

import com.flowboard.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    
    @Query("SELECT DISTINCT p FROM Project p JOIN ProjectMember pm ON pm.project = p WHERE pm.user.id = :userId")
    List<Project> findAllByMemberUserId(@Param("userId") Long userId);
}
