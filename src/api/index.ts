import { ApiError, ApiResponse } from '@/types/api'

const BASE_URL = import.meta.env.VITE_API_URL

export enum Post {
  login = '/auth/Login',
}

export class Api {
  private static error (error: unknown): ApiError {
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message || 'Неизвестная ошибка',
      }
    }
    return {
      success: false,
      error: 'Неизвестная ошибка',
    }
  }

  private static async response<T> (response: Response): Promise<ApiResponse<T> | ApiError> {
    if (!response.ok) {
      // Возвращаем объект ошибки с кодом и сообщением
      const errorData = await response.json()
      return {
        success: false,
        error: errorData?.message || `Ошибка ${response.status}: ${response.statusText}`,
      }
    }

    const data = await response.json()
    return {
      success: true,
      data: data as T,
    }
  }

  private static loginHeaders: HeadersInit = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  private static defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json'
  }

  static async get<T> (url: Post): Promise<ApiResponse<T> | ApiError> {

    try {
      const response = await fetch(`${BASE_URL}/${url}`, {
        method: 'GET',
        headers: {
          ...this.defaultHeaders
          ...headers
        },
        // body: JSON.stringify(body),
      })

      return await this.response<T>(response)
    } catch (error) {
      console.error('GET request error:', error)
      return this.error(error)
    }
  }

  static async post<T, B>(url: Post, body: B): Promise<ApiResponse<T> | ApiError> {
    let headers: HeadersInit;
    let formattedBody: string;

    if (url === Post.login) {
      headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
      formattedBody = body instanceof URLSearchParams ? body.toString() : new URLSearchParams(body as Record<string, string>).toString();
    } else {
      headers = { 'Content-Type': 'application/json' };
      formattedBody = JSON.stringify(body);
    }

    try {
      const response = await fetch(`${BASE_URL}/${url}`, {
        method: 'POST',
        headers: headers,
        body: formattedBody
      });

      return await this.response<T>(response);
    } catch (error) {
      console.error('POST request error:', error);
      return this.error(error);
    }
  }

}
