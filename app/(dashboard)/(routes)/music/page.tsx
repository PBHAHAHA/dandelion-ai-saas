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

const MusicPage = () => {
    const router = useRouter()
    const [music,setMusic] = useState<string>("https://replicate.delivery/pbxt/bhneHXEt9yTMHqkEeC4E2qjLKTXSVDabdGhlq9QD47DUqKVRA/out.mp4")
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
            setMusic("")
            const res = await axios.post("/api/music", values)
            console.log("响应参数",res)
            setMusic(res.data.audio)
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
            <Heading title="音乐生成" desc="宫—商—角—徵—羽（功能较简单，只支持英文，待开发，后续会支持中文模式）" icon={MessageSquare} iconColor="text-violet-500" bgColor="bg-violet-500/10"/>
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
                                                placeholder="Piano solo?"
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
                    {!music && !isLoading && (
                        <Empty label='还没有开始对话哦～' />
                    )} 
                    <div className='w-full mt-4'>
                        {
                            music && (
                                <audio controls className='w-full mt-8'>
                                    <source src={music}/>
                                </audio>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MusicPage