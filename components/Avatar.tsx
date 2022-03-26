import clsx from "clsx";
import Image from "next/image";
import React from "react";

type Props = {
  name: string | null;
  image: string | null;
};

const colors = [
  "bg-zinc-500",
  "bg-stone-500",
  "bg-red-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-lime-600",
  "bg-green-600",
  "bg-emerald-500",
  "bg-teal-500",
  "bg-indigo-600",
  "bg-violet-500",
  "bg-purple-500",
  "bg-fuchsia-600",
  "bg-pink-500",
  "bg-rose-500",
];

const Avatar: React.FC<Props> = ({ name, image }) => {
  if (image) {
    return (
      <Image
        className="rounded-full"
        width="100%"
        height="100%"
        src={image}
        alt={"Profile image" + (" for " + name || "")}
      />
    );
  }

  let initials = "AB";
  if (name?.length > 0) {
    initials = name.slice(0, 2).toUpperCase();
  }

  let hash = 0;
  for (let i = 0; i < initials.length; i++) {
    let char = initials.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  const color = colors[hash % colors.length];

  return (
    <span
      className={clsx("inline-flex items-center justify-center h-full w-full rounded-full", color)}
    >
      <span className="text-md font-medium leading-none text-white">{initials}</span>
    </span>
  );
};

export default Avatar;
