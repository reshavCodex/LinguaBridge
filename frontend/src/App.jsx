import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Partners from "./pages/Partners";
import Chat from "./pages/Chat";
import AITutor from "./pages/AITutor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/ai-tutor" element={<AITutor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
