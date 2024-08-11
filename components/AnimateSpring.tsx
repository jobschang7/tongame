"use client";
import { useEffect, useState, ReactNode } from "react";
import { useSpring, animated } from "react-spring";

interface AnimateSpringProps {
    children: ReactNode;
    left: string;
    show: boolean;
}

export default function AnimateSpring({ children, left, show }: AnimateSpringProps) {
    const props: any = useSpring({
        from: { position: "absolute", top: "0%" },
        to: { position: "absolute", top: "100%" },
        config: {
            duration: 3000,
        },
    });

    return (
        <animated.div
            style={{ ...props, left, display: show ? "block" : "none" }}
        >
            {children}
        </animated.div>
    );
}
