"use client";

import Image from "next/image";
import {
    BtcIcon,
    EthIcon,
    BnbIcon,
    SelectDownIcon,
    SelectSloganIcon,
} from "@/images";
import { useSpring, animated } from "react-spring";
import { useRef, useState } from "react";

interface SelectProps {
    updateStep: () => void;
}
export default function SelectPage({ updateStep }: SelectProps) {
    const [isShow, setIsShow] = useState(false);
    const [activeCoin, setActiveCoin] = useState({
        label: "BTC",
        icon: BtcIcon,
    });
    const [coinList, setCoinList] = useState([
        {
            label: "BTC",
            icon: BtcIcon,
        },
        {
            label: "ETH",
            icon: EthIcon,
        },
        {
            label: "BNB",
            icon: BnbIcon,
        },
        // {
        //     label: "BTC2",
        //     icon: BtcIcon,
        // },
        // {
        //     label: "BTC3",
        //     icon: BtcIcon,
        // },
        // {
        //     label: "BTC4",
        //     icon: BtcIcon,
        // },
        // {
        //     label: "BTC5",
        //     icon: BtcIcon,
        // },
        // {
        //     label: "BTC6",
        //     icon: BtcIcon,
        // },
    ]);
    const downProps: any = useSpring({
        transform: isShow ? "rotate(-180deg)" : "rotate(0deg)",
        config: { duration: 300 },
    });

    const handleSelectCoin = (coin: any) => {
        setIsShow(false);
        setActiveCoin(coin);
    };

    return (
        <div className="w-full h-full bg-gradient-to-b relative from-[#EFEEF2] to-[#9647FF] flex justify-center items-center">
            <Image
                src={SelectSloganIcon}
                width={298}
                height={156}
                alt="slogan"
                className="absolute right-0 top-1/2 -mt-[250px]"
                onClick={updateStep}
            />
            <div className="w-[300px] h-[65px] -mt-[150px] relative">
                <button
                    className="w-full h-full bg-[#B2A0E5] border border-[#231F20] rounded-full flex items-center justify-start box-border px-[20px]"
                    onClick={() => {
                        setIsShow((prev) => !prev);
                    }}
                >
                    <Image
                        src={activeCoin.icon}
                        width={35}
                        height={35}
                        alt="btc"
                    />
                    <span className="ml-[10px] text-[18px] text-[#231F20]">
                        {activeCoin.label}
                    </span>
                    <animated.span
                        className="absolute w-[28px] h-[28px] right-[20px] top-[20px]"
                        style={{
                            ...downProps,
                        }}
                    >
                        <Image
                            src={SelectDownIcon}
                            width={28}
                            height={28}
                            alt="btc"
                        />
                    </animated.span>
                </button>
                {isShow ? (
                    <div className="absolute top-[65px] left-0 w-full max-h-[240px] border border-[#231F20] rounded-[32px] bg-[#F3F3F333] overflow-y-auto">
                        {coinList.map((coin) => (
                            <div
                                key={coin.label}
                                className="w-full h-[60px] flex items-center box-border px-[20px]"
                                onClick={() => handleSelectCoin(coin)}
                            >
                                <Image
                                    src={coin.icon}
                                    width={35}
                                    height={35}
                                    alt="btc"
                                />
                                <span className="ml-[10px] text-[18px] text-[#231F20]">
                                    {coin.label}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>
        </div>
    );
}
