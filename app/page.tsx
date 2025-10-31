"use client";

import Link from "next/link";
import { WavyBackground } from "@/components/ui/wavy-background";

export default function Page() {
  return (
    <WavyBackground className="max-w-4xl mx-auto pb-40">
      <p className="text-2xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center">
        Infinity
      </p>
      <p className="text-base md:text-lg mt-4 text-white font-normal inter-var text-center">
        Пет проект длинною в жизнь
      </p>
      <p className="flex items-center justify-center p-2">
        <Link
          href="/login"
          className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2"
        >
          Войти
        </Link>
      </p>
    </WavyBackground>
  );
}
