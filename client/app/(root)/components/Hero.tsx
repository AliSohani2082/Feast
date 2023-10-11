"use client";

import { TypeAnimation } from "react-type-animation";
import { useSpring, animated } from "@react-spring/web";

import Image from "next/image";

const IMG_URL = "/images/hero";

export function Hero() {
  const images = [
    {
      name: "desert",
      url: `${IMG_URL}/desert.png`,
    },
    {
      name: "salad",
      url: `${IMG_URL}/salad.png`,
    },
    {
      name: "pizza",
      url: `${IMG_URL}/pizza.png`,
    },
    {
      name: "spageti",
      url: `${IMG_URL}/spageti.png`,
    },
  ];

  return (
    <div className="w-full flex flex-row sm:flex-col justify-center items-center">
      <div>
        <TypeAnimation
          preRenderFirstString={true}
          sequence={[
            500,
            "We have recipe for Breakfast",
            1000,
            "We have recipe for Lunch",
            1000,
            "We have recipe for Dinner",
            1000,
            "We have recipe for Dessert",
            500,
          ]}
          speed={50}
          style={{ fontSize: "2em" }}
          repeat={Infinity}
        />
      </div>
      <div>
        <animated.div />
      </div>
    </div>
  );
}
