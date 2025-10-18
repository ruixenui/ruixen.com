"use client";

import React from "react";
import { ContainerTextScroll } from "@/registry/ruixenui/container-text-scroll";
import Image from "next/image";

export default function ContainerTextScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden pb-[300px]">
      <ContainerTextScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-white">
              Explore the realm of <br />
              <span className="text-7xl md:text-[8rem] font-bold mt-1 leading-none">
                Infinite Patterns
              </span>
              <br />
              <a
                href="https://www.ruixen.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-4 text-2xl font-medium text-gray-300 hover:text-white transition-colors"
              >
                Ruixen UI
              </a>
            </h1>
          </>
        }
      >
        <Image
          src={`https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/abstract-bg_11zon.jpg`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerTextScroll>
    </div>
  );
}
