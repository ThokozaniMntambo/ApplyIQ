import { Box} from "@chakra-ui/react";
import Landing from "./Components/Pages/Landing";
import Dashboard from "./Components/Pages/Dashboard";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";

const App = () => {
  return (
    <BrowserRouter>
      <Box minH="100vh">
     
        <Navbar/>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
        </Routes>
      </Box>
    </BrowserRouter>
  );
};

export default App;
