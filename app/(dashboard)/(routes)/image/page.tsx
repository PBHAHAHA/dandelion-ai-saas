"use client"
import axios from 'axios'
import * as z from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import Heading from "@/components/heading"
import { Download, MessageSquare } from "lucide-react"
import {  useForm } from "react-hook-form"
import { amountOptions, formSchema, resolutionOptions } from "./constants"
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
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import { Card, CardFooter } from '@/components/ui/card'
import Image from 'next/image'

const ImagePage = () => {
    const router = useRouter()
    const [images,setImages] = useState<string[]>([])
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
            amount: "1",
            resolution: "512x512"
        }
    })
    const isLoading = form.formState.isSubmitting
    const onSubmit = async (values:z.infer<typeof formSchema>) => {
        console.log(values)
        try {
            setImages([])
            console.log(values)
            // return
            const res = await axios.post("/api/image", values)
            const urls = res.data.map((image:{url: string}) => image.url)
            setImages(urls)
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
            <Heading title="图片生成" desc="世界这么大，不想去看看？" icon={MessageSquare} iconColor="text-violet-500" bgColor="bg-violet-500/10"/>
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
                                    <FormItem className="col-span-12 lg:col-span-6">
                                        <FormControl className="m-0 p-0">
                                            <Input 
                                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                placeholder="一棵树?"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                              control={form.control}
                              name="amount"
                              render={({field}) => (
                                <FormItem className="col-span-12 lg:col-span-2">
                                    <Select 
                                        disabled={isLoading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {amountOptions.map((option) => (
                                                <SelectItem key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="resolution"
                              render={({field}) => (
                                <FormItem className="col-span-12 lg:col-span-2">
                                    <Select 
                                        disabled={isLoading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {resolutionOptions.map((option) => (
                                                <SelectItem key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
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
                    {images.length === 0 && !isLoading && (
                        <Empty label='还没有图片哦～' />
                    )} 
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                    {images.map(src => (
                        <Card
                            key={src}
                            className="rounded-lg overflow-hidden"
                        >
                            <div className='relative aspect-square'>
                                <Image src={src} alt="img" fill/> 
                            </div>
                            <CardFooter className="p-2">
                                <Button onClick={() => window.open(src)} variant={"secondary"} className="w-full">
                                    <Download className='w-4 h-4 mr-2'/>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default ImagePage