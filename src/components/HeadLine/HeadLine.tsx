import { useContext, useState, useEffect } from "react";
import { NewsCotext, APIkeys, NewsArticle } from '../../App'
import axios from "axios";
import dummy from '../../dummy.json'
import PickUp from "./PickUp";
import TopRight from "./TopRight";
import Trending from "./Trending";
import MoreToExpolore from "./MoreToExpolore";

function HeadLine() {

  const { setAPIunavailable, setLoaded }=useContext(NewsCotext)
  const [news1, setNews1] = useState<Array<NewsArticle>>();
  const [news2, setNews2] = useState<Array<NewsArticle>>();
  const [news3, setNews3] = useState<Array<NewsArticle>>();
  
  const runAxiosForHeadline=(
    number:number,
    category:Array<string>,
    lang:string,
    ):void =>{
  
    setLoaded(false)

    axios.all([
      axios.get(`https://gnews.io/api/v4/top-headlines?apikey=${APIkeys[number]}&category=${category[0]}&lang=${lang}`),
      axios.get(`https://gnews.io/api/v4/top-headlines?apikey=${APIkeys[number]}&category=${category[1]}&lang=${lang}`),
      axios.get(`https://gnews.io/api/v4/top-headlines?apikey=${APIkeys[number]}&category=${category[2]}&lang=${lang}`)
    ])
    .then(axios.spread((obj1,obj2,obj3)=>{

      console.log("API working in loop",number);
      
      setAPIunavailable(false);
      setNews1(obj1.data.articles)
      setNews2(obj2.data.articles)
      setNews3(obj3.data.articles)
      setLoaded(true)

    }))

    .catch((e)=>{
      console.log("ERR in number",number);
      console.log("ERR",e);
      number<2? runAxiosForHeadline(number+1,category,lang) : setAPIunavailable(true)
    });
  };

  useEffect(()=>{
    runAxiosForHeadline(0,['entertainment','sports','business'],'en')

    // setNews1(dummy.data)
    // setNews2(dummy.data)
    // setNews3(dummy.data)
    // setLoaded(true)
  },[])

  let number:number=0;

  return (
    <main className='headline'>

      <div className="breakingNews">
        <h1>Breaking News</h1>
        <svg width='15' height='40'>
          <path d='m0,0 h15 l-15,40Z' fill='#FFFFFF'/>
        </svg>
      </div>

      <section className='headlineTop'>

        <div className='left'>
          {news3?.map((news:NewsArticle,key:number)=>{
            return key==9 &&
            <>
              <a className='titleA' href={news.url} target='_blank'>
                <h2>{news.title}</h2>
              </a>
              <div className="description">{news.description}</div>
              <a className='imgA' href={news.url} target='_blank'>
                <div className='whiteBG'></div>
                <img src={news.image}/>
              </a>
            </>
          })}
        </div>

        <div className='right'>

          {news1?.map((news:NewsArticle,key:number)=>{
            return key==0 &&
            <TopRight news={news}/>
          })}

          {news2?.map((news:NewsArticle,key:number)=>{
            return key==0 &&
            <TopRight news={news}/>
          })}

          {news3?.map((news:NewsArticle,key:number)=>{
            return key==0 &&
            <TopRight news={news}/>
          })}

        </div>

      </section>

      <hr/>

      <section className='hot'>
        {news2?.map((news:any,key:number)=>{
          return key==9 &&
            <a className='titleA' href={news.url} target='_blank'>
              <img src={news.image}/>
              <h2>{news.title}</h2>
              <div>Hot!</div>
            </a>
        })}
      </section>

      <hr/>

      <section className='pickUp'>

        {news1?.map((news:any,key:number)=>{
          return key==1 &&
          <PickUp news={news} category={'Entertainment'}/>
        })}

        {news2?.map((news:any,key:number)=>{
          return key==1 &&
          <PickUp news={news} category={'Sports'}/>
        })}

        {news3?.map((news:any,key:number)=>{
          return key==1 &&
          <PickUp news={news} category={'Business'}/>
        })}

      </section>

      <hr/>

      <section className='moreToSee'>

        <div className="left">

          <div className="title">
            <div className="bg"></div>
            <h3>More to Explore</h3>
          </div>

          <div className="leftFlex">
            {news1?.map((news:any,key:number)=>{
              return key>1 && key<=4 &&
              <MoreToExpolore news={news}/>
            })}
            {news2?.map((news:any,key:number)=>{
              return key>1 && key<=4 &&
              <MoreToExpolore news={news}/>
            })}
            {news3?.map((news:any,key:number)=>{
              return key>1 && key<=4 &&
              <MoreToExpolore news={news}/>
            })}
          </div>
        </div>

        <div className="right">

          <div className="title">
            <div className="bg"></div>
            <h3>Trending</h3>
          </div>
          
          {news1?.map((news:any,key:number)=>{
            number++
              return key<7 &&
              <Trending news={news} number={number}/>
            })}

        </div>

      </section>

    </main>
  )
};

export default HeadLine;