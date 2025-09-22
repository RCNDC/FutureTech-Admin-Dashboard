import { MoreVertical } from "lucide-react"
import Loading from "./loading"
import { Badge } from "./ui/badge"
import useFollowUpStore from "store/store"
import type { FC } from "react"

type MarkAsCompletedProps = {
    entryId:number
}
const MarkAsCompleted:FC<MarkAsCompletedProps> = ({entryId})=>{
    const {followUp} = useFollowUpStore();
    console.log(entryId)
     return(
        <>
        {
            followUp["entryId"]?.status==="Completed" && followUp["entryId"]?.entry_id==entryId   && <Badge variant="outline" className="bg-green-500 text-white">C</Badge>
        }
                                    
        </>
                                    
    )

}

export default MarkAsCompleted;