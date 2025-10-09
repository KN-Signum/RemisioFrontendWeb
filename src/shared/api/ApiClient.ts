import axios, { AxiosInstance } from 'axios';
import { AUTH_URL, API_URL } from '@/config/constants';

interface TokenStorage {
  getAccessToken(): string | null;
  setAccessToken(token: string): void;
  removeAccessToken(): void;
}

class MemoryTokenStorage implements TokenStorage {
  private accessToken: string | null = null;

  getAccessToken(): string | null {
    return this.accessToken;
  }

  setAccessToken(token: string): void {
    this.accessToken = token;
  }

  removeAccessToken(): void {
    this.accessToken = null;
  }
}

export class ApiClient {
  private static instance: ApiClient;
  private protectedInstance: AxiosInstance;
  private publicInstance: AxiosInstance;
  private tokenStorage: MemoryTokenStorage;
  private onAuthFailureCallback: (() => void) | null = null;
  private constructor() {
    this.tokenStorage = new MemoryTokenStorage();
    this.publicInstance = this.createPublicInstance();
    this.protectedInstance = this.createProtectedInstance();
  }
  private createPublicInstance(): AxiosInstance {
    const instance = axios.create({
        baseURL: API_URL,
        withCredentials: true
    })
    return instance
  }
  public setOnAuthFailure(callback: () => void): void {
    this.onAuthFailureCallback = callback;
  }
  private createProtectedInstance(): AxiosInstance {
    const instance = axios.create({
      baseURL: AUTH_URL,
      withCredentials: true,
    });

    instance.interceptors.request.use((config) => {
      const token = this.tokenStorage.getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
            const response = await this.publicInstance.post('/refresh');
            const newAccessToken = response.data.accessToken;
            this.tokenStorage.setAccessToken(newAccessToken);
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return instance(originalRequest);

          } catch (refreshError) {
            this.tokenStorage.removeAccessToken();
            this.onAuthFailureCallback?.();
            return Promise.reject(refreshError);
          }
        }
        
        return Promise.reject(error);
      }
    );

    return instance;
  }

  public setAccessToken(token: string): void {
    this.tokenStorage.setAccessToken(token);
  }

  public removeAccessToken(): void {
    this.tokenStorage.removeAccessToken();
  }
  public isAuthenticated(): boolean {
    return this.tokenStorage.getAccessToken() !== null;
  }
  public getPublicClient(): AxiosInstance {
    return this.publicInstance;
  }

  public getProtectedClient(): AxiosInstance {
    return this.protectedInstance;
  }
  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }
}