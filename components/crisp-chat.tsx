'use client'

import { useEffect } from "react"
import {Crisp} from "crisp-sdk-web"

export const CrispChat = () => {
    useEffect(() => {   
        Crisp.configure("a0f5fcd2-9ef1-48f8-9e1e-4198eb214289")
    },[])
    return null
}