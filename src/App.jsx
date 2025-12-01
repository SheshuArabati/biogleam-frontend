import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Pricing from './pages/Pricing';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminContactRequests from './pages/admin/ContactRequests';
import AdminProjects from './pages/admin/Projects';
import AdminBlogs from './pages/admin/Blogs';
import AdminUsers from './pages/admin/Users';
import AdminClients from './pages/admin/Clients';
import AdminReviews from './pages/admin/Reviews';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/about" element={<Layout><About /></Layout>} />
      <Route path="/services" element={<Layout><Services /></Layout>} />
      <Route path="/projects" element={<Layout><Projects /></Layout>} />
      <Route path="/projects/:slug" element={<Layout><ProjectDetail /></Layout>} />
      <Route path="/pricing" element={<Layout><Pricing /></Layout>} />
      <Route path="/blog" element={<Layout><Blog /></Layout>} />
      <Route path="/blog/:slug" element={<Layout><BlogPost /></Layout>} />
      <Route path="/contact" element={<Layout><Contact /></Layout>} />
      <Route path="/login" element={<Login />} />
      
      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={<ProtectedRoute requireAdmin><Layout><AdminDashboard /></Layout></ProtectedRoute>} />
      <Route path="/admin/contact-requests" element={<ProtectedRoute requireAdmin><Layout><AdminContactRequests /></Layout></ProtectedRoute>} />
      <Route path="/admin/projects" element={<ProtectedRoute requireAdmin><Layout><AdminProjects /></Layout></ProtectedRoute>} />
      <Route path="/admin/blogs" element={<ProtectedRoute requireAdmin><Layout><AdminBlogs /></Layout></ProtectedRoute>} />
      <Route path="/admin/reviews" element={<ProtectedRoute requireAdmin><Layout><AdminReviews /></Layout></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute requireAdmin><Layout><AdminUsers /></Layout></ProtectedRoute>} />
      <Route path="/admin/clients" element={<ProtectedRoute requireAdmin><Layout><AdminClients /></Layout></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
