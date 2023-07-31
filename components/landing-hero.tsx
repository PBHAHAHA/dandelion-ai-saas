"use client"
import { useAuth } from "@clerk/nextjs"
import Link from "next/link";
import Typewriter from 'react-ts-typewriter';
import { Button } from "./ui/button";

export const LandingHero = () => {
    const { isSignedIn } = useAuth()

    return (

        <div className="text-white font-bold py-36 text-center space-y-5">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
                <h1>最好的AI工具</h1>
                <div className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    <Typewriter loop speed={300} text={["AI对话","图片生成","音乐生成","视频生成","代码生成"]} />
                </div>
                <div className="text-sm md:text-xl font-light text-zinc-500">
                    使用AI快速创建内容
                </div>
                <div>
                    <Link href={isSignedIn ? '/dashboard' : "/sign-up"}>
                        <Button variant="secondary" className="md:text-lg p-4 md:p-6 rounded-full font-semibold">
                            开始免费使用
                        </Button>
                    </Link>
                </div>
                <div className="text-zinc-500 text-lg md:text-lg font-normal">
                    限时免费
                </div>
            </div>
        </div>
    )
}