import { NewsArticleType } from '../../App'
import altImg from '../../../public/dnn.png'

function TopRight(Props:{news:NewsArticleType}) {
    let newStr=''
    Props.news.description.split(' ').map((str:string,key:number)=>{
        newStr+= key<15? `${str} `:key==15?`${str}...`:''
    })

    return (
        <div className="flex">

            <a className='imgA' href={Props.news.url} target='_blank'>
                <div className='whiteBG'></div>
                <img
                    src={Props.news.image}
                    onError={(e)=>{
                        const Target=e.target as HTMLImageElement
                        Target.src=altImg
                    }}
                />
            </a>
            
            <div>
                <a className='titleA' href={Props.news.url} target='_blank'>
                    <h3>{Props.news.title}</h3>
                </a>
                {Props.news.title.split(' ').length<=10 &&
                    <div>{newStr}</div>
                }
            </div>
        
        </div>
    )
};

export default TopRight;