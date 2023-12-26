import { useState, useEffect, useRef, useContext } from 'react'
import altImg from '../../public/altImg.png';
import clockImg from '../../public/clock.svg';



function Article(props) {
  
  const [bg, setBg] = useState('#FFFFFF')


  
  return (
    <article
    style={{backgroundColor:bg}}
    onMouseEnter={()=>setBg('#D4EBF2')}
    onMouseLeave={()=>setBg('#FFFFFF')}
    >
        
        <a href={props.article.url} target='_blank'>
          

  <div className='date'>

        <img src={clockImg}/><div>{props.article.publishedAt.split("T")[0]}&nbsp;|&nbsp;{props.article.source.name}</div>
  </div>
        <h2>{props.article.title}</h2>
<div className='a_flex'>
<div className='pContainer'>
{/* <p>{dt.content}</p> */}
{/* <p>{dt.content.split(`... [${/[0-9]{1,4}/} chars]`)[0]}</p> */}
{/* <p>{dt.content.split(/\.\.\.\s\[\d{1,4}\s/)[0]}</p> */}
<p>{props.article.content.split(/...\s\[\d{1,4}\schars]/)[0]+'...'}</p>
{/* <p>{dt.content}</p> */}

  <div className='readMore' style={{background: `linear-gradient(transparent,${bg})`}}><span>Read more [External website]</span></div>
</div>

        <img src={props.article.image} onError=
{(e)=>{$(e.target).attr('src',altImg)}}/>

{/* <img src={altImg}/> */}

</div>

        </a>
      
      </article>
  )
}

export default Article


