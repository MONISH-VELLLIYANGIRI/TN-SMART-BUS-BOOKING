package com.tnsmartbus.backend.repository;

import com.tnsmartbus.backend.model.BusSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalTime;
import java.util.List;

public interface BusScheduleRepository extends JpaRepository<BusSchedule, Long> {

    @Query("""
        SELECT bs FROM BusSchedule bs
        WHERE LOWER(TRIM(bs.route.source)) = LOWER(TRIM(:source))
          AND LOWER(TRIM(bs.route.destination)) = LOWER(TRIM(:destination))
          AND (:time IS NULL OR bs.departureTime >= :time)
        ORDER BY bs.departureTime ASC
        """)
    List<BusSchedule> searchBySourceDestination(@Param("source") String source,
                                                @Param("destination") String destination,
                                                @Param("time") LocalTime time);

    boolean existsByBusIdAndRouteIdAndDepartureTime(Long busId, Long routeId, LocalTime departureTime);
}
