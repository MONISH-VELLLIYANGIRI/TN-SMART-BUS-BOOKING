package com.tnsmartbus.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "buses")
@Getter
@Setter
@NoArgsConstructor
public class Bus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "bus_number", nullable = false, unique = true)
    private String busNumber;

    @Column(name = "bus_name", nullable = false)
    private String busName;

    @Column(name = "bus_type", nullable = false)
    private String busType;

    @Column(name = "total_seats", nullable = false)
    private Integer totalSeats;
}
