// Интерфейс для успешного ответа от сервера
export interface ApiResponse<T> {
  success: true;
  data: T;
}

// Интерфейс для ошибок с сервера
export interface ApiError {
  success: false;
  error: Error | string;
}