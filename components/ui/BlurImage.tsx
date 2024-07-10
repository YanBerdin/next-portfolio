// "use client"

import Image from 'next/image';
// import { useState } from 'react';

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
/*
interface BlurImageProps {
  src: string;
  [key: string]: any;
}

function BlurImage({ src, ...props }: BlurImageProps) {
  const [isLoading, setLoading] = useState(true);

  return (
    <Image
      {...props}
      src={src}
      alt='Blur Image'
      //layout="fill"
      objectFit="cover"
      className={cn(
        'duration-700 ease-in-out',
        isLoading
          ? 'grayscale blur-2xl scale-110'
          : 'grayscale-0 blur-0 scale-100'
      )}
      onLoadingComplete={() => setLoading(false)}
    />
  );
}
*/

interface BlurImageProps {
  src: string;
  alt?: string;
  width: number;
  height: number;
  [key: string]: any;
}

function BlurImage({ src, alt = '', width, height, ...props }: BlurImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      {...props}
      width={width}
      height={height}
      // fill={true}
      objectFit="cover"
      className={cn(
        'duration-700 ease-in-out grayscale-0 blur-0 scale-100'
      )}
    />
  );
}

export default BlurImage;
