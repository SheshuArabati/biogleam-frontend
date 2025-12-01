import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Don't redirect on login endpoint errors - let the login page handle it
      if (error.config?.url?.includes('/auth/login')) {
        return Promise.reject(error);
      }
      // Clear token and redirect to login on 401 for other endpoints
      localStorage.removeItem('token');
      // Only redirect if not already on login page
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Utility function to convert snake_case to camelCase
function toCamelCase(obj) {
  if (obj === null || obj === undefined) return obj;
  if (Array.isArray(obj)) {
    return obj.map(toCamelCase);
  }
  if (typeof obj !== 'object') return obj;

  const camelObj = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
      camelObj[camelKey] = toCamelCase(obj[key]);
    }
  }
  return camelObj;
}

export const createLead = async (data) => {
  const response = await api.post('/leads', data);
  return toCamelCase(response.data);
};

export const getProjects = async () => {
  const response = await api.get('/projects');
  const result = toCamelCase(response.data);
  // Backend returns { projects: [...], pagination: {...} }
  return result.projects || [];
};

export const getProject = async (slug) => {
  const response = await api.get(`/projects/${slug}`);
  return toCamelCase(response.data);
};

export const getBlogPosts = async () => {
  const response = await api.get('/blog');
  const result = toCamelCase(response.data);
  // Backend returns { posts: [...], pagination: {...} }
  return result.posts || [];
};

export const getBlogPost = async (slug) => {
  const response = await api.get(`/blog/${slug}`);
  return toCamelCase(response.data);
};

export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  const result = toCamelCase(response.data);
  if (result.token) {
    localStorage.setItem('token', result.token);
  }
  return result;
};

export const signup = async (name, email, password, role) => {
  const response = await api.post('/auth/signup', { name, email, password, role });
  const result = toCamelCase(response.data);
  if (result.token) {
    localStorage.setItem('token', result.token);
  }
  return result;
};

export const logout = async () => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    // Ignore errors on logout
  } finally {
    localStorage.removeItem('token');
  }
};

export const getCurrentUser = async () => {
  const response = await api.get('/auth/me');
  return toCamelCase(response.data);
};

// Admin API functions
export const getAdminStats = async () => {
  const response = await api.get('/admin/stats');
  return toCamelCase(response.data);
};

// Leads CRUD
export const getAllLeads = async (params) => {
  const response = await api.get('/leads', { params });
  return toCamelCase(response.data);
};

export const getLeadById = async (id) => {
  const response = await api.get(`/leads/${id}`);
  return toCamelCase(response.data);
};

export const updateLead = async (id, data) => {
  const response = await api.patch(`/leads/${id}`, data);
  return toCamelCase(response.data);
};

export const deleteLead = async (id) => {
  await api.delete(`/leads/${id}`);
};

// Projects CRUD
export const createProject = async (data) => {
  const response = await api.post('/projects', data);
  return toCamelCase(response.data);
};

export const updateProject = async (id, data) => {
  const response = await api.patch(`/projects/${id}`, data);
  return toCamelCase(response.data);
};

export const deleteProject = async (id) => {
  await api.delete(`/projects/${id}`);
};

// Blog Posts CRUD
export const createBlogPost = async (data) => {
  const response = await api.post('/blog', data);
  return toCamelCase(response.data);
};

export const updateBlogPost = async (id, data) => {
  const response = await api.patch(`/blog/${id}`, data);
  return toCamelCase(response.data);
};

export const deleteBlogPost = async (id) => {
  await api.delete(`/blog/${id}`);
};

// Users CRUD
export const getAllUsers = async (params) => {
  const response = await api.get('/admin/users', { params });
  return toCamelCase(response.data);
};

export const getUserById = async (id) => {
  const response = await api.get(`/admin/users/${id}`);
  return toCamelCase(response.data);
};

export const createUser = async (data) => {
  const response = await api.post('/admin/users', data);
  return toCamelCase(response.data);
};

export const updateUser = async (id, data) => {
  const response = await api.patch(`/admin/users/${id}`, data);
  return toCamelCase(response.data);
};

export const deleteUser = async (id) => {
  await api.delete(`/admin/users/${id}`);
};

// Clients CRUD
export const getAllClients = async (params) => {
  const response = await api.get('/clients', { params });
  return toCamelCase(response.data);
};

export const getClientById = async (id) => {
  const response = await api.get(`/clients/${id}`);
  return toCamelCase(response.data);
};

export const createClient = async (data) => {
  const response = await api.post('/clients', data);
  return toCamelCase(response.data);
};

export const updateClient = async (id, data) => {
  const response = await api.patch(`/clients/${id}`, data);
  return toCamelCase(response.data);
};

export const deleteClient = async (id) => {
  await api.delete(`/clients/${id}`);
};

// Reviews CRUD
export const getReviews = async (params) => {
  const response = await api.get('/reviews', { params });
  return toCamelCase(response.data);
};

export const getReviewById = async (id) => {
  const response = await api.get(`/reviews/${id}`);
  return toCamelCase(response.data);
};

export const createReview = async (data) => {
  const response = await api.post('/reviews', data);
  return toCamelCase(response.data);
};

export const updateReview = async (id, data) => {
  const response = await api.put(`/reviews/${id}`, data);
  return toCamelCase(response.data);
};

export const deleteReview = async (id) => {
  await api.delete(`/reviews/${id}`);
};

// Image Upload
export const uploadImage = async (formData) => {
  const response = await api.post('/upload/single', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return toCamelCase(response.data);
};

export const uploadMultipleImages = async (formData) => {
  const response = await api.post('/upload/multiple', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return toCamelCase(response.data);
};

export default api;
