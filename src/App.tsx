import './App.css'
import { useState, useRef } from 'react'
import type {MouseEventHandler} from 'react'
import { v4 as uuidv4 } from 'uuid';
import { RandomFox } from './components/randomFoxs'

type Image = {
  id:string,
  url:string
}

function App(): JSX.Element{

  const randomNumber = ():number => { 
    const number:number = Math.floor(Math.random() * 123) + 1
    return number
  }

  const [foxNumber, setFoxNumber] = useState(randomNumber())
  const [foxImages, setFoxImage] = useState<Image[]>([])

  const newImage: MouseEventHandler<HTMLButtonElement>= ():void=>{
    setFoxNumber(randomNumber())
    const image:Image = {
      id: uuidv4(),
      url: `https://randomfox.ca/images/${foxNumber}.jpg`
    }
    const foxArray:Image[] = [...foxImages,image]
    setFoxImage(foxArray)
  }

  const fatherDiv = useRef<HTMLDivElement>(null)

  return (
    <div className="App h-screen flex justify-center items-center">
      <main className='principal grid gap-5 justify-items-center w-4/5'>
          <h1 className='text-5xl font-bold cursor-pointer'>Render Fox Images</h1>
          <button onClick={newImage} className='text-blue-900 bg-blue-300 w-fit font-bold p-2.5 rounded border-none hover:bg-orange-300 hover:text-orange-900 hover:transition-all'>Display</button>
          <div ref={fatherDiv} className="imagesContainer grid grid-cols-4 w-full overflow-y-auto">
            { 
            foxImages.map((foxImage,index)=>(
              <div className="imageContainer w-full h-52 overflow-hidden " key={foxImage.id}>
                  <RandomFox father={fatherDiv} url={foxImage.url} />
                </div>
              ))}
          </div>
      </main>
    </div>
  )
}

export default App
