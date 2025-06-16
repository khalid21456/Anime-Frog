import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Badge } from "@/components/ui/badge";

const Genres = () => {
  const { data: genres, isLoading, isError } = useQuery({
    queryKey: ["animeGenres"],
    queryFn: async () => {
      const response = await fetch("https://api.jikan.moe/v4/genres/anime");
      if (!response.ok) {
        throw new Error("Failed to fetch anime genres");
      }
      const data = await response.json();
      return data.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-foreground mb-8">Anime Genres</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-secondary rounded-lg h-16 flex items-center justify-center">
                  <div className="bg-muted rounded h-4 w-20"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError || !genres) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Failed to load genres</h1>
          <p className="text-muted-foreground">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
             <img
            src="/lovable-uploads/slam_dunk.png"
            alt="Anime Genres"
            className="h-72 w-auto mx-auto mb-8"
          />
          </div>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Anime Genres</h1>
          <p className="text-muted-foreground text-lg">
            Discover anime by your favorite genres
          </p>
        </div>
        <div>
          <img
            src="/lovable-uploads/attck.png"
            alt="Anime Genres"
            className="h-72 w-auto mx-auto mb-8"
          />
        </div>
        
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {genres.map((genre) => (
            <Link
              key={genre.mal_id}
              to={`/genre/${genre.mal_id}`}
              className="group"
            >
              <div className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105 hover:border-primary/50">
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {genre.name}
                </h3>
                <Badge variant="outline" className="text-xs">
                  {genre.count} anime
                </Badge>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-sm">
            Found {genres.length} anime genres
          </p>
        </div>
      </div>
    </div>
  );
};

export default Genres;