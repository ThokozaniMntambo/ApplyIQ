import { Box } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Components/Pages/Landing";
import Dashboard from "./Components/Pages/Dashboard";
import Login from "./Components/Pages/Login";
import Register from "./Components/Pages/Register";
import Navbar from "./Components/Navbar";
import ProtectedRoute from "./Components/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Box minH="100vh">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Box>
    </BrowserRouter>
  );
};

export default App;
