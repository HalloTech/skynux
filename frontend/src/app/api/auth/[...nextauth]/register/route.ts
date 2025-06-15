// src/app/api/auth/register/route.ts

import { NextRequest, NextResponse } from "next/server";

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
    const contentType = response.headers.get('content-type');

    let parsed: any = null;

    // 👉 Clone response before consuming
    const clone = response.clone();

    try {
      if (contentType && contentType.includes('application/json')) {
        parsed = await response.json();
      } else {
        const rawText = await response.text();
        console.warn("❌ Response is not JSON:", rawText);
        return {
          error: { message: "Unexpected non-JSON response from server" }
        };
      }
    } catch (err) {
      const raw = await clone.text();
      console.error("❌ Error parsing JSON:", err, "\nRaw Response:", raw);
      return {
        error: { message: "Invalid JSON returned from server" }
      };
    }

    if (!response.ok) {
      return {
        error: {
          message: parsed?.message || `HTTP Error: ${response.status}`
        }
      };
    }

    return { data: parsed };
  } catch (error) {
    console.error('❌ API request failed:', error);
    return {
      error: {
        message: error instanceof Error ? error.message : 'Unknown error',
      },
    };
  }
}
