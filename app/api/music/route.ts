import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN!
})

export async function POST(req:Request) {
    try {
        const {userId} = auth()
        const body = await req.json()
        const {prompt} = body
        console.log("用户：" ,userId,body)
        if(!userId){
            return new NextResponse("未登陆", {status: 401})
        }
        if(!prompt) {
            return new NextResponse("对话消息未填入",{status: 400})
        }
        const res = await replicate.run(
            "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
            {
                input: {
                    prompt_a: "funky synth solo"
                }
            }
        )
        return NextResponse.json(res)
    } catch (error:any) {
        return new NextResponse(error,{status: 500})
    }
}