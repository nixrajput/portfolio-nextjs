import Image from "next/image";

const GalleryImageView = ({
  src,
  alt,
}: Readonly<{ src: string; alt?: string }>) => {
  return (
    <Image
      src={src}
      alt={alt || `img`}
      width={1080}
      height={1080}
      sizes="100%"
      priority={false}
      loading="lazy"
      placeholder="blur"
      blurDataURL="/images/placeholder.png"
      className="w-full h-auto max-h-[calc(100vh-8rem)] object-contain m-auto"
    />
  );
};

export default GalleryImageView;
