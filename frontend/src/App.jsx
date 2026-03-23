import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import SearchBusPage from "./pages/SearchBusPage";
import BusResultsPage from "./pages/BusResultsPage";
import BookingPage from "./pages/BookingPage";
import MyBookingsPage from "./pages/MyBookingsPage";
import TrackBusPage from "./pages/TrackBusPage";

function App() {
  return (
    <div className="min-h-screen bg-grid-fade [background-size:22px_22px]">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-4 pb-10 pt-6 md:px-6">
        <Routes>
          <Route path="/" element={<Navigate to="/search" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <SearchBusPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/buses"
            element={
              <ProtectedRoute>
                <BusResultsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking/:busScheduleId"
            element={
              <ProtectedRoute>
                <BookingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute>
                <MyBookingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/track/:busId"
            element={
              <ProtectedRoute>
                <TrackBusPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
