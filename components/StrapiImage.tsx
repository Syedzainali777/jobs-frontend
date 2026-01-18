"use client";

import Image from "next/image";
import { getStrapiImageUrl, getStrapiImageAlt } from "@/lib/api";
import { StrapiImage } from "@/lib/api";

interface StrapiImageProps {
  image?: StrapiImage | any;
  alt?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export default function StrapiImageComponent({
  image,
  alt,
  fill,
  width,
  height,
  className = "",
  priority = false,
  sizes,
}: StrapiImageProps) {
  const imageUrl = getStrapiImageUrl(image);
  const imageAlt = getStrapiImageAlt(image) || alt || "";

  if (!imageUrl) {
    return null;
  }

  // Check if URL is localhost - use regular img tag for localhost in development
  const isLocalhost = imageUrl.includes("localhost") || imageUrl.includes("127.0.0.1");

  if (isLocalhost) {
    // Use regular img tag for localhost URLs to avoid Next.js Image optimization issues
    if (fill) {
      return (
        <img
          src={imageUrl}
          alt={imageAlt}
          className={className}
          style={{ 
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
        />
      );
    }

    return (
      <img
        src={imageUrl}
        alt={imageAlt}
        width={width}
        height={height}
        className={className}
      />
    );
  }

  // Use Next.js Image for non-localhost URLs
  if (fill) {
    return (
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        className={className}
        priority={priority}
        sizes={sizes}
      />
    );
  }

  return (
    <Image
      src={imageUrl}
      alt={imageAlt}
      width={width || 800}
      height={height || 450}
      className={className}
      priority={priority}
    />
  );
}

