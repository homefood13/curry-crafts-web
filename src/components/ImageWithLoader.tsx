
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface ImageWithLoaderProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}

const ImageWithLoader: React.FC<ImageWithLoaderProps> = ({
  src,
  alt,
  className,
  containerClassName,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState<string>('');
  
  useEffect(() => {
    // Reset state when src changes
    setIsLoading(true);
    
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setIsLoading(false);
    };
    img.onerror = () => {
      console.error(`Failed to load image: ${src}`);
      setIsLoading(false);
    };
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {isLoading && (
        <div className="absolute inset-0 bg-muted animate-pulse rounded-md" />
      )}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          className={cn(
            "transition-opacity duration-500 ease-in-out",
            isLoading ? "opacity-0" : "opacity-100",
            className
          )}
          {...props}
        />
      )}
    </div>
  );
};

export default ImageWithLoader;
