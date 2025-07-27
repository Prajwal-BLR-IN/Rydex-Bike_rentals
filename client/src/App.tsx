import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useState } from "react";
import HomePage from "./pages/HomePage";
import BIkes from "./pages/BIkes";
import BikeDetails from "./pages/BikeDetails";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import MyBookings from "./pages/MyBookings";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();
  const isOwnerOrNotFoundPath =
    location.pathname.startsWith("/owner") || location.pathname === "*";
  return (
    <>
      {!isOwnerOrNotFoundPath && <Navbar setShowLogin={setShowLogin} />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bikes" element={<BIkes />} />
        <Route path="/bike-details/:id" element={<BikeDetails />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isOwnerOrNotFoundPath && <Footer />}
    </>
  );
}

export default App;
