import Image from 'next/image'
import Markupcard from './components/Markupcard'
import Markupiframe from './components/Markupiframe'

export default function Home() {
  

  return (
    <>
      
      <Markupcard />
      <Markupiframe src =  "https://assuredpsychology.com" title = " Assured Psychology" />

    
    </>
  )
}
