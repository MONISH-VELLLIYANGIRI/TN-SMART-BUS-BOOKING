package com.tnsmartbus.backend.service;

import com.tnsmartbus.backend.dto.BookingRequest;
import com.tnsmartbus.backend.dto.BookingResponse;
import com.tnsmartbus.backend.model.Booking;
import com.tnsmartbus.backend.model.BusSchedule;
import com.tnsmartbus.backend.model.User;
import com.tnsmartbus.backend.repository.BookingRepository;
import com.tnsmartbus.backend.repository.BusScheduleRepository;
import com.tnsmartbus.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final BusScheduleRepository busScheduleRepository;

    public BookingService(BookingRepository bookingRepository,
                          UserRepository userRepository,
                          BusScheduleRepository busScheduleRepository) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.busScheduleRepository = busScheduleRepository;
    }

    public BookingResponse createBooking(BookingRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        BusSchedule busSchedule = busScheduleRepository.findById(request.getBusScheduleId())
                .orElseThrow(() -> new IllegalArgumentException("Bus schedule not found"));

        if (request.getSeatNumber() < 1 || request.getSeatNumber() > busSchedule.getBus().getTotalSeats()) {
            throw new IllegalArgumentException("Seat number out of range");
        }

        boolean seatTaken = bookingRepository.existsByBusScheduleIdAndTravelDateAndSeatNumberAndBookingStatus(
                request.getBusScheduleId(),
                request.getTravelDate(),
                request.getSeatNumber(),
                "CONFIRMED"
        );

        if (seatTaken) {
            throw new IllegalArgumentException("Seat already booked");
        }

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setBusSchedule(busSchedule);
        booking.setSeatNumber(request.getSeatNumber());
        booking.setBookingStatus("CONFIRMED");
        booking.setTravelDate(request.getTravelDate());
        booking.setCreatedAt(LocalDateTime.now());

        Booking savedBooking = bookingRepository.save(booking);
        return toResponse(savedBooking);
    }

    public List<BookingResponse> getUserBookings(Long userId) {
        return bookingRepository.findByUserIdOrderByTravelDateAscCreatedAtDesc(userId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public BookingResponse cancelBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new IllegalArgumentException("Booking not found"));
        booking.setBookingStatus("CANCELLED");
        Booking saved = bookingRepository.save(booking);
        return toResponse(saved);
    }

    private BookingResponse toResponse(Booking booking) {
        return BookingResponse.builder()
                .bookingId(booking.getId())
                .userId(booking.getUser().getId())
                .busScheduleId(booking.getBusSchedule().getId())
            .busId(booking.getBusSchedule().getBus().getId())
                .busName(booking.getBusSchedule().getBus().getBusName())
                .busNumber(booking.getBusSchedule().getBus().getBusNumber())
                .source(booking.getBusSchedule().getRoute().getSource())
                .destination(booking.getBusSchedule().getRoute().getDestination())
                .seatNumber(booking.getSeatNumber())
                .departureTime(booking.getBusSchedule().getDepartureTime().toString())
                .arrivalTime(booking.getBusSchedule().getArrivalTime().toString())
                .bookingStatus(booking.getBookingStatus())
                .travelDate(booking.getTravelDate().toString())
                .price(booking.getBusSchedule().getPrice())
                .build();
    }
}
