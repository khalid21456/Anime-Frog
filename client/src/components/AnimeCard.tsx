import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

export interface Anime {
  mal_id: number;
  title: string;
  title_english?: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
    webp: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  score: number;
  episodes: number;
  year?: number;
  synopsis: string;
  genres: Array<{
    mal_id: number;
    type: string;
    name: string;
  }>;
  status: string;
  type: string;
}

interface AnimeCardProps {
  anime: Anime;
}

export const AnimeCard = ({ anime }: AnimeCardProps) => {
  return (
    <Link to={`/animeDetail/${anime.mal_id}`}>
      <Card className="group overflow-hidden border-border bg-card hover:bg-secondary transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
      <div className="relative overflow-hidden bg-secondary rounded-t-lg">
        <img
          src={anime.images.jpg.large_image_url || anime.images.jpg.image_url}
          alt={anime.title}
          className="w-full h-80 object-contain transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-primary text-primary-foreground">
            ⭐ {anime.score}
          </Badge>
        </div>
        <div className="absolute bottom-2 left-2">
          <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
            {anime.episodes} eps
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <h3 className="font-bold text-lg leading-tight line-clamp-2 text-foreground">
          {anime.title_english || anime.title}
        </h3>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{anime.year}</span>
          <span className="capitalize">{anime.type}</span>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
          {anime.synopsis}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {anime.genres.slice(0, 3).map((genre) => (
            <Badge
              key={genre.mal_id}
              variant="outline"
              className="text-xs border-primary/20 text-primary"
            >
              {genre.name}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <Badge 
            variant={anime.status === "Currently Airing" ? "default" : "secondary"}
            className={anime.status === "Currently Airing" ? "bg-primary" : ""}
          >
            {anime.status}
          </Badge>
        </div>
      </CardContent>
    </Card>
    </Link>
  );
};