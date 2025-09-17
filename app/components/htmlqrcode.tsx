
import {Scanner, type IDetectedBarcode} from '@yudiel/react-qr-scanner'
import {type FC } from 'react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { QrCode } from 'lucide-react';

const qrcodeRegionId ="html5qr-code-full-region";

type HtmlQRCodeProps = {
    onQRCodeSuccess: (result:IDetectedBarcode[])=>void,
    onQRCodeError: (error: unknown)=>void,
}
const HtmlQRCode:FC<HtmlQRCodeProps> = ({onQRCodeSuccess, onQRCodeError})=>{
   
    
    return(
        <Dialog >
            <DialogTrigger asChild>
                <Button variant={'outline'}>
                    <QrCode className='w-5 h-5'/>
                    Scan QR Code
                </Button>
            </DialogTrigger>
            <DialogContent>
            <DialogHeader >
                <DialogTitle>QR Code scanner</DialogTitle>
                <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
            </DialogHeader>
            <Scanner onScan={onQRCodeSuccess} onError={onQRCodeError} />
            <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
          </DialogContent>
        </Dialog>
    )
}

export default HtmlQRCode;