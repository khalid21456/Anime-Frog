import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { AnimeCard } from "@/components/AnimeCard";
import { useAnimes } from "@/hooks/useAnimes";
import { useAnimeSearch } from "@/hooks/useAnimeSearch";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const { data: animes, isLoading, isError, error } = useAnimes();
  const { data: searchResults, isLoading: isSearchLoading, isError: isSearchError, error: searchError } = useAnimeSearch(searchQuery);
  const { toast } = useToast();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  };

  useEffect(() => {
    if (isError) {
      toast({
        title: "Error loading animes",
        description: error?.message || "Failed to fetch anime data. Please try again later.",
        variant: "destructive",
      });
    }
  }, [isError, error, toast]);

  const displayAnimes = searchQuery ? searchResults : animes;
  const displayLoading = searchQuery ? isSearchLoading : isLoading;
  
  // Pagination logic
  const totalPages = displayAnimes ? Math.ceil(displayAnimes.length / itemsPerPage) : 0;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAnimes = displayAnimes?.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero onSearch={handleSearch} />
      
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {searchQuery ? `Search Results for "${searchQuery}"` : "Featured Anime"}
          </h2>
          <p className="text-muted-foreground">
            {searchQuery ? "Results from your search" : "Discover popular and trending anime series"}
          </p>
        </div>

        {isSearchError && searchQuery && (
          <div className="text-center py-12">
            <div className="relative inline-block mb-4">
              <img 
                src="/lovable-uploads/ceba3d28-d159-47ea-8b14-251311c030f9.png" 
                alt="API Error" 
                className="w-64 h-auto mx-auto"
              />
              <div className="absolute bottom-0 left-0 right-0 h-28 bg-background"></div>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              API is not responding
            </h3>
            <p className="text-muted-foreground">
              Please check your connection or try again later.
            </p>
          </div>
        )}

        {displayLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-secondary rounded-lg h-64 mb-4"></div>
                <div className="bg-secondary rounded h-4 mb-2"></div>
                <div className="bg-secondary rounded h-4 w-3/4"></div>
              </div>
            ))}
          </div>
        )}

        {currentAnimes && currentAnimes.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentAnimes.map((anime) => (
                <AnimeCard key={anime.mal_id} anime={anime} />
              ))}
            </div>
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-8 flex flex-col items-center space-y-4">
                <div className="text-sm text-muted-foreground">
                  Showing {startIndex + 1}-{Math.min(endIndex, displayAnimes?.length || 0)} of {displayAnimes?.length || 0} results
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </Button>
                  
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let page;
                      if (totalPages <= 5) {
                        page = i + 1;
                      } else if (currentPage <= 3) {
                        page = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        page = totalPages - 4 + i;
                      } else {
                        page = currentPage - 2 + i;
                      }
                      
                      return (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(page)}
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
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}

        {displayAnimes && displayAnimes.length === 0 && !displayLoading && (
          <div className="text-center py-12">
            <div className="relative inline-block mb-4">
              <img 
                src="/lovable-uploads/e46c2a71-41bf-4bfa-80fa-a620f046e160.png" 
                alt="API Error" 
                className="w-48 h-auto mx-auto"
              />
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-background"></div>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {searchQuery ? "No search results found" : "No anime found"}
            </h3>
            <p className="text-muted-foreground">
              {searchQuery ? "Try searching with different keywords" : "Check back later for new content!"}
            </p>
          </div>
        )}
      </main>
      
      <footer className="bg-secondary border-t border-border py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="relative inline-block">
              <img 
                src="/lovable-uploads/afe36a37-9d85-429c-920f-3677109e2766.png" 
                alt="Anime Frog Logo" 
                className="h-32 w-auto"
              />
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-secondary"></div>
            </div>
          </div>
          <p className="text-muted-foreground">
            Your favorite anime discovery platform
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
