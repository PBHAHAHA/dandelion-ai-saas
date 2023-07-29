import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration,OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    basePath: "https://service-daw0qssw-1257738510.usw.apigw.tencentcs.com/v1"
})

const openai = new OpenAIApi(configuration)
const instructionMessage = {
    role: 'system',
    content: "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations. You must use chinese to answer"
}
export async function POST(req:Request) {
    try {
        const {userId} = auth()
        const body = await req.json()
        const {messages} = body
        console.log("用户：" ,userId,body)
        if(!userId){
            return new NextResponse("未登陆", {status: 401})
        }
        if(!configuration.apiKey) {
            return new NextResponse("OPENAI API key 不允许",{status: 500})
        }
        if(!messages) {
            return new NextResponse("对话消息未填入",{status: 400})
        }
        const res = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [instructionMessage, ...messages],
            // stream: true
        },{
            // responseType: "stream"
        })
        return NextResponse.json(res.data.choices[0].message)
    } catch (error:any) {
        return new NextResponse("CODE_ERROR"+error,{status: 500})
    }
}