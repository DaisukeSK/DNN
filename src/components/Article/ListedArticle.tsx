import { useState } from 'react'
import altImg from '../../../public/altImg.png';
import clockImg from '../../../public/clock.svg';
import { NewsArticle } from '../../App';

type Props={
  article: NewsArticle
};

function ListedArticle({article}:Props) {
  
  const [bg, setBg] = useState<string>('#FFFFFF');

  return (
    <article
    className='listedArticle'
      style={{backgroundColor: bg}}
      onMouseEnter={()=>setBg('#D4EBF2')}
      onMouseLeave={()=>setBg('#FFFFFF')}
    >

      <a href={article.url} target='_blank'>

        <div className='date'>
          <img src={clockImg}/>
          <div>{article.publishedAt.split("T")[0]}&nbsp;|&nbsp;{article.source.name}</div>
        </div>

        <h2>{article.title}</h2>
        <div className='a_flex'>
          <div className='pContainer'>
            <p>{article.content.split(/...\s\[\d{1,4}\schars]/)[0]+'...'}</p>
            <div className='readMore' style={{background: `linear-gradient(transparent,${bg})`}}>
              <span>Read more [External website]</span>
            </div>
          </div>
          <img
            src={article.image}
            onError={(e)=>{$(e.target).attr('src',altImg)}}
          />
        </div>

      </a>
    
    </article>
  )
};

export default ListedArticle;