import { NewsArticle } from '../../App'

function MoreToExpolore(props:{news:NewsArticle}) {
  
  return (
    <article>

      <a className='imgA' href={props.news.url} target='_blank'>
        <div className="whiteBG"></div>
        <img src={props.news.image}/>
      </a>
      
      <a className='titleA' href={props.news.url} target='_blank'>
        <h4>{props.news.title}</h4>
      </a>

    </article>
  )
};

export default MoreToExpolore;