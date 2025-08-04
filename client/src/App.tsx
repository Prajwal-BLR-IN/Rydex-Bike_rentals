import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
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
import Login from "./components/Login";
import { Toaster } from "react-hot-toast";
import { useAuthUser } from "./hooks/useAuthUser";
import Loader from "./components/Loader";
import OnBoarding from "./pages/OnBoarding";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();
  const isOwnerPath = location.pathname.startsWith("/owner");
  const { authUser } = useAuthUser();
  const isOwner = authUser?.role;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setLoading(false);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <Toaster />
      {!isOwnerPath && <Navbar setShowLogin={setShowLogin} />}
      {showLogin && <Login setShowLogin={setShowLogin} />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bikes" element={<BIkes />} />
        <Route path="/bike-details/:id" element={<BikeDetails />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/onboarding" element={<OnBoarding />} />
        <Route path="/owner" element={<Layout />}>
          <Route
            index
            element={isOwner ? <Dashboard /> : <Navigate to="/" />}
          />
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
