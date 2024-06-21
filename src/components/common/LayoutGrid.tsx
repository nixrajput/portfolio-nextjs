"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Balancer from "react-wrap-balancer";
import Column from "@/components/core/Column";
import DialogSkeleton from "./DialogSkeleton";
import { IServiceItem } from "@/types";

export const LayoutGrid = ({ cards }: { cards: IServiceItem[] }) => {
  const [selected, setSelected] = useState<IServiceItem | null>(null);
  const [lastSelected, setLastSelected] = useState<IServiceItem | null>(null);

  const handleClick = (card: IServiceItem) => {
    setLastSelected(selected);
    setSelected(card);
  };

  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto mt-16 gap-4 relative">
      {cards.map((card, i) => (
        <div key={i} className={cn(card.className, "")}>
          <motion.div
            onClick={() => handleClick(card)}
            className={cn(
              card.className,
              "relative overflow-hidden p-4 w-full",
              selected?.id === card.id
                ? "rounded-lg cursor-pointer absolute inset-0 h-1/2 w-full md:w-1/2 m-auto z-50 flex justify-center items-center flex-wrap flex-col"
                : lastSelected?.id === card.id
                ? "z-40 bg-[var(--textColor10)] rounded-xl h-full w-full"
                : "bg-[var(--textColor10)] rounded-xl h-full w-full"
            )}
            layout
          >
            {selected?.id === card.id && <SelectedCard selected={selected} />}
            <CardItem card={card} />
          </motion.div>
        </div>
      ))}

      <motion.div
        onClick={handleOutsideClick}
        className={cn(
          "absolute h-full w-full left-0 top-0 bg-black opacity-0 z-10",
          selected?.id ? "pointer-events-auto" : "pointer-events-none"
        )}
        animate={{ opacity: selected?.id ? 0.3 : 0 }}
      />
    </div>
  );
};

const CardItem = ({ card }: { card: IServiceItem }) => {
  return (
    <Column classNames="items-center justify-between w-full h-full gap-16">
      <p className="text-2xl/6 font-semibold">{card.title}</p>

      <span className="w-8 h-1 bg-[var(--primaryColor)] rounded-full"></span>

      <p className="text-base/6 font-normal text-center">
        <Balancer>{card.shortDescription}</Balancer>
      </p>
    </Column>
  );
};

const SelectedCard = ({ selected }: { selected: IServiceItem | null }) => {
  return (
    <div className="bg-transparent h-full w-full flex flex-col justify-end rounded-lg shadow-2xl relative z-[60]">
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 0.6,
        }}
        className="absolute inset-0 h-full w-full bg-black opacity-60 z-10"
      />
      <motion.div
        initial={{
          opacity: 0,
          y: 100,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="relative px-8 pb-4 z-[70]"
      >
        <DialogSkeleton
          title={selected?.title}
          description={selected?.description}
        />
      </motion.div>
    </div>
  );
};
