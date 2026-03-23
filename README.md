# TN Smart Bus - Smart Bus Booking and Tracking System

This repository contains a full-stack starter implementation for:
- User authentication with JWT
- Bus search by source, destination, and date
- Seat booking with availability checks
- My bookings with cancel action
- Basic live bus tracking via location API and Google Maps link

## Project Structure

- backend: Spring Boot + Maven + MySQL + JWT
- frontend: React + Vite + React Router + Axios

## Backend Setup

1. Open a terminal in backend.
2. Update database credentials in src/main/resources/application.properties.
3. Ensure MySQL is running.
4. Run:

   
   

Backend starts at http://localhost:8080

## Frontend Setup

1. Open a terminal in frontend.
2. Install packages:

   npm install

3. Run:

   npm run dev

Frontend starts at http://localhost:5173

## Core API Endpoints

Auth:
- POST /api/auth/signup
- POST /api/auth/login

Buses:
- GET /api/buses/search?source=&destination=&date=
- GET /api/buses/{id}

Bookings:
- POST /api/bookings
- GET /api/bookings/user/{userId}
- PUT /api/bookings/{bookingId}/cancel

Tracking:
- GET /api/bus/location/{busId}

## Notes

- Sample buses, route, schedule, and one location entry are auto-seeded on first backend run.
- JWT is required for booking and user-booking endpoints.
- Replace app.jwt.secret in application.properties before production use.
