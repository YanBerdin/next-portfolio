"use client"

import { useState } from 'react';
import Image, { StaticImageData } from 'next/image';

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface BlurImageProps {
  src: string | StaticImageData
  alt?: string;
  width: number;
  height: number;
  [key: string]: any;
}

function BlurImage({ src, alt = '', width, height, ...props }: BlurImageProps) {
  const [isLoading, setLoading] = useState(true);

  return (
    <Image
      {...props}
      src={src}
      alt={alt}
      width={width}
      height={height}
      // fill={true}
      // objectFit="cover" // deprecated
      className={cn(
        'duration-700 ease-in-out',
        isLoading
          ? 'grayscale blur-2xl scale-105'
          : 'grayscale-0 blur-0 scale-100',
        props.className // passer les props de BlurImage à Image pour les classes CSS
      )}
      onLoad={() => setLoading(false)}
    />
  );
}

export default BlurImage;
