import { useContext, useState, useEffect, Fragment } from "react";
import { NewsCotext, APIkeys, NewsArticleType } from '../../App'
import axios from "axios";
// import dummy from '../../../ignore/dummy.json'
import PickUp from "./PickUp";
import TopRight from "./TopRight";
import Trending from "./Trending";
import MoreToExpolore from "./MoreToExpolore";
import altImg from '../../../public/dnn.png'
import altImg2 from '../../../public/dnn2.png'

function HeadLine() {

    const { setAPIunavailable, setLoaded }=useContext(NewsCotext)
    const [news1, setNews1] = useState<Array<NewsArticleType>>();
    const [news2, setNews2] = useState<Array<NewsArticleType>>();
    const [news3, setNews3] = useState<Array<NewsArticleType>>();
    
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
                    {news3?.map((news:NewsArticleType,key:number)=>{
                        let descStr=''
                        news.description.split(' ').map((str:string,key:number)=>{
                            descStr+= key<30? `${str} `:key==20?`${str}...`:''
                        })

                        return key==9 &&
                        <Fragment key={key}>
                            <a className='titleA' href={news.url} target='_blank'>
                                <h2>{news.title}</h2>
                            </a>
                            <div className="description">{descStr}</div>
                            <a className='imgA' href={news.url} target='_blank'>
                                <div className='whiteBG'></div>
                                <img
                                    src={news.image}
                                    onError={(e)=>{
                                        const Target=e.target as HTMLImageElement
                                        Target.src=altImg
                                    }}
                                />
                            </a>
                        </Fragment>
                    })}
                </div>

                <div className='right'>
                    {news1?.map((news:NewsArticleType, key:number)=>{
                        return key==0 &&
                        <TopRight news={news} key={key}/>
                    })}
                    {news2?.map((news:NewsArticleType, key:number)=>{
                        return key==0 &&
                        <TopRight news={news} key={key}/>
                    })}
                    {news3?.map((news:NewsArticleType, key:number)=>{
                        return key==0 &&
                        <TopRight news={news} key={key}/>
                    })}
                </div>

            </section>

            <hr/>

            <section className='hot'>
                {news2?.map((news:NewsArticleType, key:number)=>{
                return key==9 &&
                    <a className='titleA' href={news.url} target='_blank' key={key}>
                        <img src={news.image} onError={(e)=>{
                            const Target=e.target as HTMLImageElement
                            Target.src=altImg2
                        }}/>
                        <h2>{news.title}</h2>
                        <div>Hot!</div>
                    </a>
                })}
            </section>

            <hr/>

            <section className='pickUp'>
                {news1?.map((news:NewsArticleType, key:number)=>{
                    return key==1 &&
                    <PickUp news={news} category={'Entertainment'} key={key}/>
                })}
                {news2?.map((news:NewsArticleType, key:number)=>{
                    return key==1 &&
                    <PickUp news={news} category={'Sports'} key={key}/>
                })}
                {news3?.map((news:NewsArticleType, key:number)=>{
                    return key==1 &&
                    <PickUp news={news} category={'Business'} key={key}/>
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
                        {news1?.map((news:NewsArticleType, key:number)=>{
                        return key>1 && key<=4 &&
                        <MoreToExpolore news={news} key={key}/>
                        })}
                        {news2?.map((news:NewsArticleType, key:number)=>{
                        return key>1 && key<=4 &&
                        <MoreToExpolore news={news} key={key}/>
                        })}
                        {news3?.map((news:NewsArticleType, key:number)=>{
                        return key>1 && key<=4 &&
                        <MoreToExpolore news={news} key={key}/>
                        })}
                    </div>
                </div>

                <div className="right">
                    <div className="title">
                        <div className="bg"></div>
                        <h3>Trending</h3>
                    </div>
                    {news1?.map((news:NewsArticleType, key:number)=>{
                        number++
                        return key<7 &&
                        <Trending news={news} number={number} key={key}/>
                    })}
                </div>

            </section>

        </main>
    )
};

export default HeadLine;