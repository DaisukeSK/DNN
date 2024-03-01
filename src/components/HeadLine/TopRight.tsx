import { NewsArticle } from '../../App'

function TopRight(Props:{news:NewsArticle}) {
  let newStr=''
  Props.news.description.split(' ').map((str:string,key:number)=>{
  newStr+= key<15? `${str} `:key==15?`${str}...`:''
  })

  return (
    <div className="flex">
      <a className='imgA' href={Props.news.url} target='_blank'>
        <div className='whiteBG'></div>
        <img src={Props.news.image}/>
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