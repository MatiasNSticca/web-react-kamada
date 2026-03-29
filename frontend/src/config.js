export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const ENDPOINTS = {
  auth: {
    login: `${API_URL}/auth/login`,
    register: `${API_URL}/auth/register`,
    me: `${API_URL}/auth/me`,
    updateProfile: `${API_URL}/users/me/update`
  },
  products: {
    list: `${API_URL}/products`,
    create: `${API_URL}/products`,
    getById: (id) => `${API_URL}/products/${id}`,
    update: (id) => `${API_URL}/products/${id}`,
    delete: (id) => `${API_URL}/products/${id}`
  },
  categories: {
    list: `${API_URL}/categories`,
    create: `${API_URL}/categories`,
    getById: (id) => `${API_URL}/categories/${id}`,
    update: (id) => `${API_URL}/categories/${id}`,
    delete: (id) => `${API_URL}/categories/${id}`
  },
  users: {
    list: `${API_URL}/users`,
    create: `${API_URL}/users`,
    getById: (id) => `${API_URL}/users/${id}`,
    update: (id) => `${API_URL}/users/${id}`,
    delete: (id) => `${API_URL}/users/${id}`,
    changeRole: (id) => `${API_URL}/users/${id}/role`
  },
  events: {
    list: `${API_URL}/events`,
    create: `${API_URL}/events`,
    getById: (id) => `${API_URL}/events/${id}`,
    update: (id) => `${API_URL}/events/${id}`,
    delete: (id) => `${API_URL}/events/${id}`
  }
};
