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
import { useGameStore } from "@/utils/game-mechanics";

interface EmotionProps {
    update: (e: any) => void;
    updateStep: () => void;
}

export default function EmotionPage({ update, updateStep }: EmotionProps) {
    const { pointsBalance, points, setPoints, setPointsBalance } =
        useGameStore();
    const sizes = [50, 35, 30];
    const [count, setCount] = useState(30);
    const timer = useRef<any>(null);
    const timer2 = useRef<any>(null);
    const [fomoCount, setFomoCount] = useState(0);
    const [fudCount, setFudCount] = useState(0);
    const [bags, setBags] = useState<any[]>([]);

    useEffect(() => {
        timer.current = setInterval(() => {
            setCount((prevTimeLeft) => {
                if (prevTimeLeft <= 1) {
                    clearInterval(timer.current);
                    clearInterval(timer2.current);
                    setPointsBalance(pointsBalance + 100);
                    setPoints(points + 100);
                    updateStep();
                    return 0;
                }
                return prevTimeLeft - 1;
            });
        }, 1000);
        return () => clearInterval(timer.current);
    }, []);

    const init = () => {
        let count = 0;
        timer2.current = setInterval(() => {
            createBag(count);
            count++;
        }, 500);
    };

    const createBag = (i: number) => {
        setBags((prev) => [
            ...(prev.length > 8 ? prev.slice(1) : prev),
            {
                key: i,
                left: `${Math.floor(Math.random() * 90)}%`,
                show: true,
                type: Math.random() >= 0.5 ? "fomo" : "fud",
                size: sizes[i % 3],
            },
        ]);
    };

    const handleBagClick = (key: any, e: any) => {
        console.log("key:", key);
        if (bags[key].type === "fomo") {
            setFomoCount((prev) => prev + 1);
        } else {
            setFudCount((prev) => prev + 1);
        }
        setBags((bags) => {
            bags[key].show = false;
            return bags;
        });
        update && update(e);
    };

    useEffect(() => {
        init();
        return () => clearInterval(timer2.current);
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
                        {fomoCount}
                    </span>
                </div>
                <div className="w-[130px] h-[20px] absolute right-[50px] bottom-0">
                    <Image src={EmotionFudIcon} alt="fud" fill />
                    <span className="absolute right-2 top-0 text-[20px] leading-[20px] text-[#000]">
                        {fudCount}
                    </span>
                </div>
            </div>
            <div className="w-full flex-1 relative overflow-hidden">
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
                                <Image
                                    src={
                                        bag.type === "fomo" ? FomoIcon : FudIcon
                                    }
                                    alt="bag"
                                    width={bag.size}
                                    height={bag.size}
                                />
                            </div>
                        ) : null}
                    </AnimateSpring>
                ))}
            </div>
        </div>
    );
}
