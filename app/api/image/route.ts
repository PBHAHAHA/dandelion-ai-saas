import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration,OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    basePath: "https://service-daw0qssw-1257738510.usw.apigw.tencentcs.com/v1"
})

const openai = new OpenAIApi(configuration)

export async function POST(req:Request) {
    try {
        const {userId} = auth()
        const body = await req.json()
        const {prompt, amount = 1, resolution="512x512"} = body
        console.log("用户：" ,userId,body)
        if(!userId){
            return new NextResponse("未登陆", {status: 401})
        }
        if(!configuration.apiKey) {
            return new NextResponse("OPENAI API key 不允许",{status: 500})
        }
        if(!prompt) {
            return new NextResponse("对话消息未填入",{status: 400})
        }
        if(!amount) {
            return new NextResponse("生成图片数量未选择",{status: 400})
        }
        if(!resolution) {
            return new NextResponse("生成图分辨率量未选择",{status: 400})
        }
        const res = await openai.createImage({
            prompt: prompt,
            n: parseInt(amount, 10),
            size: resolution,
        })
        return NextResponse.json(res.data.data)
    } catch (error:any) {
        return new NextResponse(error,{status: 500})
    }
}