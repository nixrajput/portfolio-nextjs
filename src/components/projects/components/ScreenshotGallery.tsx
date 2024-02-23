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
      <Row classNames="w-full gap-4 overflow-y-hidden overflow-x-auto no-scrollbar items-center">
        {imageList.map((img, index) => {
          return (
            <Link
              key={`screenshot-${index}`}
              className="relative min-w-[10rem] lg:min-w-[12rem] max-w-[10rem] lg:max-w-[12rem] aspect-[9/16] border border-[var(--textColor30)] rounded-[var(--defaultRadius)] overflow-hidden drop_in"
              href={{
                pathname: pathname,
                query: { id: searchParams.get("id"), imgSrc: img },
              }}
              scroll={false}
            >
              <Image
                src={img}
                alt={`screenshot-${index}`}
                fill
                sizes="100%"
                priority={false}
                loading="lazy"
                placeholder="blur"
                blurDataURL="/images/placeholder.png"
                className="w-full h-full object-contain py-4 px-2"
              />
            </Link>
          );
        })}
      </Row>
    </Column>
  );
};

export default ScreenshotGallery;
