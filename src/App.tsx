import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import AnalyzeJobPage from './pages/AnalyzeJobPage';
import ResumeBuilderPage from './pages/ResumeBuilderPage';
import OptimizePage from './pages/OptimizePage';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/analyze" element={<AnalyzeJobPage />} />
            <Route path="/build" element={<ResumeBuilderPage />} />
            <Route path="/optimize" element={<OptimizePage />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;