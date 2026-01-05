import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import PostService from "./pages/PostService";
import Profile from "./pages/Profile";
import MyServices from "./pages/MyServices";
import ServiceDetails from "./pages/ServiceDetails";
import Messages from "./pages/Messages";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Requests from "./pages/Requests";

function App() {
  return (
    <>
      <Navbar />
      <div className="pt-20"> 
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/service/:id" element={<ServiceDetails />} />
          <Route path="/login" element={<Login />} />        
          <Route path="/register" element={<Register />} />
          
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          
          <Route
             path="/messages"
             element={
                <ProtectedRoute>
                   <Messages />
                </ProtectedRoute>
             } 
          />
          <Route
             path="/requests"
             element={
                <ProtectedRoute>
                   <Requests />
                </ProtectedRoute>
             } 
          />
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