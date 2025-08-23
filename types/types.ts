export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
