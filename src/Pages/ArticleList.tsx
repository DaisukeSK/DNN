import { useState, useContext, useEffect, Fragment } from "react"
import { context, NewsArticleType } from "../App"
import { useLocation } from 'react-router-dom'
import { CategoryH1 } from "../Styled Components"
import altImg from '../../public/dnn.png'
import PublishedDate from "./PublishedDate"

function ArticleList() {

    const { news, getNews } = useContext(context)
    const [ searchn, setSearch ]= useState<boolean>(false)
    const location = useLocation();

    useEffect(()=>{

        setSearch(location.pathname.split('/')[1]=='search'?true:false)
        getNews(0,location.pathname)
        window.scrollTo(0,0)

    },[location])

    const upperCasedTitle=(s:string):string=>{
        const str=s.split('')
        const firstLetter=str.shift()!.toUpperCase()
        return firstLetter+str.join('')
    }

    return news.length!==0 && (

        <section className="articleList">

            {searchn?
                <div className='searchResult'>
                    <h2>Search:&nbsp;{location.pathname.split('/')[2]}</h2>
                    <h3>{news.length>=10?'+10':news.length} article(s) found.</h3>
                </div>
                :
                <CategoryH1 category={location.pathname.split('/')[2]}>
                    {upperCasedTitle(location.pathname.split('/')[2])}
                </CategoryH1>
            }
            
            <hr/>

            {news.map((article:NewsArticleType, key:number)=>{
                return (article.description || article.content) && (

                    <Fragment key={key}>
                        {key!==0 && <hr/>}

                        <article>

                            <PublishedDate date={article.publishedAt}/>

                            <a href={article.url} target='_blank'>
                                <h2>{article.title}</h2>
                            </a>
                            
                            <div className="flex">

                                <div className='description'>
                                    {article.description && <h3>{article.description}</h3>}
                                    {article.content && <p>{article.content.split(/\[\+?\d{1,5}\schars\]/)[0]}</p>}
                                </div>

                                <a href={article.url} target='_blank' className='imgA'>
                                    <img
                                        src={article.image?article.image:altImg}
                                        onError={(e)=>{
                                            const Target=e.target as HTMLImageElement
                                            Target.src=altImg}
                                        }
                                    />
                                </a>

                            </div>
                        
                        </article>
                    </Fragment>
                )
            })}

        </section>
    )
}

export default ArticleList