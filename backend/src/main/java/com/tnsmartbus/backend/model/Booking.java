package com.tnsmartbus.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
@Getter
@Setter
@NoArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "bus_schedule_id", nullable = false)
    private BusSchedule busSchedule;

    @Column(name = "seat_number", nullable = false)
    private Integer seatNumber;

    @Column(name = "booking_status", nullable = false)
    private String bookingStatus;

    @Column(name = "travel_date", nullable = false)
    private LocalDate travelDate;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
}
