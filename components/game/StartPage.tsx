"use client";

import Image from "next/image";
import {
    StartArrowIcon,
    StartCircleIcon,
    StartHeadIcon,
    StartLogoIcon,
    StartMouseIcon,
    StartStarsBg,
    StartTextIcon,
} from "@/images";
import { useSpring, animated } from "react-spring";
import { useRef } from "react";
interface StartProps {
    updateStep: () => void;
}
export default function StartPage({ updateStep }: StartProps) {
    const ref = useRef();
    const mouseProps: any = useSpring({
        from: { bottom: "0%", right: "0%" },
        to: [
            { bottom: "10%", right: "10%" },
            { bottom: "0%", right: "0%" },
        ],
        loop: true,
        config: { duration: 1000 },
        onRest: () => {},
    });
    const textProps: any = useSpring({
        from: { scale: 1 },
        to: [{ scale: 1.1 }, { scale: 1 }],
        loop: true,
        config: { duration: 1000 },
        onRest: () => {},
    });

    return (
        <div className="w-full h-full bg-gradient-to-b relative from-[#B9A8E6] to-[#BD73E8] flex justify-center items-center">
            <Image
                src={StartLogoIcon}
                alt="logo"
                width={36}
                height={32}
                className="absolute top-6 left-6"
            />
            <Image
                src={StartArrowIcon}
                alt="arrow"
                width={30}
                height={30}
                className="absolute top-6 right-6"
            />
            <div className="w-full absolute bottom-0 left-0 box-border p-4">
                <Image src={StartStarsBg} alt="arrow" className="w-full" />
            </div>
            <div className="w-[200px] h-[200px] relative" onClick={updateStep}>
                <Image src={StartCircleIcon} alt="circle" fill />
                <animated.div
                    className="absolute w-[140px] left-0 right-0 top-0 bottom-0 mx-auto my-auto"
                    style={{
                        ...textProps,
                    }}
                >
                    <Image src={StartTextIcon} alt="text" fill />
                </animated.div>
                <animated.div
                    style={{
                        width: "42px",
                        height: "42px",
                        position: "absolute",
                        ...mouseProps,
                    }}
                >
                    <Image src={StartMouseIcon} alt="text" fill />
                </animated.div>

                <div className="w-full h-full relative circle-element">
                    <div className="rotating-element">
                        <Image src={StartHeadIcon} alt="head" fill />
                    </div>
                </div>
            </div>
        </div>
    );
}
