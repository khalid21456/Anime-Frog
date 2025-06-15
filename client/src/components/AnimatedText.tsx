import { useState, useEffect } from "react";

interface AnimatedTextProps {
  englishText: string;
  japaneseText: string;
  className?: string;
}

export const AnimatedText = ({ englishText, japaneseText, className = "" }: AnimatedTextProps) => {
  const [isJapanese, setIsJapanese] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setIsJapanese(prev => !prev);
        setIsVisible(true);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`font-noto-jp transition-all duration-300 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-2'} ${className}`}>
      {isJapanese ? japaneseText : englishText}
    </div>
  );
};