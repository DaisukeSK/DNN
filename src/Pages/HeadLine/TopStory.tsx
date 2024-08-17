import { useContext, useState, Fragment } from "react"
import { context, NewsArticleType } from "../../App"
import arrowDown from '../../../public/arrowDown.svg'
import arrowUp from '../../../public/arrowUp.svg'
import altImg from '../../../public/dnn.png'
import PublishedDate from "../PublishedDate"

function TopStory() {

    const { news, titleCount } = useContext(context)
    const [showMore, setShowMore] =useState<boolean>(false)

    return (
        <section className='topStories'>

            <h1>Top Stories</h1>

            <div className='flex'>
                {news.map((article:NewsArticleType, key:number)=>{
                    return key==0 && (
                    <article className='left' key={key}>
                        <a href={article.url} target="_black" className='imgA'>
                            <img src={article.image?article.image:altImg}/>
                        </a>
                        <a href={article.url} target="_black">
                            <h2>{titleCount(article.title,85)}</h2>
                        </a>
                        <PublishedDate date={article.publishedAt}/>
                    </article>
                )})}
                
                <div className="right">
                    {news.map((article:NewsArticleType, key:number)=>{
                        return (key==0 || key==1 || key==10 || key==20) && (
                            <Fragment key={key}>
                                <article className={key==0 ? 'hidden':undefined} key={key}>
                                    <a href={article.url} target="_black" className='imgA'>
                                        <img src={article.image?article.image:altImg}/>
                                    </a>
                                    <div>
                                        <a href={article.url} target="_black">
                                            <h3>{titleCount(article.title,80)}</h3>
                                        </a>
                                        <div>{article.description && titleCount(article.description,90)}</div>
                                        <PublishedDate date={article.publishedAt}/>
                                    </div>
                                </article>
                                {key!==20 && <hr className={key==0 ? 'hidden':undefined}/>}
                            </Fragment>
                    )})}
                </div>
            </div>

            <div className='more'>

                <div className='button' onClick={()=>setShowMore(!showMore)}>
                    <img src={showMore?arrowUp:arrowDown}/>
                    <span>More Top Stories</span>
                    <img src={showMore?arrowUp:arrowDown}/>
                </div>

                {showMore &&
                    <div className='moreToSee'>
                        {news.map((article:NewsArticleType, key:number)=>{
                            return (key==2 || key==3 || key==11 || key==12 || key==13 || key==21 || key==22 || key==23) && (
                            <article key={key}>
                                <a href={article.url} target="_black">
                                    <h3>{titleCount(article.title, 70)}</h3>
                                </a>
                                <PublishedDate date={article.publishedAt}/>
                            </article>
                        )})}
                    </div>
                }
            </div>

        </section>
    )
}

export default TopStory