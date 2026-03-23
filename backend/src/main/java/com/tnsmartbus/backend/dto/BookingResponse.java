package com.tnsmartbus.backend.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BookingResponse {
    private Long bookingId;
    private Long userId;
    private Long busScheduleId;
    private Long busId;
    private String busName;
    private String busNumber;
    private String source;
    private String destination;
    private Integer seatNumber;
    private String departureTime;
    private String arrivalTime;
    private String bookingStatus;
    private String travelDate;
    private Double price;
}
