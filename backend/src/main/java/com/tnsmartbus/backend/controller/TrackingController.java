package com.tnsmartbus.backend.controller;

import com.tnsmartbus.backend.dto.BusLocationResponse;
import com.tnsmartbus.backend.service.TrackingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bus")
public class TrackingController {

    private final TrackingService trackingService;

    public TrackingController(TrackingService trackingService) {
        this.trackingService = trackingService;
    }

    @GetMapping("/location/{busId}")
    public ResponseEntity<BusLocationResponse> getBusLocation(@PathVariable Long busId) {
        return ResponseEntity.ok(trackingService.getBusLocation(busId));
    }
}
