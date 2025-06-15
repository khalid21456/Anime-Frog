import { useQuery } from '@tanstack/react-query';
import { Anime } from '@/components/AnimeCard';

interface ApiResponse {
  success: boolean;
  message: string;
  count: number;
  data: Anime[];
}

const fetchAnimes = async (): Promise<Anime[]> => {
  const response = await fetch('http://localhost:3000/api/LandingAnimes');
  
  if (!response.ok) {
    throw new Error('Failed to fetch animes');
  }
  
  const apiResponse: ApiResponse = await response.json();
  return apiResponse.data;
};

export const useAnimes = () => {
  return useQuery({
    queryKey: ['animes'],
    queryFn: fetchAnimes,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });
};