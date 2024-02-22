"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Row from "@/components/core/Row";
import Column from "@/components/core/Column";

const ScreenshotGallery = ({
  imageList,
}: Readonly<{ imageList: string[] }>) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <Column classNames="w-full mt-4">
      <Row classNames="w-full gap-4 overflow-x-auto no-scrollbar items-center justify-center">
        {imageList.map((img, index) => {
          return (
            <Link
              key={`screenshot-${index}`}
              className="hover:scale-105"
              style={{
                position: "relative",
                width: "auto",
                height: "auto",
                transition: "all 0.5s ease-in-out",
                animation: "drop-in 1s ease 500ms backwards",
              }}
              href={{
                pathname: pathname,
                query: { id: searchParams.get("id"), imgSrc: img },
              }}
              scroll={false}
            >
              <Image
                src={img}
                alt={`screenshot-${index}`}
                width={400}
                height={400}
                sizes="100%"
                priority={false}
                loading="lazy"
                placeholder="blur"
                blurDataURL="/images/placeholder.png"
                className="w-auto h-auto max-h-[25rem] object-contain"
              />
            </Link>
          );
        })}
      </Row>
    </Column>
  );
};

export default ScreenshotGallery;
