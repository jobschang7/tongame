"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import AnimateSpring from "./AnimateSpring";
import { bag } from "@/images";

interface RedRainProps {
    update: (e: any) => void;
}

export default function RedRain({ update }: RedRainProps) {
    const bagsNum = 60;
    const [gameover, setGameover] = useState(false);
    const [bags, setBags] = useState<any[]>([]);

    const init = () => {
        let count = 0;
        let countT = setInterval(() => {
            if (count >= bagsNum) {
                clearInterval(countT);
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
        update(e);
    };

    useEffect(() => {
        init();
    }, []);

    return (
        <div className="w-full h-80 relative overflow-hidden">
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
                                src={'/bag-icon.png'}
                                alt="bag"
                                fill
                            />
                        </div>
                    ) : null}
                </AnimateSpring>
            ))}
        </div>
    );
}
