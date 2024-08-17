import { useContext, Fragment } from "react"
import { context, NewsArticleType } from "../../App"
import altImg from '../../../public/dnn.png'
import PublishedDate from "../PublishedDate"

function Featured(props:{featured?:boolean}) {

    const { news, titleCount } = useContext(context)

    return (
        <section className="featured">

            {props.featured?<h1>Featured</h1>:<h2>In Case You Missed It</h2>}
            
            <div className="flex">

                {news.map((article:NewsArticleType, key:number)=>{
                    return ((props.featured && (key==4 || key==14 || key==24 || key==26))||(!props.featured && (key==9 || key==19 || key==21 || key==29))) && (

                        <Fragment key={key}>
                            <article key={key}>
                                <a href={article.url} target="_black" className='imgA'>
                                    <img
                                        src={article.image?article.image:altImg}
                                        onError={(e)=>{
                                            const Target=e.target as HTMLImageElement
                                            Target.src=altImg
                                        }}
                                    />
                                </a>
                                <a href={article.url} target="_black">
                                    <h2>{titleCount(article.title,70)}</h2>
                                </a>
                                <PublishedDate date={article.publishedAt}/>
                            </article>
                            {!(props.featured && key==26) && <hr/>}
                        </Fragment>
                )})}
            </div>
        </section>
    )
}

export default Featured