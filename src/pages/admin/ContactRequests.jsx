import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { createPortal } from 'react-dom';
import { getAllLeads, updateLead, deleteLead } from '../../lib/api';

export default function AdminContactRequests() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');
  const [editingRequest, setEditingRequest] = useState(null);
  const queryClient = useQueryClient();
  const limit = 20;

  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Lock body scroll when modal is open
  useEffect(() => {
    if (editingRequest) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [editingRequest]);

  const { data, isLoading } = useQuery({
    queryKey: ['contactRequests', page, statusFilter, search],
    queryFn: () =>
      getAllLeads({
        page,
        limit,
        status: statusFilter || undefined,
        search: search || undefined,
      }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) =>
      updateLead(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contactRequests'] });
      queryClient.invalidateQueries({ queryKey: ['adminStats'] });
      setEditingRequest(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteLead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contactRequests'] });
      queryClient.invalidateQueries({ queryKey: ['adminStats'] });
    },
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this contact request?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleStatusChange = (id, status) => {
    updateMutation.mutate({ id, data: { status } });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editingRequest) return;
    const formData = new FormData(e.currentTarget);

    const data = {
      name: formData.get('name'),
      email: formData.get('email') || undefined,
      phone: formData.get('phone'),
      projectType: formData.get('projectType') || undefined,
      packageType: formData.get('packageType') || undefined,
      message: formData.get('message'),
      status: formData.get('status') || 'created',
    };

    updateMutation.mutate({
      id: editingRequest.id,
      data,
    });
  };

  const requests = data?.leads || [];
  const pagination = data?.pagination;

  return (
    <>
      <Helmet>
        <title>Contact Requests — Admin</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-8 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 particle-bg opacity-20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

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
              <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-2">Contact Requests</h1>
              <p className="text-gray-600">Manage and track all contact form submissions</p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/admin/dashboard"
                className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
              >
                <span>←</span> Dashboard
              </Link>
            </motion.div>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="card p-6 mb-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search contact requests..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300 bg-white"
              >
                <option value="">All Statuses</option>
                <option value="created">Created</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="converted">Converted</option>
                <option value="lost">Lost</option>
              </select>
              <div className="flex items-center justify-end">
                <span className="text-sm text-gray-600 font-medium">
                  Total: <span className="text-accent font-bold">{requests.length}</span>
                </span>
              </div>
            </div>
          </motion.div>

          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="inline-block text-6xl mb-4"
              >
                ⚡
              </motion.div>
              <p className="text-gray-600 text-xl">Loading contact requests...</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="card overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Client Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Project Type
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Package
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {requests.map((req, index) => (
                      <motion.tr
                        key={req.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.02 }}
                        className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-white transition-all duration-200"
                      >
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{req.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">{req.phone}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">{req.email || '-'}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {req.projectType || req.project_type || '-'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {req.packageType || req.package_type ? (
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 capitalize">
                              {req.packageType || req.package_type}
                            </span>
                          ) : (
                            '-'
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={req.status}
                            onChange={(e) => handleStatusChange(req.id, e.target.value)}
                            className={`text-xs px-3 py-1.5 rounded-lg border-2 font-semibold transition-all duration-300 ${
                              req.status === 'converted' ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200' :
                              req.status === 'qualified' ? 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200' :
                              req.status === 'contacted' ? 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border-yellow-200' :
                              'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border-gray-300'
                            }`}
                          >
                            <option value="created">Created</option>
                            <option value="contacted">Contacted</option>
                            <option value="qualified">Qualified</option>
                            <option value="converted">Converted</option>
                            <option value="lost">Lost</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {new Date(req.createdAt || req.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setEditingRequest(req)}
                              className="px-4 py-2 bg-gradient-to-r from-accent to-cyan-500 text-white rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                            >
                              Edit
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDelete(req.id)}
                              className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                            >
                              Delete
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {pagination && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="px-6 py-4 border-t bg-gray-50 flex justify-between items-center"
                >
                  <span className="text-sm text-gray-600 font-medium">
                    Page <span className="font-bold text-primary">{pagination.page}</span> of <span className="font-bold text-primary">{pagination.pages}</span>
                  </span>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="px-4 py-2 border-2 border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-accent hover:bg-accent/10 transition-all duration-300 font-medium"
                    >
                      Previous
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setPage((p) => Math.min(pagination.pages, p + 1))}
                      disabled={page === pagination.pages}
                      className="px-4 py-2 border-2 border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-accent hover:bg-accent/10 transition-all duration-300 font-medium"
                    >
                      Next
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Edit Modal */}
          {editingRequest && createPortal(
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-start justify-center p-4 overflow-y-auto"
              style={{ 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0,
                zIndex: 9999,
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)'
              }}
              onClick={() => setEditingRequest(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: -20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: -20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl max-w-2xl w-full my-8 shadow-2xl relative flex flex-col"
                style={{ maxHeight: 'calc(100vh - 4rem)', minHeight: 'min-content' }}
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-accent/10 to-purple-500/10 rounded-full blur-3xl -z-10" />
                <div className="bg-white rounded-t-2xl px-8 pt-8 pb-4 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="text-3xl font-bold gradient-text">Edit Contact Request</h2>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setEditingRequest(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100"
                    aria-label="Close"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>
                <div className="px-8 pb-8 pt-4 overflow-y-auto flex-1">
                  <form onSubmit={handleEditSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Client Name *</label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={editingRequest.name}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Client Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      defaultValue={editingRequest.phone}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Client Email</label>
                    <input
                      type="email"
                      name="email"
                      defaultValue={editingRequest.email || ''}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Project Type</label>
                    <input
                      type="text"
                      name="projectType"
                      defaultValue={editingRequest.projectType || editingRequest.project_type || ''}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Package</label>
                    <select
                      name="packageType"
                      defaultValue={editingRequest.packageType || editingRequest.package_type || ''}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300 bg-white"
                    >
                      <option value="">None</option>
                      <option value="starter">Starter</option>
                      <option value="pro">Pro</option>
                      <option value="enterprise">Enterprise</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Status</label>
                    <select
                      name="status"
                      defaultValue={editingRequest.status}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300 bg-white"
                    >
                      <option value="created">Created</option>
                      <option value="contacted">Contacted</option>
                      <option value="qualified">Qualified</option>
                      <option value="converted">Converted</option>
                      <option value="lost">Lost</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Client Message</label>
                    <textarea
                      name="message"
                      defaultValue={editingRequest.message}
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                    />
                  </div>
                  <div className="flex gap-4 pt-4">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 bg-gradient-to-r from-accent to-cyan-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex-1"
                    >
                      Save Changes
                    </motion.button>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setEditingRequest(null)}
                      className="px-8 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300"
                    >
                      Cancel
                    </motion.button>
                  </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          , document.body)}
        </div>
      </div>
    </>
  );
}
