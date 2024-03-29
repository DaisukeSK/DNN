import { useContext } from "react";
import { NewsCotext, NewsArticleType } from '../../App'
import clockImg from '../../../public/clock.svg'
import altImg from '../../../public/dnn.png'

function PickUp(Props:{news:NewsArticleType, category:string}) {

    const { runAxios } = useContext(NewsCotext)

    const getdate=(str:string) =>{
        const date= new Date(str)
        return `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}, ${date.getFullYear()}`
    }

    let newStr=''

    Props.news.title.split(' ').map((str:string,key:number)=>{
        newStr+= key<20? `${str} `:key==20?`${str}...`:''
    })

    return (

        <div className={`pickUp${Props.category}`}>

            <div className='titleFlex'>
                <svg width='10' height='10'>
                <path d='m0,10 v-10 h10'/>
                </svg>

                <h4>{`Pick Up from ${Props.category}`}</h4>

                <div className='seeMore' onClick={()=>runAxios(0, Props.category.toLowerCase(), 'en', '', '', '', false)}>
                <svg width='7' height='6'>
                    <path d='m0,0 l7,3 l-7,3Z'/>
                </svg>
                <span>See more</span>
                </div>
            </div>

            <a className='imgA' href={Props.news.url} target='_blank'>
                <div className='whiteBG'></div>
                <img src={Props.news.image} onError={(e)=>{
                const Target=e.target as HTMLImageElement
                Target.src=altImg
                }}/>
            </a>

            <div className='date'>
                <img src={clockImg}/>
                <div>{getdate(Props.news.publishedAt)}</div>
            </div>

            <a className='titleA' href={Props.news.url} target='_blank'>
                <h2>{newStr}</h2>
            </a>
            
        </div>
    )
};

export default PickUp;