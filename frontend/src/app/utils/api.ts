const API_BASE_URL = process.env.BACKEND_URL || 'http://localhost:5000';

interface ApiResponse<T> {
  data?: T;
  error?: {
    message: string;
  };
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
    
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      credentials: 'include',
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    const isJson = response.headers.get('content-type')?.includes('application/json');

    // 👀 Add these debug lines right after fetch
    console.log('🔍 Response Headers:', response.headers);
    console.log('🔍 Raw Response Text:', await response.clone().text());

    let parsed: any = null;

    if (isJson) {
      try {
        parsed = await response.json();
      } catch (e) {
        console.warn('❌ Failed to parse JSON:', e);
      }
    } else {
      const rawText = await response.text();
      console.warn('❌ Not JSON:', rawText);
    }

    if (!response.ok) {
      return {
        error: {
          message: parsed?.message || `HTTP Error: ${response.status}`,
        },
      };
    }

    return { data: parsed };
  } catch (error) {
    console.error('API request failed:', error);
    return {
      error: {
        message: error instanceof Error ? error.message : 'Unknown error',
      },
    };
  }
}

interface RegisterPayload {
  name: string;
  username: string;
  email: string;
  password: string;
  category: "freelancer" | "recruiter";
}

export const authApi = {
  register: async (payload: RegisterPayload) => {
    return await apiRequest("/api/auth/register", "POST", payload);
  },
  login: async (payload: { email?: string; username?: string; password: string }) => {
    return await apiRequest<LoginResponse>("/api/auth/login", "POST", payload);
  },
  // Add more auth endpoints as needed
};

