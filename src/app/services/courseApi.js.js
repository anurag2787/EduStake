// services/courseApi.js

import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Create an axios instance with common headers
const apiClient = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add JWT token to requests if user is logged in
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const courseApi = {
  // Course enrollment
  enrollInCourse: async (userId, courseId, stakeAmount) => {
    try {
      const response = await apiClient.post('/courses/enroll', {
        userId,
        courseId,
        stakeAmount,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Mark video as completed
  markVideoCompleted: async (userId, courseId, videoId) => {
    try {
      const response = await apiClient.post('/courses/progress', {
        userId,
        courseId,
        videoId,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get user's course progress
  getUserProgress: async (userId) => {
    try {
      const response = await apiClient.get(`/courses/progress/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get all courses
  getAllCourses: async () => {
    try {
      const response = await apiClient.get('/courses');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get course by ID
  getCourseById: async (courseId) => {
    try {
      const response = await apiClient.get(`/courses/${courseId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default courseApi;