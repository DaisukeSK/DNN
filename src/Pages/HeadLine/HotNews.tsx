import { useContext } from "react"
import { context } from "../../App"
import altImg from '../../../public/dnn.png'

function HotNews() {

    const { news } = useContext(context)

    return (
        <section className="hot">
            
                {news.map((article:any, key:number)=>{
                    return key==16 && (
                    
                        <a href={article.url} target="_black" key={key}>
                            <img
                                src={article.image?article.image:altImg}
                                onError={(e)=>{
                                    const Target=e.target as HTMLImageElement
                                    Target.src=altImg
                                }}
                            />
                            <h3>{article.title}</h3>
                            <h2>Hot!</h2>
                        </a>
                    
                )})}
            
        </section>
    )
}

export default HotNews