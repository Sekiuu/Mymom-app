import axios from 'axios';

export type ResponseData = {
    message: string,
    data: any,
    success: boolean
}

const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"; // <- no trailing slash

export const axiosInstance = axios.create({
    baseURL: BASE,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});
/**
 * GET request
 * @param path - API endpoint path (e.g., '/api/users')
 * @returns Promise with response data
 */

/**
 * GET request
 * @param path - API endpoint path (e.g., '/texts' or '/users')
 * @param config - Optional axios config (for query params, headers, etc.)
 * @returns Promise with response data
 */
export function get(path: string, data?: any, config?: any): Promise<ResponseData> {
    try {
        // axiosInstance already has baseURL, so just use the path
        const res = axiosInstance.get<ResponseData>(path+'?'+new URLSearchParams(data), config).then(res => res.data);
        return res;
    } catch (error) {
        throw error;
    }
}

/**
 * POST request
 * @param path - API endpoint path (e.g., '/texts' or '/users')
 * @param data - Data to send in request body
 * @param config - Optional axios config
 * @returns Promise with response data
 */
export function post(path: string, data?: any, config?: any): Promise<ResponseData> {
    try {
        // axiosInstance already has baseURL, so just use the path
        const res = axiosInstance.post<ResponseData>(path, data, config).then(res => res.data);
        return res;
    } catch (error) {
        throw error;
    }
}

/**
 * PUT request
 * @param path - API endpoint path (e.g., '/texts/123')
 * @param data - Data to send in request body
 * @param config - Optional axios config
 * @returns Promise with response data
 */
export function put(path: string, data?: any, config?: any): Promise<ResponseData> {
    try {
        // axiosInstance already has baseURL, so just use the path
        const res = axiosInstance.put<ResponseData>(path, data, config).then(res => res.data);
        return res;
    } catch (error) {
        throw error;
    }
}

/**
 * DELETE request
 * @param path - API endpoint path (e.g., '/texts/123')
 * @param config - Optional axios config
 * @returns Promise with response data
 */
export function del(path: string, config?: any): Promise<ResponseData> {
    try {
        // axiosInstance already has baseURL, so just use the path
        const res = axiosInstance.delete<ResponseData>(path, config).then(res => res.data);
        return res;
    } catch (error) {
        throw error;
    }
}

export const api = {
    get: get,
    post: post,
    put: put,
    del: del
}