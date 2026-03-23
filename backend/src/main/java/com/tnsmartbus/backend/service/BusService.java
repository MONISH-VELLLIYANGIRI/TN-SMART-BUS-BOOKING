package com.tnsmartbus.backend.service;

import com.tnsmartbus.backend.dto.BusSearchResponse;
import com.tnsmartbus.backend.model.Bus;
import com.tnsmartbus.backend.model.BusSchedule;
import com.tnsmartbus.backend.repository.BookingRepository;
import com.tnsmartbus.backend.repository.BusRepository;
import com.tnsmartbus.backend.repository.BusScheduleRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class BusService {

    private final BusScheduleRepository busScheduleRepository;
    private final BusRepository busRepository;
    private final BookingRepository bookingRepository;

    public BusService(BusScheduleRepository busScheduleRepository,
                      BusRepository busRepository,
                      BookingRepository bookingRepository) {
        this.busScheduleRepository = busScheduleRepository;
        this.busRepository = busRepository;
        this.bookingRepository = bookingRepository;
    }

    public List<BusSearchResponse> searchBuses(String source, String destination, LocalDate travelDate, LocalTime time) {
        String normalizedSource = source == null ? "" : source.trim();
        String normalizedDestination = destination == null ? "" : destination.trim();

        List<BusSchedule> schedules = busScheduleRepository.searchBySourceDestination(
                normalizedSource,
                normalizedDestination,
                time
        );

        return schedules.stream().map(schedule -> {
            int bookedSeats = (int) bookingRepository.countByBusScheduleIdAndTravelDateAndBookingStatus(
                    schedule.getId(),
                    travelDate,
                    "CONFIRMED"
            );
            int availableSeats = Math.max(0, schedule.getBus().getTotalSeats() - bookedSeats);

            return BusSearchResponse.builder()
                    .busScheduleId(schedule.getId())
                    .busId(schedule.getBus().getId())
                    .busName(schedule.getBus().getBusName())
                    .busNumber(schedule.getBus().getBusNumber())
                    .busType(schedule.getBus().getBusType())
                    .source(schedule.getRoute().getSource())
                    .destination(schedule.getRoute().getDestination())
                    .departureTime(schedule.getDepartureTime().toString())
                    .arrivalTime(schedule.getArrivalTime().toString())
                    .price(schedule.getPrice())
                    .totalSeats(schedule.getBus().getTotalSeats())
                    .availableSeats(availableSeats)
                    .build();
        }).toList();
    }

    public Bus getBusById(Long busId) {
        return busRepository.findById(busId)
                .orElseThrow(() -> new IllegalArgumentException("Bus not found"));
    }
}
