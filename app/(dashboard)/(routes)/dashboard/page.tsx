// import MobileSidebar from "@/components/mobile-sidebar"
// import { Button } from "@/components/ui/button"
// import { UserButton } from "@clerk/nextjs"
"use client"
import { Card } from "@/components/ui/card"
import { ArrowRight, Code, Image, MessageSquare, Music, Video } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
// import Link from "next/link"
const tools = [
    {
        label: "AI对话",
        icon: MessageSquare,
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
        href: "/chat"
    },
    {
        label: "图片生成",
        icon: Image,
        color: "text-pink-500",
        bgColor: "bg-pink-500/10",
        href: "/image"
    },
    {
        label: "视频生成",
        icon: Video,
        color: "text-orange-500",
        bgColor: "bg-orange-500/10",
        href: "/video"
    },
    {
        label: "音乐生成",
        icon: Music,
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10",
        href: "/music"
    },
    {
        label: "代码生成",
        icon: Code,
        color: "text-green-500",
        bgColor: "bg-green-500/10",
        href: "/code"
    }
]
const DashboardPage = () => {
  const router = useRouter()
  return (
    <div>
        <div className="mb-8 space-y-4">
            <h2 className="text-2xl md:text-4xl font-bold text-center">探索人工智能的力量</h2>
            <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
                聊天宽度最聪明的AI -体验AI的力量
            </p>
            <div className="px-4 md:px-20 lg:px:32 space-y-4">
                {
                    tools.map((tool) => (
                        <Card onClick={() => router.push(tool.href)} key={tool.href} className="p-4 border-black/5 flex items-center justify-between 
                            hover:shadow-md transition cursor-pointer
                        ">
                            <div className="flex items-center gap-x-4">
                                <div className={cn("p-2 w-fit rounded-sm",tool.bgColor)}>
                                    <tool.icon className={cn("w-8 h-8",tool.color)} />
                                </div>
                                <div className="font-semibold">
                                    {tool.label}
                                </div>
                            </div>
                            <ArrowRight className="w-5 h-5"/>
                        </Card>
                    ))
                }
            </div>
        </div>
    </div>
  )
}
export default DashboardPage