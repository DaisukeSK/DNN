import { useContext, useState } from "react"
import { context, NewsArticleType } from "../../App"
import altImg from '../../../public/dnn.png'
import left from '../../../public/left.svg'
import right from '../../../public/right.svg'
import flame from '../../../public/flame.svg'
import { TrendingUl } from "../../Styled Components"

function Trending() {

    const { news, titleCount } = useContext(context)

    const [slide, setSlide] =useState<number>(0)
    let i=1

    return (
        <section className="trending">
            <h2><img src={flame}/>Tranding</h2>
            <TrendingUl slide={slide}>

                {news.map((article:NewsArticleType, key:number)=>{
                    return (key==6 || key==7 || key==8 || key==17 || key==18 || key==27 || key==28) && (
                    <li key={key}>
                        <span>{i++}</span>
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
                        <div>{titleCount(article.title, 70)}</div>
                            
                        </a>
                    </li>
                )})}
            </TrendingUl>

            {slide<0 &&
                <div className="toLeft" onClick={()=>setSlide(slide+1)}>
                    <img src={left}/>
                </div>
            }
            {slide>-3 &&
                <div className="toRight" onClick={()=>setSlide(slide-1)}>
                    <img src={right}/>
                </div>
            }
            {slide>-6 &&
                <div className="toRight_mobile" onClick={()=>setSlide(slide-1)}>
                    <img src={right}/>
                </div>
            }
            
        </section>
    )
}

export default Trending