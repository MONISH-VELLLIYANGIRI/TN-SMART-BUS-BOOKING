package com.tnsmartbus.backend.repository;

import com.tnsmartbus.backend.model.Route;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RouteRepository extends JpaRepository<Route, Long> {
	Optional<Route> findBySourceIgnoreCaseAndDestinationIgnoreCase(String source, String destination);
}
