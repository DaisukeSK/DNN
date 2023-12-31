import { useState, useEffect, useRef, createContext, RefObject } from 'react';
import axios from 'axios';
import dummy from './dummy.json';
import Header from './components/Header';
import Article from './components/Article';
import Form from './components/Form';
import Unavailable from './components/Unavailable';

export type NewsArticle={
  content: string,
  description: string,
  image: string,
  publishedAt: string,
  source: {name: string, url: string},
  title: string,
  url: string
};

export type SearchTerm={
  keyword: string[],
  from: string,
  to: string,
  category: string,
  operator: string
};

type NewsContextValues={
  lang: string,
  textRef: RefObject<HTMLInputElement>,
  orRef: RefObject<HTMLInputElement>,
  andRef: RefObject<HTMLInputElement>,
  fromRef: RefObject<HTMLInputElement>,
  toRef: RefObject<HTMLInputElement>,
  setSearchTerm: (state: SearchTerm)=>void,
  searchTerm: SearchTerm,
  setMultiWord: (state: boolean)=>void,
  multiWord: boolean,
  runAxios: (
    number: number,
    category: string,
    lang: string,
    q: string,
    from: string,
    to: string,
    search: boolean
    )=>void,
  setDummyArticles: any
};

export const NewsCotext=createContext<NewsContextValues>({} as NewsContextValues);

function App() {

  const rgba=(bgColor:string):string=> {
    let str='';
    bgColor.split('').forEach((c:string):void=>{
      c=='b'?str=str+c+'a':
      c==')'?str=str+', 0.5'+c:
      str+=c
    });
    return `linear-gradient(${bgColor}, ${str} 150px)`;
  };

  const tagWidthChange=():number=>{
    return window.innerWidth*0.86/7-7;
  };

  const [news, setNews] = useState<Array<NewsArticle>>();
  const [searchTerm, setSearchTerm] = useState<SearchTerm>({
      keyword: [],
      from: '',
      to: '',
      category: 'general',
      operator: 'OR'
    });
  const [multiWord, setMultiWord] = useState<boolean>(false);
  const [tagWidth, setTagWidth] = useState<number>(tagWidthChange());
  const [mainBG, setMainBG] = useState<string>();
  const [searchResult, setSearchResult] = useState<[boolean,number]>([false,0]);
  const [APIunavailable, setAPIunavailable] = useState<boolean>(false);

  const dummyArticle=[...dummy.data];
  console.log("dummyArticle",dummyArticle);

  const textRef=useRef<HTMLInputElement>(null);
  const orRef=useRef<HTMLInputElement>(null);
  const andRef=useRef<HTMLInputElement>(null);
  const fromRef=useRef<HTMLInputElement>(null);
  const toRef=useRef<HTMLInputElement>(null);

  const APIkeys=[
    import.meta.env.VITE_APIkey_1,
    import.meta.env.VITE_APIkey_2,
    import.meta.env.VITE_APIkey_3
  ];

  const lang:string='en';
  
  const runAxios=(
    number:number,
    category:string,
    lang:string,
    q:string,
    from:string,
    to:string,
    search:boolean
    ):void =>{

    axios.get(`https://gnews.io/api/v4/top-headlines?apikey=${APIkeys[number]}&category=${category}&lang=${lang}&q=${q}&from=${from}&to=${to}`)
    .then((res) => {
      console.log("API working in loop",number);
      search? setSearchResult([true,res.data.articles.length]) : setSearchResult([false,0])
      setNews([...res.data.articles]);
      setAPIunavailable(false);
    })
    .catch((e)=>{
      console.log("ERR in number",number);
      console.log("ERR",e);
      number<2? runAxios(number+1,category,lang,q,from,to,search) : setAPIunavailable(true)
    });
  };

  const setDummyArticles=(boolean: boolean, number: number):void =>{
    // setNews([...dummyArticle]);
    // setSearchResult([boolean,number]);
    console.log(boolean,number);
  };

  useEffect(()=>{
    setDummyArticles(false,0);
    runAxios(0, searchTerm.category, lang, '', '', '', false);
    setMainBG(rgba($('.general').css("background-color")));
  },[]);


  const clickTag=(e:React.MouseEvent<HTMLDivElement>):void =>{

    const Event=e.target as HTMLDivElement;

    setMainBG(rgba($(e.target).css("background-color")));

    setSearchTerm({
      keyword: [],
      from: '',
      to: '',
      category: Event.className,
      operator: 'OR'
    });

    textRef.current!.value='';
    orRef.current!.checked=true;
    andRef.current!.checked=false;
    setMultiWord(false);
    toRef.current!.value='';
    fromRef.current!.value='';

    setDummyArticles(false, 0);
    runAxios(0, Event.className, lang, '', '', '', false);
  };

  window.onresize=():void=>{
    setTagWidth(tagWidthChange());
  };

  return (
    <NewsCotext.Provider value={{lang,textRef,orRef,andRef,fromRef,toRef,setSearchTerm,searchTerm,setMultiWord,multiWord,runAxios,setDummyArticles}}>

      <Header/>

      <main>

        <div className='tagFlex'>
          {[
            "general",
            // "world",
            // "nation",
            "business",
            "technology",
            "entertainment",
            "sports",
            "science",
            "health"
          ].map((tag:string, key:number) =>{
            return (
              <div
                key={key}
                className={tag}
                style={{width:`${tagWidth}px`}}
                onClick={(e)=>clickTag(e)}
              >
                {tag.split('').map((t:string, key:number):string=>{
                  return key==0? t.toUpperCase():t
                })}
              </div>
              )
            })}
        </div>

        <div className='formANDarticles' style={{background:mainBG}}>

          {APIunavailable && <Unavailable/>}

          {!APIunavailable &&
            <>
              <Form/>
              {searchResult[0] &&
                <h3 className='searchResult'>{searchResult[1]>=10?'10+':searchResult[1]} article(s) found.</h3>
              }
              <div className='articleContainer'>
                {news?.map((dt:NewsArticle, key:number) =>{
                  return <Article key={key} article={dt}/>
                })}
              </div>
            </>
          }

        </div>

      </main>

    </NewsCotext.Provider>
  )
};

export default App;