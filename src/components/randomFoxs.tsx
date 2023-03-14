import { RefObject, useEffect, useRef, useState } from "react"

type ImageProps = {
    father:RefObject<HTMLDivElement>,
    url:string
}

export const RandomFox = ({father,url}:ImageProps): JSX.Element => {
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

    return <img ref={node} src={src} className="rounded w-full h-full object-cover" />
}