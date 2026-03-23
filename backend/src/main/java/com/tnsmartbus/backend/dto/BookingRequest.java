package com.tnsmartbus.backend.dto;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class BookingRequest {

    @NotNull
    private Long userId;

    @NotNull
    private Long busScheduleId;

    @NotNull
    private Integer seatNumber;

    @NotNull
    @FutureOrPresent
    private LocalDate travelDate;
}
