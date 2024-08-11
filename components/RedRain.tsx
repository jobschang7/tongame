"use client";
import { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import AnimateSpring from "./AnimateSpring";

interface RedRainProps {}

export default function RedRain({}: RedRainProps) {
    const bagsNum = 20;
    const [gameover, setGameover] = useState(false);
    const [bags, setBags] = useState<any[]>([]);

    const props: any = useSpring({
        from: { position: "absolute", top: '0%' },
        to: { position: "absolute", top: '100%' },
        config: {
            duration: 5000
        }
    });

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
        }, 500);
    };

    const createBag = (i: number) => {
        bags.push({
            key: i,
            left: `${Math.floor(Math.random() * 90)}vw`,
            show: true,
        });
        setBags(bags);
    };

    useEffect(() => {
        init();
    }, []);

    return (
        <div className="w-full h-80 relative overflow-hidden">
            {/* <div className="bag"></div> */}
            <animated.div style={props}>
                <div className="bag"></div>
            </animated.div>

            {bags.map((bag: any) => (
                <AnimateSpring key={bag.key} left={bag.left} show={bag.show}>
                    <div className="bag"></div>
                </AnimateSpring>

                // <div className="bag" key={bag.key} style={{ left: bag.left, display: bag.show ? 'block' : 'none' }}></div>
            ))}
        </div>
    );
}
