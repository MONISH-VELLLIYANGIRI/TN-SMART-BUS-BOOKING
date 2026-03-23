package com.tnsmartbus.backend.repository;

import com.tnsmartbus.backend.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserIdOrderByTravelDateAscCreatedAtDesc(Long userId);
    long countByBusScheduleIdAndTravelDateAndBookingStatus(Long busScheduleId, LocalDate travelDate, String bookingStatus);
    boolean existsByBusScheduleIdAndTravelDateAndSeatNumberAndBookingStatus(Long busScheduleId, LocalDate travelDate, Integer seatNumber, String bookingStatus);
}
