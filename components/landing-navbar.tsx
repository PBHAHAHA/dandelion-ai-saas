"use client"
import Image from "next/image"
import {useAuth} from "@clerk/nextjs"
import {cn} from "@/lib/utils"
import Link from "next/link"
import { Button } from "./ui/button"
const LandingNavbar = () => {
    const {isSignedIn} = useAuth()
    return (
    <div className="p-4 bg-transparent flex items-center justify-between">
        <Link href="/" className="flex items-center">
            <div className="relative h-8 w-8 mr-4">
                <Image fill alt="Logo" src="/logo.png"/>
            </div>
            <h1 className={cn("text-2xl font-bold text-white")}>蒲公英AI平台</h1>
        </Link>
        <div className="flex items-center gap-x-2">
            <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
                <Button variant="outline" className="rounded-full">开始使用</Button>
            </Link>
        </div>
    </div>
  )
}
export default LandingNavbar