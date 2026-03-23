package com.tnsmartbus.backend.service;

import com.tnsmartbus.backend.dto.BusLocationResponse;
import com.tnsmartbus.backend.model.BusLocation;
import com.tnsmartbus.backend.repository.BusLocationRepository;
import org.springframework.stereotype.Service;

@Service
public class TrackingService {

    private final BusLocationRepository busLocationRepository;

    public TrackingService(BusLocationRepository busLocationRepository) {
        this.busLocationRepository = busLocationRepository;
    }

    public BusLocationResponse getBusLocation(Long busId) {
        BusLocation location = busLocationRepository.findTopByBusIdOrderByLastUpdatedDesc(busId)
                .orElseThrow(() -> new IllegalArgumentException("Bus location not available"));

        return BusLocationResponse.builder()
                .busId(location.getBus().getId())
                .busName(location.getBus().getBusName())
                .latitude(location.getLatitude())
                .longitude(location.getLongitude())
                .lastUpdated(location.getLastUpdated().toString())
                .build();
    }
}
