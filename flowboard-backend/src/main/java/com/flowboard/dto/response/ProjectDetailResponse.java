package com.flowboard.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDetailResponse {
    private Long id;
    private String name;
    private String description;
    private UserResponse createdBy;
    private List<MemberResponse> members;
    private String myRole;
    private LocalDateTime createdAt;
}
