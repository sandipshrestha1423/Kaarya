import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostService from "./pages/PostService";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import Profile from "./pages/Profile";
import MyServices from "./pages/MyServices";
import AdminLogin from "./pages/AdminLogin";
import ServiceDetails from "./pages/ServiceDetails";
import Messages from "./pages/Messages";

function App() {
  return (
    <>
      <Navbar />
      <div className="pt-20"> {/* Add padding to prevent navbar overlap */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/service/:id" element={<ServiceDetails />} />
          <Route
             path="/messages"
             element={
                <ProtectedRoute>
                   <Messages />
                </ProtectedRoute>
             } 
          />
          <Route path="/login" element={<Login />} />        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/post-service"
          element={
            <ProtectedRoute>
              <PostService />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-services"
          element={
            <ProtectedRoute>
              <MyServices />
            </ProtectedRoute>
          }
        />
      </Routes>
      </div>
    </>
  );
}

export default App;
