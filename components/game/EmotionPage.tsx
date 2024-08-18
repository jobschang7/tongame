"use client";

import Image from "next/image";
import {
    FomoIcon,
    FudIcon,
    EmotionDownIcon,
    EmotionFomoIcon,
    EmotionFudIcon,
} from "@/images";
import { useSpring, animated } from "react-spring";
import { useEffect, useRef, useState } from "react";
import AnimateSpring from "../EmotionAnimateSpring";

interface EmotionProps {
    update: (e: any) => void;
}

export default function EmotionPage({ update }: EmotionProps) {
    const bagsNum = 60;
    const [count, setCount] = useState(30);
    const timer = useRef<any>(null);
    const timer2 = useRef<any>(null);
    const [gameover, setGameover] = useState(false);
    const [bags, setBags] = useState<any[]>([]);

    const onCountdown = () => {
        setCount((prevTimeLeft) => prevTimeLeft - 1);
    };

    useEffect(() => {
        timer.current = setInterval(onCountdown, 1000);
        return () => clearInterval(timer.current);
    }, []);

    const init = () => {
        let count = 0;
        timer2.current = setInterval(() => {
            if (count >= bagsNum) {
                clearInterval(timer2.current);
                setGameover(true);
                return;
            }
            createBag(count);
            count++;
        }, 1000);
    };

    const createBag = (i: number) => {
        setBags((prev) => [
            ...(prev.length > 3 ? prev.slice(1) : prev),
            {
                key: i,
                left: `${Math.floor(Math.random() * 90)}%`,
                show: true,
            },
        ]);
    };

    const handleBagClick = (key: any, e: any) => {
        console.log("key:", key);

        setBags((bags) => {
            bags[key].show = false;
            return bags;
        });
        update && update(e);
    };

    useEffect(() => {
        init();
    }, []);

    return (
        <div className="w-full h-full bg-gradient-to-b relative from-[#EFEEF2] to-[#9647FF] flex flex-col">
            <div className="w-full h-[200px] flex justify-center items-center">
                <div className="w-full flex items-end justify-center">
                    <strong className="countDown">{count}</strong>
                    <Image
                        src={EmotionDownIcon}
                        alt="down"
                        width={25}
                        height={25}
                        className="mb-4"
                    />
                </div>
            </div>
            <div className="w-full h-[70px] relative">
                <div className="w-[130px] h-[20px] absolute left-[50px]">
                    <Image src={EmotionFomoIcon} alt="fomo" fill />
                    <span className="absolute right-2 top-0 text-[20px] leading-[20px] text-[#000]">
                        10
                    </span>
                </div>
                <div className="w-[130px] h-[20px] absolute right-[50px] bottom-0">
                    <Image src={EmotionFudIcon} alt="fud" fill />
                    <span className="absolute right-2 top-0 text-[20px] leading-[20px] text-[#000]">
                        0
                    </span>
                </div>
            </div>
            <div className="w-full flex-1 relative">
                {bags.map((bag: any, index) => (
                    <AnimateSpring
                        key={bag.key + "_" + bag.left}
                        left={bag.left}
                        show={bag.show}
                    >
                        {bag.show ? (
                            <div
                                className="bag"
                                onClick={(e) => {
                                    handleBagClick(index, e);
                                }}
                            >
                                <Image src={"/bag-icon.png"} alt="bag" fill />
                            </div>
                        ) : null}
                    </AnimateSpring>
                ))}
            </div>
        </div>
    );
}
