import axios from 'axios'

// Create axios instance with common configuration
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('Making request:', config.method?.toUpperCase(), config.url)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.status, response.config.url)
    return response
  },
  (error) => {
    console.error('API Error:', error.response?.status, error.message)
    return Promise.reject(error)
  }
)

// Types for API responses
export interface Post {
  id: number
  userId: number
  title: string
  body: string
}

export interface User {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

export interface ApiComment {
  id: number
  postId: number
  name: string
  email: string
  body: string
}

export interface Photo {
  id: number
  albumId: number
  title: string
  url: string
  thumbnailUrl: string
}

// API functions
export const fetchPosts = async (): Promise<Post[]> => {
  const response = await api.get<Post[]>('/posts')
  return response.data
}

export const fetchPost = async (id: number): Promise<Post> => {
  const response = await api.get<Post>(`/posts/${id}`)
  return response.data
}

export const fetchUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>('/users')
  return response.data
}

export const fetchUser = async (id: number): Promise<User> => {
  const response = await api.get<User>(`/users/${id}`)
  return response.data
}

export const fetchComments = async (postId?: number): Promise<ApiComment[]> => {
  const url = postId ? `/posts/${postId}/comments` : '/comments'
  const response = await api.get<ApiComment[]>(url)
  return response.data
}

export const fetchPhotos = async (albumId?: number): Promise<Photo[]> => {
  const url = albumId ? `/albums/${albumId}/photos` : '/photos'
  const response = await api.get<Photo[]>(url)
  return response.data.slice(0, 20) // Limit to 20 photos for performance
}

// Legacy function for backward compatibility
export const fetchData = async (): Promise<Post> => {
  return fetchPost(1)
}

export default api