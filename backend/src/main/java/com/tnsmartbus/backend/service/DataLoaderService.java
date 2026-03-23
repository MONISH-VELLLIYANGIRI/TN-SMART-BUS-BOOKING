package com.tnsmartbus.backend.service;

import com.tnsmartbus.backend.model.*;
import com.tnsmartbus.backend.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Component
public class DataLoaderService implements CommandLineRunner {

    private final BusRepository busRepository;
    private final RouteRepository routeRepository;
    private final BusScheduleRepository busScheduleRepository;
    private final BusLocationRepository busLocationRepository;

    public DataLoaderService(BusRepository busRepository,
                             RouteRepository routeRepository,
                             BusScheduleRepository busScheduleRepository,
                             BusLocationRepository busLocationRepository) {
        this.busRepository = busRepository;
        this.routeRepository = routeRepository;
        this.busScheduleRepository = busScheduleRepository;
        this.busLocationRepository = busLocationRepository;
    }

    @Override
    public void run(String... args) {
        Bus bus1 = ensureBus("TN Smart Express", "TN-36-B-1201", "Semi Sleeper", 40);
        Bus bus2 = ensureBus("Kongu Rider", "TN-36-B-1212", "Ordinary", 48);
        Bus bus3 = ensureBus("Cauvery Comfort", "TN-58-C-4433", "AC Seater", 42);
        Bus bus4 = ensureBus("Madurai Night Line", "TN-64-N-7788", "Sleeper", 36);
        Bus bus5 = ensureBus("Salem Fast Track", "TN-30-F-9090", "Express", 45);

        Route route1 = ensureRoute("Gobichettipalayam", "Perundurai", 28.0);
        Route route2 = ensureRoute("Erode", "Coimbatore", 100.0);
        Route route3 = ensureRoute("Salem", "Chennai", 340.0);
        Route route4 = ensureRoute("Madurai", "Trichy", 135.0);

        ensureSchedule(bus1, route1, LocalTime.of(9, 0), LocalTime.of(10, 0), 45.0);
        ensureSchedule(bus2, route1, LocalTime.of(11, 30), LocalTime.of(12, 35), 35.0);
        ensureSchedule(bus3, route2, LocalTime.of(6, 15), LocalTime.of(8, 15), 120.0);
        ensureSchedule(bus1, route2, LocalTime.of(14, 0), LocalTime.of(16, 0), 115.0);
        ensureSchedule(bus4, route3, LocalTime.of(21, 30), LocalTime.of(4, 45), 520.0);
        ensureSchedule(bus5, route3, LocalTime.of(7, 0), LocalTime.of(13, 45), 480.0);
        ensureSchedule(bus2, route4, LocalTime.of(8, 45), LocalTime.of(11, 10), 150.0);
        ensureSchedule(bus3, route4, LocalTime.of(16, 20), LocalTime.of(18, 40), 160.0);

        ensureLocation(bus1, 11.4542, 77.4429);
        ensureLocation(bus2, 11.3368, 77.7172);
        ensureLocation(bus3, 11.0168, 76.9558);
        ensureLocation(bus4, 9.9252, 78.1198);
        ensureLocation(bus5, 11.6643, 78.1460);
    }

    private Bus ensureBus(String busName, String busNumber, String busType, int totalSeats) {
        return busRepository.findByBusNumber(busNumber)
                .orElseGet(() -> {
                    Bus bus = new Bus();
                    bus.setBusName(busName);
                    bus.setBusNumber(busNumber);
                    bus.setBusType(busType);
                    bus.setTotalSeats(totalSeats);
                    return busRepository.save(bus);
                });
    }

    private Route ensureRoute(String source, String destination, double distance) {
        return routeRepository.findBySourceIgnoreCaseAndDestinationIgnoreCase(source, destination)
                .orElseGet(() -> {
                    Route route = new Route();
                    route.setSource(source);
                    route.setDestination(destination);
                    route.setDistance(distance);
                    return routeRepository.save(route);
                });
    }

    private void ensureSchedule(Bus bus, Route route, LocalTime departureTime, LocalTime arrivalTime, double price) {
        boolean exists = busScheduleRepository.existsByBusIdAndRouteIdAndDepartureTime(
                bus.getId(),
                route.getId(),
                departureTime
        );

        if (exists) {
            return;
        }

        BusSchedule schedule = new BusSchedule();
        schedule.setBus(bus);
        schedule.setRoute(route);
        schedule.setDepartureTime(departureTime);
        schedule.setArrivalTime(arrivalTime);
        schedule.setPrice(price);
        busScheduleRepository.save(schedule);
    }

    private void ensureLocation(Bus bus, double latitude, double longitude) {
        if (busLocationRepository.existsByBusId(bus.getId())) {
            return;
        }

        BusLocation location = new BusLocation();
        location.setBus(bus);
        location.setLatitude(latitude);
        location.setLongitude(longitude);
        location.setLastUpdated(LocalDateTime.now());
        busLocationRepository.save(location);
    }
}
