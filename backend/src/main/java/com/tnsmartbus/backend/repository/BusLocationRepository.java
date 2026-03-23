package com.tnsmartbus.backend.repository;

import com.tnsmartbus.backend.model.BusLocation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BusLocationRepository extends JpaRepository<BusLocation, Long> {
    Optional<BusLocation> findTopByBusIdOrderByLastUpdatedDesc(Long busId);
    boolean existsByBusId(Long busId);
}
