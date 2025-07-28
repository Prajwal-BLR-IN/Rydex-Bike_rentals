import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useState } from "react";
import HomePage from "./pages/HomePage";
import BIkes from "./pages/BIkes";
import BikeDetails from "./pages/BikeDetails";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import MyBookings from "./pages/MyBookings";
import Layout from "./pages/Owner/Layout";
import Dashboard from "./pages/Owner/Dashboard";
import AddBike from "./pages/Owner/AddBike";
import ManageBike from "./pages/Owner/ManageBike";
import ManageBookings from "./pages/Owner/ManageBookings";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();
  const isOwnerPath = location.pathname.startsWith("/owner");

  return (
    <>
      {!isOwnerPath && <Navbar setShowLogin={setShowLogin} />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bikes" element={<BIkes />} />
        <Route path="/bike-details/:id" element={<BikeDetails />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/owner" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-bike" element={<AddBike />} />
          <Route path="manage-bikes" element={<ManageBike />} />
          <Route path="manage-bookings" element={<ManageBookings />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isOwnerPath && <Footer />}
    </>
  );
}

export default App;
