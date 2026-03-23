package com.tnsmartbus.backend.repository;

import com.tnsmartbus.backend.model.Bus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BusRepository extends JpaRepository<Bus, Long> {
	Optional<Bus> findByBusNumber(String busNumber);
}
