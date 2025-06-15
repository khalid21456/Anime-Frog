import { useQuery } from '@tanstack/react-query';
import { Anime } from '@/components/AnimeCard';

interface SearchApiResponse {
  success: boolean;
  message: string;
  count: number;
  data: Anime[];
}

const fetchAnimeSearch = async (query: string): Promise<Anime[]> => {
  if (!query.trim()) {
    return [];
  }
  
  const response = await fetch(`http://localhost:3000/api/SearchAnime?query=${encodeURIComponent(query)}`);
  
  if (!response.ok) {
    throw new Error('Failed to search anime');
  }
  
  const apiResponse: SearchApiResponse = await response.json();
  return apiResponse.data;
};

export const useAnimeSearch = (query: string) => {
  return useQuery({
    queryKey: ['animeSearch', query],
    queryFn: () => fetchAnimeSearch(query),
    enabled: !!query.trim(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });
};