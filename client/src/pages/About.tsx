import { Header } from "@/components/Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Mail } from "lucide-react";

const About = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-6xl mb-6">
                <img
                  src="/lovable-uploads/bleach.png"
                  alt="Anime Frog Logo"
                  className="h-72 w-auto mx-auto"
                />
              </div>
              <h1 className="text-4xl font-bold text-primary mb-4">
                About Anime Frog
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Your ultimate destination for discovering and exploring the
                wonderful world of anime
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-primary font-bold">
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Anime Frog was created to provide anime enthusiasts with an
                    easy-to-use platform for discovering new series, exploring
                    different genres, and keeping track of their favorite shows.
                  </p>
                  <p className="text-muted-foreground">
                    We believe that anime is more than just entertainment - it's
                    a form of art that brings people together from all around
                    the world.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-primary font-bold">
                    Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Browse anime by genres
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Search for your favorite series
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Detailed anime information
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Clean and intuitive interface
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Developer</CardTitle>
                <CardDescription>
                  Meet the creator behind Anime Frog
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                  <img
                    src="/lovable-uploads/89735c91-c154-47c3-b213-856fedc07dda.png"
                    alt="Khalid Edaoudi Profile"
                    className="w-24 h-24 sm:w-20 sm:h-20 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Khalid Edaoudi
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3 justify-center sm:justify-start">
                      <Badge variant="destructive">Full-Stack Developer</Badge>
                      <Badge variant="default">React</Badge>
                      <Badge variant="default">NodeJs</Badge>
                      <Badge variant="default">TypeScript</Badge>
                      <Badge variant="default">Java</Badge>
                      <Badge variant="default">Spring Boot</Badge>
                      <Badge variant="default">ExpressJs</Badge>
                      <Badge variant="default">NextJs</Badge>
                      <Badge variant="default">MongoDB</Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Full-stack developer passionate about creating
                      user-friendly applications. I developed Anime Frog to
                      combine my love for technology with my appreciation for
                      anime culture.
                    </p>
                    <div className="flex gap-4 justify-center sm:justify-start">
                      <a
                        href="https://github.com/khalid21456"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                      >
                        <Github size={20} />
                        <span className="text-sm">GitHub</span>
                      </a>
                      <a
                        href="https://www.linkedin.com/feed/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                      >
                        <Linkedin size={20} />
                        <span className="text-sm">LinkedIn</span>
                      </a>
                      <a
                        href="mailto:khalidedaoudi8@gmail.com"
                        className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                      >
                        <Mail size={20} />
                        <span className="text-sm">Contact</span>
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center mt-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Thank You for Using Anime Frog!
              </h2>
              <p className="text-muted-foreground">
                We hope you enjoy exploring the amazing world of anime with us.
                Your feedback and suggestions are always welcome.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
