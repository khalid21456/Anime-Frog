import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import { AnimeCard } from "@/components/AnimeCard";

const GenreAnimes = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch genre info
  const { data: genreInfo } = useQuery({
    queryKey: ["genre", id],
    queryFn: async () => {
      const response = await fetch("https://api.jikan.moe/v4/genres/anime");
      if (!response.ok) {
        throw new Error("Failed to fetch genres");
      }
      const data = await response.json();
      return data.data.find((genre: any) => genre.mal_id === parseInt(id || "0"));
    },
    enabled: !!id,
  });

  // Fetch animes for this genre
  const { data: animes, isLoading, isError } = useQuery({
    queryKey: ["genreAnimes", id],
    queryFn: async () => {
      const response = await fetch(`https://api.jikan.moe/v4/anime?genres=${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch anime for genre");
      }
      const data = await response.json();
      return data.data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="bg-secondary rounded h-8 w-64 mb-6"></div>
            <div className="bg-secondary rounded h-4 w-32 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-secondary rounded-lg h-80 mb-3"></div>
                  <div className="bg-secondary rounded h-4 mb-2"></div>
                  <div className="bg-secondary rounded h-3 w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !animes) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Failed to load anime</h1>
          <p className="text-muted-foreground mb-6">Please try again later.</p>
          <Button onClick={() => navigate("/genres")} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Genres
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <Button
          onClick={() => navigate("/genres")}
          variant="outline"
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Genres
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {genreInfo?.name || "Genre"} Anime
          </h1>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-sm">
              {animes.length} anime found
            </Badge>
            {genreInfo?.count && (
              <Badge variant="secondary" className="text-sm">
                Total: {genreInfo.count} anime
              </Badge>
            )}
          </div>
        </div>

        {animes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {animes.map((anime: any) => (
              <AnimeCard key={anime.mal_id} anime={anime} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No anime found for this genre.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenreAnimes;