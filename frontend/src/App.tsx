import { Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

import { AuthProvider } from "./context/AuthContext";
import { EventsProvider } from "./context/EventsContext";
import { PictureOfDayProvider } from "./context/PictureOfDayContext";


import ProtectedRoute from "./components/ProtectedRoute";


import Home from "./pages/Home";
import EventPage from "./pages/EventPage";


import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminCreateEvent from "./pages/AdminCreateEvent";
import AdminUploadPhotos from "./pages/AdminUploadPhotos";
import AdminPOD from "./pages/AdminPod";
import Footer from "./components/Footer";
import Events from "./pages/Events";
import Navbar from "./components/Navbar";
import Featured from "./pages/Featured";
import About from "./pages/About";
import Upcoming from "./pages/Upcoming";
import AdminUpcoming from "./pages/AdminUpcoming";

export default function App() {
  return (
    
      <AuthProvider>
        <PictureOfDayProvider>
        <EventsProvider>
          <Navbar/>

            <Routes>

              
              <Route path="/" element={<Home />} />
            <Route path="/events/:slug" element={<EventPage />} />
            <Route path="/all-event" element={<Events />} />
            <Route path="/featured" element={<Featured />} />
            <Route path="/upcoming" element ={<Upcoming/>} />
            <Route path="/about"  element ={<About/>}/>

              
              <Route path="/admin/login" element={<AdminLogin />} />

             
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              
              <Route
                path="/admin/create-event"
                element={
                  <ProtectedRoute>
                    <AdminCreateEvent />
                  </ProtectedRoute>
                }
              />

              
              <Route
                path="/admin/upload-photos"
                element={
                  <ProtectedRoute>
                    <AdminUploadPhotos />
                  </ProtectedRoute>
                }
            />
            
            <Route
              path="/admin/upcoming"
              element={
                <ProtectedRoute>
                  <AdminUpcoming/>

                </ProtectedRoute>
              }
            />


              
              <Route
                path="/admin/pod"
                element={
                  <ProtectedRoute>
                    <AdminPOD />
                  </ProtectedRoute>
                }
              />

          </Routes>
          <Footer />
          <Analytics/>

          </EventsProvider>
        </PictureOfDayProvider>
      </AuthProvider>
  
  );
}
