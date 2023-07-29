import { useUser } from "@clerk/nextjs"
import { Avatar } from "@radix-ui/react-avatar"
import { AvatarFallback, AvatarImage } from "./ui/avatar"

const UserAvatar = () => {
    const {user} = useUser()
    return (
        <Avatar className="h-8 w-8">
            <AvatarImage src={user?.imageUrl} className=" rounded-full"/>
            <AvatarFallback>
                {user?.firstName?.charAt(0)}
                {user?.lastName?.charAt(0)}
            </AvatarFallback>
        </Avatar>
    )
}

export default UserAvatar