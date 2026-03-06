import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/landing/Home';
import { SolarLeads } from './pages/landing/SolarLeads';
import { PropertyLeads } from './pages/landing/PropertyLeads';
import { FinanceLeads } from './pages/landing/FinanceLeads';
import { SpaLeads } from './pages/landing/SpaLeads';
import { CompetitionEntry } from './pages/landing/CompetitionEntry';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/solar" element={<SolarLeads />} />
        <Route path="/property" element={<PropertyLeads />} />
        <Route path="/finance" element={<FinanceLeads />} />
        <Route path="/spa" element={<SpaLeads />} />
        <Route path="/competition" element={<CompetitionEntry />} />
        {/* Redirect login/register to the main app */}
        <Route path="/login" element={<Navigate to="https://app.leadsclubaustralia.com.au/login" replace />} />
        <Route path="/register" element={<Navigate to="https://app.leadsclubaustralia.com.au/register" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
