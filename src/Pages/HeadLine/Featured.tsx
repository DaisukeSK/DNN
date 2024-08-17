import { useContext } from "react"
import { context } from "../../App"
import altImg from '../../../public/dnn.png'
import clock from '../../../public/clock.svg'

function Featured(props:{featured?:boolean}) {

    const { news, showDate, titleCount } = useContext(context)

    return (
        <section className="featured">
            {props.featured?<h1>Featured</h1>:<h2>In Case You Missed It</h2>}
            
            <div className="flex">
                {news.map((article:any, key:number)=>{
                    return ((props.featured && (key==4 || key==14 || key==24 || key==26))||(!props.featured && (key==9 || key==19 || key==20 || key==29))) && (

                        <>

                        
                        
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
                        <div className="publishedDate">
                            <img src={clock}/>
                            {showDate(article.publishedAt)}
                        </div>
                    </article>

                    {!(props.featured && key==26) && <hr/>}
                        </>
                )})}
                
            </div>
            
        </section>
    )
}

export default Featured