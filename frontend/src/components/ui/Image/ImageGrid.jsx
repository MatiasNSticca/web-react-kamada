import React from "react"
import { Link } from "react-router-dom"
import style from "./ImageGrid.module.css"


function ImageGrid({ imgSrc, title}) {
  return (
    <>
        <img 
        src={imgSrc} 
        alt={title} 
        className={style["grid__img"]}/>
    </>
  )
}

export default ImageGrid