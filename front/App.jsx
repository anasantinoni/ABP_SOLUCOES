import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import StudentSearch from './pages/StudentSearch';
import StudentDetail from './pages/StudentDetail';
import StudentFinance from './pages/StudentFinance';
import FinanceDashboard from './pages/FinanceDashboard';
import Agenda from './pages/Agenda';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/search" element={<StudentSearch />} />
                <Route path="/student/:id" element={<StudentDetail />} />
                <Route path="/finance" element={<FinanceDashboard />} />
                <Route path="/agenda" element={<Agenda />} />
            </Routes>
        </Router>
    );
}

export default App;
