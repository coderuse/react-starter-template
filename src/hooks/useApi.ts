import { useQuery, useQueries } from '@tanstack/react-query'
import { 
  fetchPosts, 
  fetchPost, 
  fetchUsers, 
  fetchUser, 
  fetchComments, 
  fetchPhotos,
  Post,
  User,
  ApiComment,
  Photo
} from '../services/api'

// Custom hooks using React Query

export const usePosts = () => {
  return useQuery<Post[], Error>({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const usePost = (id: number) => {
  return useQuery<Post, Error>({
    queryKey: ['post', id],
    queryFn: () => fetchPost(id),
    enabled: !!id,
  })
}

export const useUsers = () => {
  return useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useUser = (id: number) => {
  return useQuery<User, Error>({
    queryKey: ['user', id],
    queryFn: () => fetchUser(id),
    enabled: !!id,
  })
}

export const useComments = (postId?: number) => {
  return useQuery<ApiComment[], Error>({
    queryKey: postId ? ['comments', 'post', postId] : ['comments'],
    queryFn: () => fetchComments(postId),
    staleTime: 3 * 60 * 1000, // 3 minutes
  })
}

export const usePhotos = (albumId?: number) => {
  return useQuery<Photo[], Error>({
    queryKey: albumId ? ['photos', 'album', albumId] : ['photos'],
    queryFn: () => fetchPhotos(albumId),
    staleTime: 15 * 60 * 1000, // 15 minutes
  })
}

// Combined hook to fetch post with its comments and author
export const usePostWithDetails = (postId: number) => {
  const queries = useQueries({
    queries: [
      {
        queryKey: ['post', postId],
        queryFn: () => fetchPost(postId),
        enabled: !!postId,
      },
      {
        queryKey: ['comments', 'post', postId],
        queryFn: () => fetchComments(postId),
        enabled: !!postId,
      },
    ],
  })

  const [postQuery, commentsQuery] = queries

  // Fetch user details once we have the post
  const userQuery = useQuery<User, Error>({
    queryKey: ['user', postQuery.data?.userId],
    queryFn: () => fetchUser(postQuery.data!.userId),
    enabled: !!postQuery.data?.userId,
  })

  return {
    post: postQuery,
    comments: commentsQuery,
    user: userQuery,
    isLoading: postQuery.isLoading || commentsQuery.isLoading || userQuery.isLoading,
    error: postQuery.error || commentsQuery.error || userQuery.error,
  }
}

// Hook for dashboard data (multiple API calls)
export const useDashboardData = () => {
  const queries = useQueries({
    queries: [
      {
        queryKey: ['posts'],
        queryFn: fetchPosts,
      },
      {
        queryKey: ['users'],
        queryFn: fetchUsers,
      },
      {
        queryKey: ['photos'],
        queryFn: () => fetchPhotos(),
      },
    ],
  })

  const [postsQuery, usersQuery, photosQuery] = queries

  return {
    posts: postsQuery,
    users: usersQuery,
    photos: photosQuery,
    isLoading: postsQuery.isLoading || usersQuery.isLoading || photosQuery.isLoading,
    error: postsQuery.error || usersQuery.error || photosQuery.error,
  }
}