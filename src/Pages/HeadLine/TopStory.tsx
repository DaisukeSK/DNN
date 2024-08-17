import { useContext, useState } from "react"
import { context } from "../../App"
import arrowDown from '../../../public/arrowDown.svg'
import arrowUp from '../../../public/arrowUp.svg'
import altImg from '../../../public/dnn.png'
import clock from '../../../public/clock.svg'
// import MoreToSee from "./MoreToSee"

function TopStory() {

    const { news, showDate, titleCount } = useContext(context)

    const [showMore, setShowMore] =useState<boolean>(false)

    return (
        <section className="topStories">

            <h1>Top Stories</h1>
            {/* <hr/> */}
            <div className="flex">
                {news.map((article:any, key:number)=>{
                    return key==0 && (
                    <article className="left" key={key}>
                        <a href={article.url} target="_black" className='imgA'>
                            <img src={article.image?article.image:altImg}/>
                        </a>
                        <a href={article.url} target="_black">
                            <h2>{titleCount(article.title,85)}</h2>
                        </a>
                        <div className="publishedDate">
                            <img src={clock}/>
                            {showDate(article.publishedAt)}
                        </div>
                    </article>
                )})}
                
                <div className="right">

                    {news.map((article:any, key:number)=>{
                        return (key==0 || key==1 || key==10 || key==20) && (
                            <>
                        <article className={key==0 ? 'hidden':undefined} key={key}>
                            <a href={article.url} target="_black" className='imgA'>
                                <img src={article.image?article.image:altImg}/>
                            </a>
                            <div>

                                <a href={article.url} target="_black">
                                    <h3>{titleCount(article.title,80)}</h3>
                                </a>
                                <div>{article.description && titleCount(article.description,90)}</div>
                                <div className="publishedDate">
                                    <img src={clock}/>
                                    {showDate(article.publishedAt)}
                                </div>
                            </div>
                        </article>
                        {key!==20 && <hr className={key==0 ? 'hidden':undefined}/>}
                        
                            
                            </>
                    )})}
                </div>
            </div>
            <div className="more">
                <div className='button' onClick={()=>setShowMore(!showMore)}>
                    <img src={showMore?arrowUp:arrowDown}/>
                    <span>More Top Stories</span>
                    <img src={showMore?arrowUp:arrowDown}/>
                </div>
                {showMore &&

                    // <MoreToSee topStories={true}></MoreToSee>
                    <div className="moreToSee">

                        {/* <div className="flex"> */}
                        {news.map((article:any, key:number)=>{
                            return (key==2 || key==3 || key==11 || key==12 || key==13 || key==21 || key==22 || key==23) && (
                            <article key={key}>
                                <a href={article.url} target="_black">
                                    <h3>{titleCount(article.title, 70)}</h3>
                                </a>
                                <div className="publishedDate">
                                    <img src={clock}/>
                                    {showDate(article.publishedAt)}
                                </div>
                            </article>
                        )})}
                            
                        {/* </div> */}
                        
                    </div>
                }
            </div>
        </section>
    )
}

export default TopStory