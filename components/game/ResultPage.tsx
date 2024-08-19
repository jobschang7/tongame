"use client";

import Image from "next/image";
import { ResultCoreIcon, ResultSloganIcon, ResultStarIcon } from "@/images";
import { useSpring, animated } from "react-spring";
import { useEffect, useRef, useState } from "react";


export default function ResultPage() {
    const [stars, setStars] = useState([
        {
            size: 18,
            color: "#FFFFFF",
        },
        {
            size: 18,
            color: "#FFFFFF",
        },
        {
            size: 15,
            color: "#FFFFFF",
        },
        {
            size: 15,
            color: "#FFFFFF",
        },
    ]);
    useEffect(() => {

    }, []);
    return (
        <div className="w-full h-full bg-gradient-to-b relative from-[#EFEEF2] to-[#9647FF]">
            <Image
                src={ResultSloganIcon}
                alt="slogan"
                width={240}
                height={215}
                className="mx-auto pt-8"
            />
            <div className="w-full flex justify-center items-center">
                <strong className="result-core relative">
                    +1200
                    <Image
                        src={ResultCoreIcon}
                        alt="core"
                        width={30}
                        height={22}
                        className="absolute -right-2 -top-2"
                    />
                </strong>
            </div>
            <div className="w-full h-[300px] absolute left-0 bottom-0">
                {stars.map((star, index) => (
                    <Image
                        key={index}
                        src={ResultStarIcon}
                        alt="core"
                        width={star.size}
                        height={star.size}
                        className=""
                    />
                ))}
            </div>
        </div>
    );
}
