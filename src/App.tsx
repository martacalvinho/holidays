import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import StepNavigation from './components/StepNavigation';
import LandingPage from './pages/LandingPage';
import BrandingForm from './components/BrandingForm';
import ProductsPage from './pages/ProductsPage';
import DiscountsPage from './pages/DiscountsPage';
import UrgencyPage from './pages/UrgencyPage';
import PreviewPage from './pages/PreviewPage';
import PublishPage from './pages/PublishPage';
import AnalyticsPage from './pages/AnalyticsPage';
import { usePageStore } from './store/pageStore';

function App() {
  const { settings } = usePageStore();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/*"
            element={
              <>
                <Navigation />
                <main className="py-6 pb-24">
                  <Routes>
                    <Route path="/branding" element={<BrandingForm />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/discounts" element={<DiscountsPage />} />
                    <Route path="/urgency" element={<UrgencyPage />} />
                    <Route path="/preview" element={<PreviewPage />} />
                    <Route path="/publish" element={<PublishPage />} />
                    <Route path="/analytics" element={<AnalyticsPage />} />
                    <Route path="*" element={<Navigate to="/branding" replace />} />
                  </Routes>
                </main>
                <StepNavigation />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;