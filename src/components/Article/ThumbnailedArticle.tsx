import altImg from '../../../public/dnn.png';
import clockImg from '../../../public/clock.svg';
import { NewsArticleType } from '../../App';

function ThumbnailedArticle({article}:{article: NewsArticleType}) {

    return (
        <article className='thumbnailedArticle'>

            <a href={article.url} target='_blank'>

                <div className='whiteBack'></div>
                
                <div className='date'>
                    <img src={clockImg}/>
                    <div>{article.publishedAt.split("T")[0]}&nbsp;|&nbsp;{article.source.name}</div>
                </div>

                <h2>{article.title}</h2>
                
                <img
                    src={article.image}
                    onError={(e)=>{
                        const Target=e.target as HTMLImageElement
                        Target.src=altImg
                    }}
                />
                
            </a>
            
        </article>
    )
};

export default ThumbnailedArticle;