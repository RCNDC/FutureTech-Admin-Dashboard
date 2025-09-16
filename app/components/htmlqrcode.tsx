import {Html5QrcodeScanner, type Html5QrcodeScanType} from 'html5-qrcode';

import { useEffect, type FC } from 'react';

const qrcodeRegionId ="html5qr-code-full-region";

type scannerConfig = {
    fps:number;
    qrCodeBox: number;
    disableFlip: boolean;
    supportedScanTypes: Html5QrcodeScanType[]

}

const createConfig = (options:scannerConfig)=>{
    return options;
}

type HtmlQRCodeProps = {
    onQRCodeSuccess: (result:string)=>void,
    onQRCodeError: (error: unknown)=>void,
}
const HtmlQRCode:FC<HtmlQRCodeProps> = ({onQRCodeSuccess, onQRCodeError})=>{
    useEffect(()=>{
        const config = createConfig({fps:10, qrCodeBox: 50, disableFlip: true, supportedScanTypes:[0]});
        
        const html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, {...config}, true);
        html5QrcodeScanner.render(onQRCodeSuccess,onQRCodeError);
        return ()=>{
            html5QrcodeScanner.clear().catch((error)=>{
                console.log(`failed to clear html5QRcodeScanner. ${error}`);
            });
        }
    },[]);
    return(
        <div id={qrcodeRegionId} >

        </div>
    )
}

export default HtmlQRCode;