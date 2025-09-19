import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Lazy load Pages để tối ưu hóa bundle size
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const CountryPage = lazy(() => import('./pages/CountryPage').then(m => ({ default: m.CountryPage })));
const ExperiencePage = lazy(() => import('./pages/ExperiencePage').then(m => ({ default: m.ExperiencePage })));
const TourDetailPage = lazy(() => import('./pages/TourDetailPage').then(m => ({ default: m.TourDetailPage })));
const JournalListPage = lazy(() => import('./pages/JournalListPage').then(m => ({ default: m.JournalListPage })));
const JournalPostPage = lazy(() => import('./pages/JournalPostPage').then(m => ({ default: m.JournalPostPage })));
const TripTypePage = lazy(() => import('./pages/TripTypePage').then(m => ({ default: m.TripTypePage })));
const FloralEventDetailPage = lazy(() => import('./pages/FloralEventDetailPage').then(m => ({ default: m.FloralEventDetailPage })));
const BestSellersPage = lazy(() => import('./pages/BestSellersPage').then(m => ({ default: m.BestSellersPage })));
const BespokeSurveyPage = lazy(() => import('./pages/BespokeSurveyPage').then(m => ({ default: m.BespokeSurveyPage })));
const WhyLeFloralPage = lazy(() => import('./pages/WhyLeFloralPage').then(m => ({ default: m.WhyLeFloralPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const FAQPage = lazy(() => import('./pages/FAQPage').then(m => ({ default: m.FAQPage })));
const FloralCalendarPage = lazy(() => import('./pages/FloralCalendarPage').then(m => ({ default: m.FloralCalendarPage })));

// Import Layout
import { Layout } from './components/Layout';

// Import i18n
import { LanguageProvider } from './context/LanguageContext';

const AppContent = () => {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<div className="loading-spinner">Đang tải...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/destinations/:slug" element={<CountryPage />} />
            <Route path="/experiences/:slug" element={<ExperiencePage />} />
            <Route path="/tours/:id" element={<TourDetailPage />} />
            <Route path="/journal/:categorySlug" element={<JournalListPage />} />
            <Route path="/journal" element={<JournalListPage />} />
            <Route path="/journal-post/:slug" element={<JournalPostPage />} />
            <Route path="/trip-types/:slug" element={<TripTypePage />} />
            <Route path="/floral-events/:id" element={<FloralEventDetailPage />} />
            <Route path="/bestsellers" element={<BestSellersPage />} />
            <Route path="/bespoke-survey" element={<BespokeSurveyPage />} />
            <Route path="/why-le-floral" element={<WhyLeFloralPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/floral-calendar" element={<FloralCalendarPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

const App = () => (
    <LanguageProvider>
        <AppContent />
    </LanguageProvider>
);


export default App;