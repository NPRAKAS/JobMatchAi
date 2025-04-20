import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ProgressBar from './ProgressBar';
import { useAppContext } from '../../context/AppContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { activeStep } = useAppContext();
  
  const showProgressBar = location.pathname !== '/';

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      {showProgressBar && <ProgressBar currentStep={activeStep} />}
      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;