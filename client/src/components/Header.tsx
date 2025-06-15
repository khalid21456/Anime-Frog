import { Link, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="bg-background border-b border-border sticky top-0 z-50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/ca19da24-cf14-4cb3-b233-f4faf5e7bcd3.png" 
                alt="Anime Frog Logo" 
                className="h-16 w-auto"
              />
            </Link>
            
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex items-center space-x-6">
                <Link 
                  to="/" 
                  className={`hover:text-primary transition-colors ${
                    isActive('/') 
                      ? 'text-primary font-bold' 
                      : 'text-muted-foreground'
                  }`}
                >
                  Home
                </Link>
                <Link 
                  to="/genres" 
                  className={`hover:text-primary transition-colors ${
                    isActive('/genres') 
                      ? 'text-primary font-bold' 
                      : 'text-muted-foreground'
                  }`}
                >
                  Genres
                </Link>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Favorites
                </a>
                <Link 
                  to="/about" 
                  className={`hover:text-primary transition-colors ${
                    isActive('/about') 
                      ? 'text-primary font-bold' 
                      : 'text-muted-foreground'
                  }`}
                >
                  About
                </Link>
              </nav>
              
              <Sheet>
                <SheetTrigger asChild>
                  <button className="md:hidden text-foreground p-2">
                    <Menu className="h-6 w-6" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <nav className="flex flex-col space-y-6 mt-6">
                    <Link 
                      to="/" 
                      className={`text-lg hover:text-primary transition-colors ${
                        isActive('/') 
                          ? 'text-primary font-bold' 
                          : 'text-muted-foreground'
                      }`}
                    >
                      Home
                    </Link>
                    <Link 
                      to="/genres" 
                      className={`text-lg hover:text-primary transition-colors ${
                        isActive('/genres') 
                          ? 'text-primary font-bold' 
                          : 'text-muted-foreground'
                      }`}
                    >
                      Genres
                    </Link>
                    <a href="#" className="text-lg text-muted-foreground hover:text-primary transition-colors">
                      Favorites
                    </a>
                    <Link 
                      to="/about" 
                      className={`text-lg hover:text-primary transition-colors ${
                        isActive('/about') 
                          ? 'text-primary font-bold' 
                          : 'text-muted-foreground'
                      }`}
                    >
                      About
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};