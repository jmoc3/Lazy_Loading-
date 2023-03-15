import { RefObject, useEffect, useRef, useState } from "react"
import type { ImgHTMLAttributes } from "react"

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement>{
    url:string
}

export const RandomFox = ({url, ...imgProps}:ImageProps): JSX.Element => {
    const node = useRef<HTMLImageElement>(null)
    const [src, setSrc] = useState<string>("https://thumbs.gfycat.com/EthicalHighlevelArthropods-max-1mb.gif"
    )
    
    useEffect(()=>{
        const observer = new IntersectionObserver(entries=>{
            entries.forEach(entry=>{
                if(entry.isIntersecting){
                    setSrc(url)
                    console.log('visible')
                }
            })
        })

        observer.observe(node.current!)

        return ()=>{
            observer.disconnect()
        }
    },[])

    return <img ref={node} src={src} {...imgProps} />
}