import Image from "next/image"

interface EmptyProps {
    label: string
}
const Empty = ({label}: EmptyProps) => {
  return (
    <div className="h-full p-20 flex flex-col items-center justify-center">
        <div className="relative h-80 w-80">
            <Image alt="Empty" fill src="/empty.png"/>
        </div>
        <p className=" text-black/50 -mt-4">{label}</p>
    </div>
  )
}
export default Empty