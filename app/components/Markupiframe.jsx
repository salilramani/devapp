import React from 'react'


const Markupiframe = ({src,title}) => {
    
  return (
    <iframe 
    src = {src}
    title= {title}
    width = "100%"
    height = "1500px"
    style = {{border:'none'}}
    >

    </iframe>
  )
}

export default Markupiframe