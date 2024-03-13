import altImg from '../../../public/dnn.png';
import clockImg from '../../../public/clock.svg';
import { NewsArticle } from '../../App';

function ThumbnailedArticle({article}:{article: NewsArticle}) {

  return (
    <article
      className='thumbnailedArticle'
    >
      <a href={article.url} target='_blank'>

        <div className='whiteBack'></div>
        
        <div className='date'>
          <img src={clockImg}/>
          <div>{article.publishedAt.split("T")[0]}&nbsp;|&nbsp;{article.source.name}</div>
        </div>

        <h2>{article.title}</h2>
        
        <img
          src={article.image}
          onError={(e)=>{$(e.target).attr('src',altImg)}}
        />
        
      </a>
    </article>
  )
};

export default ThumbnailedArticle;