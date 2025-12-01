import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { getAdminStats } from '../../lib/api';
import { useAuth } from '../../contexts/AuthContext';
import { StatCardSkeleton } from '../../components/LoadingSkeleton';

const statIcons = {
  users: '👥',
  leads: '📧',
  clients: '🤝',
  projects: '🚀',
  blogs: '📝',
};

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const { data: stats, isLoading } = useQuery({
    queryKey: ['adminStats'],
    queryFn: getAdminStats,
  });

  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const statCards = [
    { key: 'users', label: 'Total Users', value: stats?.stats.users || 0, color: 'from-blue-500 to-cyan-500', icon: '👥' },
    { key: 'leads', label: 'Contact Requests', value: stats?.stats.leads || 0, color: 'from-purple-500 to-pink-500', icon: '📧' },
    { key: 'clients', label: 'Total Clients', value: stats?.stats.clients || 0, color: 'from-green-500 to-emerald-500', icon: '🤝' },
    { key: 'projects', label: 'Total Projects', value: stats?.stats.projects || 0, color: 'from-orange-500 to-red-500', icon: '🚀' },
    { key: 'blogs', label: 'Blog Posts', value: stats?.stats.blogs || 0, color: 'from-indigo-500 to-purple-500', icon: '📝' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-8 relative overflow-hidden">
        <div className="absolute inset-0 particle-bg opacity-30" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <StatCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard — Biogleam</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-8 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 particle-bg opacity-20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: -20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="flex justify-between items-center mb-8"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-2">Admin Dashboard</h1>
              <p className="text-gray-600 text-lg">
                Welcome back, <span className="font-semibold text-primary">{user?.name}</span>
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(239, 68, 68, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              onClick={logout}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">Logout</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </motion.div>

          {stats && (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
                {statCards.map((stat, index) => (
                  <motion.div
                    key={stat.key}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5, type: 'spring' }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="card p-6 relative overflow-hidden group cursor-pointer"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-2xl" />
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <motion.div
                          className="text-5xl"
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          {stat.icon}
                        </motion.div>
                        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${stat.color} opacity-20 group-hover:opacity-30 transition-opacity shadow-lg`} />
                      </div>
                      <h3 className="text-gray-600 text-sm mb-2 font-medium">{stat.label}</h3>
                      <motion.p
                        className="text-4xl font-bold text-primary"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.2, type: 'spring', stiffness: 200 }}
                      >
                        {stat.value}
                      </motion.p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quick Links and Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Quick Links */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  whileHover={{ scale: 1.01 }}
                  className="card p-6 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2 relative z-10">
                    <motion.span
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                      ⚡
                    </motion.span>
                    Quick Links
                  </h3>
                  <div className="space-y-3 relative z-10">
                    {[
                      { to: '/admin/contact-requests', label: 'Manage Contact Requests', icon: '📧', color: 'from-purple-500 to-pink-500' },
                      { to: '/admin/clients', label: 'Manage Clients', icon: '🤝', color: 'from-green-500 to-emerald-500' },
                      { to: '/admin/projects', label: 'Manage Projects', icon: '🚀', color: 'from-orange-500 to-red-500' },
                      { to: '/admin/blogs', label: 'Manage Blog Posts', icon: '📝', color: 'from-indigo-500 to-purple-500' },
                      { to: '/admin/reviews', label: 'Manage Reviews', icon: '⭐', color: 'from-yellow-500 to-orange-500' },
                      { to: '/admin/users', label: 'Manage Users', icon: '👥', color: 'from-blue-500 to-cyan-500' },
                    ].map((link, index) => (
                      <motion.div
                        key={link.to}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.05 }}
                      >
                        <Link
                          to={link.to}
                          className="flex items-center gap-3 p-1 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-all duration-300 group/link border border-transparent hover:border-gray-200"
                        >
                          <motion.span
                            className="text-2xl"
                            whileHover={{ scale: 1.2, rotate: 15 }}
                            transition={{ duration: 0.2 }}
                          >
                            {link.icon}
                          </motion.span>
                          <span className="text-gray-700 group-hover/link:text-accent font-medium flex-1 transition-colors">{link.label}</span>
                          <motion.span
                            className="text-accent text-xl"
                            animate={{ x: [0, 5, 0] }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }}
                          >
                            →
                          </motion.span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Status Chart */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  whileHover={{ scale: 1.01 }}
                  className="card p-6 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2 relative z-10">
                    <span>📊</span> Contact Requests by Status
                  </h3>
                  <div className="space-y-4 relative z-10">
                    {Object.entries(stats.leadsByStatus).map(([status, count], index) => {
                      const total = Object.values(stats.leadsByStatus).reduce((a, b) => a + b, 0);
                      const percentage = total > 0 ? (count / total) * 100 : 0;
                      const statusColors = {
                        converted: 'from-green-500 to-emerald-500',
                        qualified: 'from-blue-500 to-cyan-500',
                        contacted: 'from-yellow-500 to-orange-500',
                        created: 'from-gray-400 to-gray-500',
                      };
                      
                      return (
                        <motion.div
                          key={status}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + index * 0.05 }}
                          className="group/status"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="capitalize font-medium text-gray-700 group-hover/status:text-accent transition-colors">{status}</span>
                            <span className="font-bold text-primary">{count}</span>
                          </div>
                          <div className="h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                            <motion.div
                              className={`h-full bg-gradient-to-r ${statusColors[status] || statusColors.created} rounded-full shadow-lg`}
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ delay: 0.5 + index * 0.05, duration: 0.8, ease: 'easeOut' }}
                            />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              </div>

              {/* Recent Leads */}
              {stats.recentLeads && stats.recentLeads.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="card p-6 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2 relative z-10">
                    <span>📋</span> Recent Contact Requests
                  </h3>
                  <div className="overflow-x-auto relative z-10">
                    <div className="min-w-full">
                      <table className="min-w-full">
                        <thead>
                          <tr className="border-b-2 border-gray-200">
                            <th className="text-left p-4 text-sm font-semibold text-gray-700 bg-gray-50">Name</th>
                            <th className="text-left p-4 text-sm font-semibold text-gray-700 bg-gray-50">Phone</th>
                            <th className="text-left p-4 text-sm font-semibold text-gray-700 bg-gray-50">Project Type</th>
                            <th className="text-left p-4 text-sm font-semibold text-gray-700 bg-gray-50">Status</th>
                            <th className="text-left p-4 text-sm font-semibold text-gray-700 bg-gray-50">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {stats.recentLeads.map((lead, index) => (
                            <motion.tr
                              key={lead.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.6 + index * 0.05 }}
                              className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-gray-50 hover:to-white transition-all duration-200"
                            >
                              <td className="p-4 font-medium text-gray-900">{lead.name}</td>
                              <td className="p-4 text-gray-600">{lead.phone}</td>
                              <td className="p-4 text-gray-600">{lead.projectType || '-'}</td>
                              <td className="p-4">
                                <span className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm ${
                                  lead.status === 'converted' ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200' :
                                  lead.status === 'qualified' ? 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border border-blue-200' :
                                  lead.status === 'contacted' ? 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border border-yellow-200' :
                                  'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-300'
                                }`}>
                                  {lead.status}
                                </span>
                              </td>
                              <td className="p-4 text-gray-600 text-sm">{new Date(lead.createdAt).toLocaleDateString()}</td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
