import { useState, useContext, useEffect, Fragment } from "react"
import { context } from "../App"
import { useLocation } from 'react-router-dom'
import { CategoryH1 } from "../Styled Components"
import altImg from '../../public/dnn.png'
import clock from '../../public/clock.svg'
import '../CSS/ArticleList.css'

function ArticleList() {

    const {
        news,
        getNews,
        // setDummyData,
        showDate
    } = useContext(context)

    const [ searchn, setSearch ]= useState<boolean>(false)

    const location = useLocation();

    useEffect(()=>{

        setSearch(location.pathname.split('/')[1]=='search'?true:false)

        getNews(0,location.pathname)
        // setDummyData()
        
        window.scrollTo(0,0)
    },[location])

    const upperCasedTitle=(s:string):string=>{
        const str=s.split('')
        const firstLetter=str.shift()!.toUpperCase()
        return firstLetter+str.join('')
    }

    // console.log("split",location.pathname.split('/'))

    return (
        
        <section className="articleList">
            {
            // location.pathname.split('/')[1]=='category'?
            //     <CategoryH1 category={location.pathname.split('/category/')[1]}>
            //         {upperCasedTitle(location.pathname.split('/category/')[1])}
            //     </CategoryH1>
            //     :
            //     <h2>Search:{location.pathname.split('/')[2]}</h2>


            searchn?
            <div className='searchResult'>
                <h2>Search:&nbsp;{location.pathname.split('/')[2]}</h2>
                <h3>{news.length>=10?'+10':news.length} article(s) found.</h3>
            </div>
            :
            <CategoryH1 category={location.pathname.split('/')[2]}>
                {upperCasedTitle(location.pathname.split('/')[2])}
            </CategoryH1>
            
            

            // <div>{search?'s':'c'}</div>
                
            
            }
            
            <hr/>
            {news.map((article:any, key:number)=>{
                return (article.description || article.content) && (

                    <Fragment key={key}>

                        {key!==0 && <hr/>}
                    
                        <article
                            
                            // style={{backgroundColor:article.api=='api1'?'lightgreen':'pink'}}
                        >
                            <div className="publishedDate">
                                <img src={clock}/>
                                {showDate(article.publishedAt)}
                            </div>
                            <a href={article.url} target='_blank'>
                                <h2>{article.title}</h2>
                            </a>
                            
                            <div className="flex">
                                <div>
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