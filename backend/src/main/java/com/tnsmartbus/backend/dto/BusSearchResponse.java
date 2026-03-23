package com.tnsmartbus.backend.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BusSearchResponse {
    private Long busScheduleId;
    private Long busId;
    private String busName;
    private String busNumber;
    private String busType;
    private String source;
    private String destination;
    private String departureTime;
    private String arrivalTime;
    private Double price;
    private Integer totalSeats;
    private Integer availableSeats;
}
