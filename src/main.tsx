import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import UserProfile from "./UserProfile.tsx";
import WelfareRedemptionProfile from "./RedeemWelfare.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/welfare" element={<WelfareRedemptionProfile />} />
        {/* other routes... */}
      </Routes>
    </Router>
  </StrictMode>,
)
