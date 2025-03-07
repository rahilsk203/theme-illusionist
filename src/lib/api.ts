
const BASE_URL = 'http://localhost:3000/api';

interface AuthResponse {
  success: boolean;
  token?: string;
  message?: string;
}

interface UserResponse {
  success: boolean;
  user?: {
    _id: string;
    email: string;
  };
  message?: string;
}

interface GenerateResponse {
  success: boolean;
  code?: string;
  message?: string;
}

interface UploadResponse {
  success: boolean;
  message?: string;
}

export const api = {
  auth: {
    login: async (email: string, password: string): Promise<AuthResponse> => {
      try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        return await response.json();
      } catch (error) {
        console.error('Login error:', error);
        return { success: false, message: 'Error connecting to server' };
      }
    },
    
    register: async (email: string, password: string): Promise<AuthResponse> => {
      try {
        const response = await fetch(`${BASE_URL}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        return await response.json();
      } catch (error) {
        console.error('Register error:', error);
        return { success: false, message: 'Error connecting to server' };
      }
    },
    
    googleLogin: () => {
      window.location.href = `${BASE_URL}/auth/google`;
    }
  },
  
  user: {
    getProfile: async (token: string): Promise<UserResponse> => {
      try {
        const response = await fetch(`${BASE_URL}/users/me`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        return await response.json();
      } catch (error) {
        console.error('Profile fetch error:', error);
        return { success: false, message: 'Error fetching profile' };
      }
    },
    
    updatePassword: async (userId: string, token: string, password: string): Promise<UploadResponse> => {
      try {
        const response = await fetch(`${BASE_URL}/users/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ password })
        });
        return await response.json();
      } catch (error) {
        console.error('Update profile error:', error);
        return { success: false, message: 'Error updating profile' };
      }
    },
    
    deleteAccount: async (userId: string, token: string): Promise<UploadResponse> => {
      try {
        const response = await fetch(`${BASE_URL}/users/${userId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        return await response.json();
      } catch (error) {
        console.error('Delete account error:', error);
        return { success: false, message: 'Error deleting account' };
      }
    }
  },
  
  elements: {
    generate: async (
      token: string, 
      element: string, 
      technology: string, 
      theme: string, 
      enhancement?: string
    ): Promise<GenerateResponse> => {
      try {
        const response = await fetch(`${BASE_URL}/generate-element`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ element, technology, theme, enhancement })
        });
        return await response.json();
      } catch (error) {
        console.error('Generate element error:', error);
        return { success: false, message: 'Error connecting to server' };
      }
    },
    
    uploadTemplate: async (
      token: string, 
      element: string, 
      technology: string, 
      theme: string, 
      code: string
    ): Promise<UploadResponse> => {
      try {
        const response = await fetch(`${BASE_URL}/upload-template`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ element, technology, theme, code })
        });
        return await response.json();
      } catch (error) {
        console.error('Upload template error:', error);
        return { success: false, message: 'Error uploading template' };
      }
    }
  }
};
