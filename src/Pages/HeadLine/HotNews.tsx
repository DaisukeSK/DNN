import { useContext } from "react"
import { context, NewsArticleType } from "../../App"
import altImg from '../../../public/dnn.png'

function HotNews() {

    const { news, titleCount } = useContext(context)

    return (
        <section className="hot">
            
                {news.map((article:NewsArticleType, key:number)=>{
                    return key==16 && (
                    
                        <a href={article.url} target="_black" key={key}>
                            <img
                                src={article.image?article.image:altImg}
                                onError={(e)=>{
                                    const Target=e.target as HTMLImageElement
                                    Target.src=altImg
                                }}
                            />
                            <h3>{titleCount(article.title,100)}</h3>
                            <h2>Hot!</h2>
                        </a>
                )})}
            
        </section>
    )
}

export default HotNews