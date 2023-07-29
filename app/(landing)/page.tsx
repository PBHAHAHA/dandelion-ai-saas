import { Button } from "@/components/ui/button"
import Link from "next/link"

const LandingPage = () => {
    return (
        <div>
            <div>
                <Link href="/sign-in">
                    <Button variant="destructive">登陆</Button>
                </Link>
                <Link href="/sign-up">
                    <Button variant="destructive">注册</Button>
                </Link>
            </div>
        </div>
    )
}

export default LandingPage