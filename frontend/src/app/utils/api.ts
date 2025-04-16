const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

interface LoginResponse {
  access_token: string;
}

export async function apiRequest<T>(
  endpoint: string,
  method: string = 'GET',
  body?: any,
  headers: HeadersInit = {}
): Promise<ApiResponse<T>> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    console.log(response);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        error: errorData?.message || `HTTP error! status: ${response.status}`,
      };
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error('API request failed:', error);
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// API functions
export const authApi = {
  login: async (credentials: { email: string; password: string }) => {
    console.log(credentials);
    const response = await apiRequest<LoginResponse>('/auth/login', 'POST', credentials);

    // If there's an error, log it and return an explicit error message
    if (response.error) {
      console.error(response.error);
      return { success: false, message: response.error }; // Return explicit error message
    }

    // Check if data contains the expected access_token
    if (response.data && response.data.access_token) {
      return { success: true, access_token: response.data.access_token }; // Return access token
    }

    // If access token is not found in response, return error message
    return { success: false, message: "Access token not found in response" };
  },

  register: (userData: {
    name: string;
    email: string;
    password: string;
    category: string;
  }) => apiRequest('/auth/register', 'POST', userData),
};

// Job-related API functions
export const jobsApi = {
  getJobs: () => apiRequest('/jobs'),
  postJob: (jobData: any) => apiRequest('/jobs', 'POST', jobData),
  getJobDetails: (id: string) => apiRequest(`/jobs/${id}`),
};

// Talent-related API functions
export const talentsApi = {
  getTalents: () => apiRequest('/talents'),
  getTalentDetails: (id: string) => apiRequest(`/talents/${id}`),
};

// User-related API functions
export const userApi = {
  getUserProfile: () => apiRequest('/user/profile'),
  updateProfile: (profileData: any) =>
    apiRequest('/user/profile', 'PUT', profileData),
};
