import { File } from "lucide-react"
import type { FC } from "react";

type ShowFileProps = {
    file: string;
    name: string
}
const ShowFile: FC<ShowFileProps> = ({ file, name }) => {
    if (!file) return (
        <div className="flex items-center gap-2 text-slate-400 italic">
            <span>{name}:</span>
            <span>No file</span>
        </div>
    );

    let finalUrl = "";
    const isFullUrl = file.startsWith("http");

    if (isFullUrl) {
        // Extract URL using regex if it's bundled in some text, or just use it
        const urlRegex = /https?:\/\/[^\s"]+/g;
        const matches = file.match(urlRegex);
        finalUrl = matches ? matches[0] : file;
    } else if (file.includes("uploads")) {
        // Construct URL from relative path
        const baseUrl = import.meta.env.VITE_ENDPOINT?.replace("/api", "") || "http://localhost:3001";
        // Ensure path uses forward slashes and doesn't have double slashes
        const normalizedPath = file.replace(/\\/g, "/");
        finalUrl = `${baseUrl}/${normalizedPath}`;
    } else {
        // Fallback for strings that aren't URLs but might be intended as such
        finalUrl = file;
    }

    return (
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100/50 transition-all hover:bg-white hover:shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{name}:</span>
            <div className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-bold transition-colors">
                <File className="w-4 h-4" />
                <a href={finalUrl} target="_blank" rel="noopener noreferrer" className="text-sm">View Document</a>
            </div>
        </div>
    )

}

export default ShowFile;