import { useContext } from "react"
import { context, NewsArticleType } from "../../App"
import altImg from '../../../public/dnn.png'
import { Link } from "react-router-dom"
import articleSVG from '../../../public/article.svg'
import baseball from '../../../public/baseball.svg'
import restaurant from '../../../public/restaurant.svg'
import PublishedDate from "../PublishedDate"

function PickUp() {

    const { news, titleCount } = useContext(context)

    const num1:number=5;
    const num2:number=15;
    const num3:number=25;

    return (
        <section className="pickUp">

            {news.map((article:NewsArticleType, key:number)=>{
                return (key==num1 || key==num2 || key==num3) && (
                    
                    <div key={key}>

                        <div className='title'>

                            <img src={key==num1?articleSVG:key==num2?restaurant:baseball}/>
                            <h2>{key==num1?'Business':key==num2?'Entertainment':key==num3&&'Sports'}</h2>
                            
                            <Link to={`/category/${key==num1?'business':key==num2?'entertainment':key==num3&&'sports'}`}>
                                <svg width='10' height='8'>
                                    <path d='m0,0 l10,4 l-10,4Z'/>
                                </svg>
                                <span>See more</span>
                            </Link>

                        </div>
                    
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

                    </div>
                    
                )})}
            
        </section>
    )
}

export default PickUp