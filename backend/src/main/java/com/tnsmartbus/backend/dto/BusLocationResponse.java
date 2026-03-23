package com.tnsmartbus.backend.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BusLocationResponse {
    private Long busId;
    private String busName;
    private Double latitude;
    private Double longitude;
    private String lastUpdated;
}
