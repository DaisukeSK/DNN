import { NewsArticle } from '../../App'

function MoreToExpolore(props:{news:NewsArticle}) {
  let newStr=''
  props.news.title.split(' ').map((str:string,key:number)=>{
  newStr+= key<20? `${str} `:key==20?`${str}...`:''
  })

  
  return (
    <article>

      <a className='imgA' href={props.news.url} target='_blank'>
        <div className="whiteBG"></div>
        <img src={props.news.image}/>
      </a>
      
      <a className='titleA' href={props.news.url} target='_blank'>
        <h4>{newStr}</h4>
      </a>

    </article>
  )
};

export default MoreToExpolore;