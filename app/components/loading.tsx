import { Loader2 } from "lucide-react"

const Loading = () => {
    return (
        <div className="flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-primary opacity-80" />
        </div>
    )
}

export default Loading;