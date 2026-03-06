import axios from 'axios';

const API_BASE_URL = '';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Backend uses HTTP-only cookie (authToken); only add Bearer if we have a token in storage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && token !== 'auth') {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 - clear token and redirect to login; improve network error message
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    if (error.message === 'Network Error' || !error.response) {
      error.userMessage = 'Cannot reach server. Ensure backend is running at http://localhost:9090 and CORS allows http://localhost:5174.';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const registerUser = (data) => api.post('/api/user/register', data);
export const loginUser = (data) => api.post('/api/auth/login', data);

// Product APIs - backend: GET /api/products and GET /api/products?category=T-Shirts
export const getProducts = (category = null) => {
  const url = category ? `/api/products?category=${encodeURIComponent(category)}` : '/api/products';
  return api.get(url);
};

export const getProductById = (id) => api.get(`/api/products/${id}`);

// Cart APIs
export const addToCart = (data) => api.post('/api/cart/add', data);
export const getCartItems = () => api.get('/api/cart/items');
export const updateCartItem = (data) => api.put('/api/cart/update', data);
export const deleteCartItem = (productid) => api.delete('/api/cart/delete', { data: { productid } });
export const getCartCount = () => api.get('/api/cart/count');

export default api;
