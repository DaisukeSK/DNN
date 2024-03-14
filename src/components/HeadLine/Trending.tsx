import { NewsArticle } from "../../App";
import altImg from '../../../public/dnn.png'

function Trending(props:{number:number, news:NewsArticle}){

    let newStr=''
    props.news.title.split(' ').map((str:string,key:number)=>{
    newStr+= key<20? `${str} `:key==20?`${str}...`:''
    })
    return (

        <article>

            <div className='rank' id={`id${props.number}`}>{props.number}</div>

            <a className='imgA' href={props.news.url} target='_blank'>
                <div className="whiteBG"></div>
                <img src={props.news.image} onError={(e)=>{$(e.target).attr('src',altImg)}}/>
            </a>

            <a className='titleA' href={props.news.url} target='_blank'>
                <div>{newStr}</div>
            </a>

        </article>
    )
}

export default Trending;