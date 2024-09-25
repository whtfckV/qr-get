import { ApiError, ApiResponse } from '@/types/api'
import { Get, Post, Put } from './enums'

const BASE_URL = import.meta.env.VITE_API_URL

export class Api {
  private static defaultHeaders = {
    'Content-Type': 'application/json',
  }

  private static formHeaders = {
    'Content-Type': 'application/x-www-form-urlencoded',
  }

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

  private static async response<T> (
    response: Response
  ): Promise<ApiResponse<T> | ApiError> {
    if (!response.ok) {
      const errorData = await response.json()
      if (response.status === 401) {
        const res = await this.get(Get.refresh)
        console.log(errorData)
      }
      return {
        success: false,
        error:
          errorData?.message ||
          `Ошибка ${response.status}: ${response.statusText}`,
      }
    }

    const data = await response.json()
    return {
      success: true,
      data: data as T,
    }
  }

  static async get<T> (url: Get): Promise<ApiResponse<T> | ApiError> {
    try {
      const response = await fetch(`${BASE_URL}${url}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      })

      return await this.response<T>(response)
    } catch (error) {
      console.error('GET request error:', error)
      return this.error(error)
    }
  }

  static async post<T> (
    url: Post,
    body?: string
  ): Promise<ApiResponse<T> | ApiError> {
    let headers = {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,

    }

    if (url === Post.login) {
      headers = {
        ...headers,
        ...this.formHeaders,
      }
    }

    try {
      const response = await fetch(`${BASE_URL}${url}`, {
        method: 'POST',
        headers: {
          ...this.defaultHeaders,
          ...headers,
        },
        body,
      })

      return await this.response<T>(response)
    } catch (error) {
      console.error('POST request error:', error)
      return this.error(error)
    }
  }

  static async put<T> (
    url: Put,
    body: string,
    id?: string,
  ): Promise<ApiResponse<T> | ApiError> {
    try {
      const response = await fetch(`${BASE_URL}${url}${id || ''}`, {
        method: 'PUT',
        headers: {
          ...this.defaultHeaders,
        },
        body,
      })

      return await this.response<T>(response)
    } catch (error) {
      console.error('PUT request error:', error)
      return this.error(error)
    }
  }
}
