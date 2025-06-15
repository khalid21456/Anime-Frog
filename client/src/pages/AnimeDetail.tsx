import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Header } from "@/components/Header";
import { useState, useEffect } from "react";

const AnimeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [episodePage, setEpisodePage] = useState(1);
  const episodesPerPage = 9;

  // Scroll to top when navigating to a new anime
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const { data: anime, isLoading, isError } = useQuery({
    queryKey: ["anime", id],
    queryFn: async () => {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch anime details");
      }
      const data = await response.json();
      return data.data;
    },
    enabled: !!id,
  });

  const { data: characters, isLoading: charactersLoading } = useQuery({
    queryKey: ["animeCharacters", id],
    queryFn: async () => {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/characters`);
      if (!response.ok) {
        throw new Error("Failed to fetch anime characters");
      }
      const data = await response.json();
      return data.data;
    },
    enabled: !!id,
  });

  const { data: episodes, isLoading: episodesLoading, error: episodesError } = useQuery({
    queryKey: ["animeEpisodes", id],
    queryFn: async () => {
      console.log("Fetching episodes for anime ID:", id);
      const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/videos/episodes`);
      console.log("Episodes API response status:", response.status);
      
      if (!response.ok) {
        console.error("Episodes API error:", response.status, response.statusText);
        throw new Error(`Failed to fetch anime episodes: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Episodes API data:", data);
      console.log("Episodes array length:", data.data?.length || 0);
      
      return data.data;
    },
    enabled: !!id,
  });

  const { data: videos, isLoading: videosLoading } = useQuery({
    queryKey: ["animeVideos", id],
    queryFn: async () => {
      console.log("Fetching videos for anime ID:", id);
      const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/videos`);
      console.log("Videos API response status:", response.status);
      
      if (!response.ok) {
        console.error("Videos API error:", response.status, response.statusText);
        throw new Error("Failed to fetch anime videos");
      }
      
      const data = await response.json();
      console.log("Videos API data:", data);
      console.log("Videos promo array:", data.data?.promo);
      
      return data.data;
    },
    enabled: !!id,
  });

  const { data: recommendations, isLoading: recommendationsLoading } = useQuery({
    queryKey: ["animeRecommendations", id],
    queryFn: async () => {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/recommendations`);
      if (!response.ok) {
        throw new Error("Failed to fetch anime recommendations");
      }
      const data = await response.json();
      return data.data;
    },
    enabled: !!id,
  });

  // Pagination logic for episodes
  const totalEpisodePages = episodes ? Math.ceil(episodes.length / episodesPerPage) : 0;
  const episodeStartIndex = (episodePage - 1) * episodesPerPage;
  const episodeEndIndex = episodeStartIndex + episodesPerPage;
  const currentEpisodes = episodes?.slice(episodeStartIndex, episodeEndIndex);

  const handleEpisodePageChange = (page: number) => {
    setEpisodePage(page);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="bg-secondary rounded-lg h-96 mb-6"></div>
            <div className="bg-secondary rounded h-8 mb-4"></div>
            <div className="bg-secondary rounded h-4 mb-2"></div>
            <div className="bg-secondary rounded h-4 w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !anime) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Anime not found</h1>
          <Button onClick={() => navigate("/")} className="bg-primary hover:bg-primary/90">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
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
          onClick={() => navigate("/")}
          variant="outline"
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-secondary rounded-lg p-4">
              <img
                src={anime.images.jpg.large_image_url || anime.images.jpg.image_url}
                alt={anime.title}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>

          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              {anime.title_english || anime.title}
            </h1>
            
            {anime.title_japanese && (
              <p className="text-xl text-muted-foreground mb-4">{anime.title_japanese}</p>
            )}

            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant="secondary" className="bg-primary text-primary-foreground">
                ⭐ {anime.score}
              </Badge>
              <Badge variant="outline">{anime.episodes} episodes</Badge>
              <Badge variant="outline">{anime.year}</Badge>
              <Badge variant="outline" className="capitalize">{anime.type}</Badge>
              <Badge 
                variant={anime.status === "Currently Airing" ? "default" : "secondary"}
                className={anime.status === "Currently Airing" ? "bg-primary" : ""}
              >
                {anime.status}
              </Badge>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-foreground mb-3">Synopsis</h2>
              <p className="text-muted-foreground leading-relaxed">
                {anime.synopsis}
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-foreground mb-3">Genres</h2>
              <div className="flex flex-wrap gap-2">
                {anime.genres?.map((genre) => (
                  <Badge
                    key={genre.mal_id}
                    variant="outline"
                    className="border-primary/20 text-primary"
                  >
                    {genre.name}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="text-foreground">{anime.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Aired:</span>
                    <span className="text-foreground">{anime.aired?.string}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Source:</span>
                    <span className="text-foreground">{anime.source}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rating:</span>
                    <span className="text-foreground">{anime.rating}</span>
                  </div>
                </div>
              </div>

              {anime.studios && anime.studios.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Studios</h3>
                  <div className="space-y-1">
                    {anime.studios.map((studio) => (
                      <div key={studio.mal_id} className="text-sm text-muted-foreground">
                        {studio.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Trailer Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">Trailer</h2>
          {videosLoading ? (
            <div className="animate-pulse">
              <div className="bg-secondary rounded-lg h-64 md:h-96"></div>
            </div>
          ) : videos?.promo && videos.promo.length > 0 ? (
            <div className="space-y-4">
              <div className="aspect-video rounded-lg overflow-hidden bg-secondary">
                <iframe
                  src={videos.promo[0].trailer.embed_url.replace('autoplay=1', 'autoplay=0')}
                  title={`${anime.title} Trailer - ${videos.promo[0].title}`}
                  frameBorder="0"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="text-center">
                <a
                  href={videos.promo[0].trailer.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm"
                >
                  Watch on YouTube: {videos.promo[0].title}
                </a>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">No trailer available</p>
          )}
        </div>

        {/* Characters Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">Characters</h2>
          {charactersLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-secondary rounded-lg h-32 mb-2"></div>
                  <div className="bg-secondary rounded h-4 mb-1"></div>
                  <div className="bg-secondary rounded h-3 w-3/4"></div>
                </div>
              ))}
            </div>
          ) : characters && characters.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {characters.slice(0, 24).map((characterData) => (
                <div key={characterData.character.mal_id} className="bg-card rounded-lg p-3 border border-border hover:shadow-lg transition-shadow">
                  <img
                    src={characterData.character.images.jpg.image_url}
                    alt={characterData.character.name}
                    className="w-full h-32 object-cover rounded-lg mb-2"
                  />
                  <h4 className="font-semibold text-sm text-foreground line-clamp-2 mb-1">
                    {characterData.character.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {characterData.role}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No characters available</p>
          )}
        </div>

        {/* Episodes Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">Episodes</h2>
          
          {/* Debug info */}
          {episodesError && (
            <div className="mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-destructive text-sm">
                Episodes API Error: {episodesError.message}
              </p>
            </div>
          )}
          
          {episodesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-secondary rounded-lg h-20 mb-2"></div>
                  <div className="bg-secondary rounded h-4 mb-1"></div>
                  <div className="bg-secondary rounded h-3 w-2/3"></div>
                </div>
              ))}
            </div>
          ) : currentEpisodes && currentEpisodes.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentEpisodes.map((episode, index) => (
                  <div key={index} className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img
                        src={anime.images.jpg.large_image_url || anime.images.jpg.image_url}
                        alt={anime.title}
                        className="w-full h-32 object-cover"
                      />
                      {episode.episode && (
                        <div className="absolute top-2 left-2">
                          <Badge variant="secondary" className="text-xs bg-background/80 backdrop-blur-sm">
                            Episode {episode.episode.mal_id}
                          </Badge>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-sm text-foreground mb-2 line-clamp-2">
                        {episode.episode?.title || `Episode ${episodeStartIndex + index + 1}`}
                      </h4>
                      {episode.episode?.url && (
                        <a
                          href={episode.episode.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline"
                        >
                          Watch Episode
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Episode Pagination Controls */}
              {totalEpisodePages > 1 && (
                <div className="mt-8 flex flex-col items-center space-y-4">
                  <div className="text-sm text-muted-foreground">
                    Showing {episodeStartIndex + 1}-{Math.min(episodeEndIndex, episodes?.length || 0)} of {episodes?.length || 0} episodes
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEpisodePageChange(episodePage - 1)}
                      disabled={episodePage === 1}
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Previous
                    </Button>
                    
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: Math.min(5, totalEpisodePages) }, (_, i) => {
                        let page;
                        if (totalEpisodePages <= 5) {
                          page = i + 1;
                        } else if (episodePage <= 3) {
                          page = i + 1;
                        } else if (episodePage >= totalEpisodePages - 2) {
                          page = totalEpisodePages - 4 + i;
                        } else {
                          page = episodePage - 2 + i;
                        }
                        
                        return (
                          <Button
                            key={page}
                            variant={episodePage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleEpisodePageChange(page)}
                            className="w-8 h-8 p-0"
                          >
                            {page}
                          </Button>
                        );
                      })}
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEpisodePageChange(episodePage + 1)}
                      disabled={episodePage === totalEpisodePages}
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-2">No episodes available</p>
              <p className="text-xs text-muted-foreground">
                Episodes data: {episodes ? `Array with ${episodes.length} items` : 'null/undefined'}
              </p>
              {episodesError && (
                <p className="text-xs text-destructive mt-2">
                  Check console for detailed error information
                </p>
              )}
            </div>
          )}
        </div>

        {/* Recommendations Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">Recommendations</h2>
          {recommendationsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-secondary rounded-lg h-64 mb-3"></div>
                  <div className="bg-secondary rounded h-4 mb-2"></div>
                  <div className="bg-secondary rounded h-3 w-3/4"></div>
                </div>
              ))}
            </div>
          ) : recommendations && recommendations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendations.slice(0, 12).map((rec) => (
                <Link 
                  key={rec.entry.mal_id} 
                  to={`/animeDetail/${rec.entry.mal_id}`}
                  className="group"
                >
                  <div className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="relative">
                      <img
                        src={rec.entry.images.jpg.large_image_url || rec.entry.images.jpg.image_url}
                        alt={rec.entry.title}
                        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm text-xs">
                          {rec.votes} votes
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-sm text-foreground line-clamp-2 mb-2">
                        {rec.entry.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Recommended by {rec.votes} users
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No recommendations available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimeDetail;