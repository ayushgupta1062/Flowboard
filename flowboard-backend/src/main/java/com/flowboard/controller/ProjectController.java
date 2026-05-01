package com.flowboard.controller;

import com.flowboard.dto.request.AddMemberRequest;
import com.flowboard.dto.request.CreateProjectRequest;
import com.flowboard.dto.request.UpdateProjectRequest;
import com.flowboard.dto.response.MemberResponse;
import com.flowboard.dto.response.ProjectDetailResponse;
import com.flowboard.dto.response.ProjectResponse;
import com.flowboard.entity.User;
import com.flowboard.repository.UserRepository;
import com.flowboard.service.ProjectService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;
    private final UserRepository userRepository;

    private Long getCurrentUserId() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getId();
    }

    @GetMapping
    public ResponseEntity<List<ProjectResponse>> getProjects() {
        return ResponseEntity.ok(projectService.getMyProjects(getCurrentUserId()));
    }

    @PostMapping
    public ResponseEntity<ProjectResponse> createProject(@Valid @RequestBody CreateProjectRequest request) {
        return new ResponseEntity<>(projectService.createProject(request, getCurrentUserId()), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectDetailResponse> getProjectDetail(@PathVariable Long id) {
        return ResponseEntity.ok(projectService.getProjectDetail(id, getCurrentUserId()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjectResponse> updateProject(
            @PathVariable Long id,
            @Valid @RequestBody UpdateProjectRequest request
    ) {
        return ResponseEntity.ok(projectService.updateProject(id, request, getCurrentUserId()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id, getCurrentUserId());
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/members")
    public ResponseEntity<MemberResponse> addMember(
            @PathVariable Long id,
            @Valid @RequestBody AddMemberRequest request
    ) {
        return new ResponseEntity<>(projectService.addMember(id, request, getCurrentUserId()), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}/members/{userId}")
    public ResponseEntity<Void> removeMember(
            @PathVariable Long id,
            @PathVariable Long userId
    ) {
        projectService.removeMember(id, userId, getCurrentUserId());
        return ResponseEntity.noContent().build();
    }
}
