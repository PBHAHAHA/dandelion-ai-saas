"use client"
import axios from 'axios'
import * as z from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import Heading from "@/components/heading"
import { MessageSquare } from "lucide-react"
import {  useForm } from "react-hook-form"
import { formSchema } from "./constants"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ChatCompletionRequestMessage } from 'openai'
import Loader from '@/components/loader'
import Empty from '@/components/empty'
import { cn } from '@/lib/utils'
import UserAvatar from '@/components/user-avatar'
import BotAvatar from '@/components/bot-avatar'
import ReactMarkdown from 'react-markdown'

const CodePage = () => {
    const router = useRouter()
    const [messages,setMessages] = useState<ChatCompletionRequestMessage[]>([])
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    })
    const isLoading = form.formState.isSubmitting
    const onSubmit = async (values:z.infer<typeof formSchema>) => {
        console.log(values)
        try {
            const userMessage: ChatCompletionRequestMessage = {
                role: "user",
                content: values.prompt
            }
            const newMessages = [...messages, userMessage]
            const res = await axios.post("/api/code", {
                messages: newMessages
            })
            console.log("响应参数",res)
            setMessages((current) => [...current, userMessage, res.data])
            form.reset()
        } catch (error) {
            // TODO: 打开订阅弹窗
            console.log(error)
        } finally {
            router.refresh()
        }
    }
    return (
        <div>
            <Heading title="代码生成" desc="最好的语言是？PHP" icon={MessageSquare} iconColor="text-violet-500" bgColor="bg-violet-500/10"/>
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form 
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-sm border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"

                        >
                            <FormField 
                                name="prompt"
                                render={({field}) => (
                                    <FormItem className="col-span-12 lg:col-span-10">
                                        <FormControl className="m-0 p-0">
                                            <Input 
                                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                placeholder="使用Vue3实现一个计算器"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button className="col-span-12 lg:col-span-2">
                                生成
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {
                        isLoading && (
                            <div className='p-8 rounded-lg w-full flex items-center justify-center bg-muted'>
                                <Loader />
                            </div>
                        )
                    }
                    {messages.length === 0 && !isLoading && (
                        <Empty label='还没有开始提问哦～' />
                    )} 
                    <div className='flex flex-col-reverse mt-4'>
                        {
                            messages.map((message) => (
                                <div key={message.content} className={cn(`
                                    p-4 w-full flex items-start gap-x-4 rounded-lg mb-2
                                `, message.role === 'user' ? 'bg-white border border-black/10' : "bg-muted")}>
                                    <div className=' flex-shrink-0 w-8'>
                                        {message.role === 'user' ? <UserAvatar /> : <BotAvatar />}
                                    </div>
                                    <div className='flex-1 flex flex-col overflow-auto'>
                                        <ReactMarkdown
                                            components={{
                                                pre: ({node, ...props}) => (
                                                    <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                                                        <pre {...props} />
                                                    </div>
                                                ),
                                                code: ({node, ...props}) => (
                                                    <code {...props} className=" rounded-sm p-1" />
                                                )
                                            }}
                                        >
                                            {message.content || ''}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CodePage