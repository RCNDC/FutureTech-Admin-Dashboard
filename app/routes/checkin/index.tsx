import Fallback from "@/components/fallback";
import HtmlQRCode from "@/components/htmlqrcode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toastSuccess } from "@/lib/toast";
import { QrCode } from "lucide-react";


export function loader(){

}

export function HydrateFallback(){
    return <Fallback/>
}

const Index = ()=>{
    const onQrcodeSuccess = (result:string)=>{
        toastSuccess('code founded '+result);
    }
    const onQrcodeError = (error:unknown)=>{
        console.log(error)
    }
    return(
        <div>
            <div className="space-y-3">
                <h3 className="font-semibold text-2xl">Event checkin</h3>
                <div className="flex items-center gap-2 ">
                    <Input placeholder="Search by email, order no..."/>
                    <Button>
                        <QrCode className="w-5 h-5"/>
                        Scan QR Code
                    </Button>
                </div>
            </div>
        

        </div>
    )
}

export default Index;