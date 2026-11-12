import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Loader from './components/ui/Loader';
import Home from './pages/Home';

// Pages are code-split so the home page loads fast.
const About = lazy(() => import('./pages/About'));
const History = lazy(() => import('./pages/History'));
const Development = lazy(() => import('./pages/Development'));
const Deities = lazy(() => import('./pages/Deities'));
const Seva = lazy(() => import('./pages/Seva'));
const Festivals = lazy(() => import('./pages/Festivals'));
const Timings = lazy(() => import('./pages/Timings'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Location = lazy(() => import('./pages/Location'));
const Contact = lazy(() => import('./pages/Contact'));
const Donate = lazy(() => import('./pages/Donate'));
const NotFound = lazy(() => import('./pages/NotFound'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="history" element={<History />} />
          <Route path="development" element={<Development />} />
          <Route path="deities" element={<Deities />} />
          <Route path="seva" element={<Seva />} />
          <Route path="festivals" element={<Festivals />} />
          <Route path="timings" element={<Timings />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="location" element={<Location />} />
          <Route path="contact" element={<Contact />} />
          <Route path="donate" element={<Donate />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="admin" element={<AdminLogin />} />
        <Route path="admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Suspense>
  );
}
