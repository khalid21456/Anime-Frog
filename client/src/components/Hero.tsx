import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AnimatedText } from "./AnimatedText";

interface HeroProps {
  onSearch: (query: string) => void;
}

export const Hero = ({ onSearch }: HeroProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  return (
    <section className="bg-gradient-to-br from-background via-background to-secondary py-20">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <img 
              src="/lovable-uploads/ca19da24-cf14-4cb3-b233-f4faf5e7bcd3.png" 
              alt="Anime Frog Logo" 
              className="h-72 w-auto mx-auto"
            />
          </div>
          <AnimatedText 
            englishText="Discover amazing anime series and movies. Your gateway to the world of Japanese animation."
            japaneseText="素晴らしいアニメシリーズと映画を発見しよう。日本のアニメーション世界への入り口。"
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          />
          
          <div className="flex max-w-md mx-auto mb-8 gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search anime..."
                className="pl-10 h-12 text-base bg-background border-border focus:border-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            <Button 
              className="h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>
          
        </div>
      </div>
    </section>
  );
};
