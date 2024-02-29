import { useContext } from "react";
import { NewsCotext, NewsArticle } from '../../App'
import clockImg from '../../../public/clock.svg'


function PickUp(Props:{news:NewsArticle, category:string}) {

  const { setHeadLine, runAxios } = useContext(NewsCotext)

  const SeeMore=(category:string)=>{
    setHeadLine(false)
    runAxios(0, category, 'en', '', '', '', false);
  }

  const getdate=(str:string)=>{
    const date= new Date(str)
    return `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}, ${date.getFullYear()}`
  }

  return (

    <div className={`pickUp${Props.category}`}>

      <div className='titleFlex'>
        <svg width='10' height='10'>
          <path d='m0,10 v-10 h10'/>
        </svg>

        <h4>{`Pick Up from ${Props.category}`}</h4>

        <div className='seeMore' onClick={()=>SeeMore(Props.category.toLowerCase())}>
          <svg width='7' height='6'>
            <path d='m0,0 l7,3 l-7,3Z'/>
          </svg>
          <span>See more</span>
        </div>
      </div>

      <a className='imgA' href={Props.news.url} target='_blank'>
        <div className='whiteBG'></div>
        <img src={Props.news.image}/>
      </a>

      <div className='date'>
        <img src={clockImg}/>
        <div>{getdate(Props.news.publishedAt)}</div>
      </div>

      <a className='titleA' href={Props.news.url} target='_blank'>
        <h2>{Props.news.title}</h2>
      </a>
          
    </div>
  )
};

export default PickUp;