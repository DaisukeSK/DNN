import { useState, createContext } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Form from './components/Form';
import HeadLine from './components/HeadLine/HeadLine';
import Categorized from './components/Categorized';
import Unavailable from './components/Unavailable';
// import dummy from './dummy.json'

export type NewsArticle={
  content: string,
  description: string,
  image: string,
  publishedAt: string,
  source: {name: string, url: string},
  title: string,
  url: string
};

// export type SearchTerm={
//   keyword: string[],
//   from: string,
//   to: string,
//   category: string,
//   operator: string
// };

type NewsContextValues={
  // lang: string,
  // textRef: RefObject<HTMLInputElement>,
  // orRef: RefObject<HTMLInputElement>,
  // andRef: RefObject<HTMLInputElement>,
  // fromRef: RefObject<HTMLInputElement>,
  // toRef: RefObject<HTMLInputElement>,
  // setSearchTerm: (state: SearchTerm)=>void,
  // searchTerm: SearchTerm,
  // setMultiWord: (state: boolean)=>void,
  // multiWord: boolean,
  runAxios: (
    number: number,
    category: string,
    lang: string,
    q: string,
    from: string,
    to: string,
    search: boolean
    )=>void,
  setDetailedSearch: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>,
  setHeadLine: React.Dispatch<React.SetStateAction<boolean>>,
  setAPIunavailable: React.Dispatch<React.SetStateAction<boolean>>,
  selectedCategory: string,
  APIunavailable: boolean,
  
  searchResult:[boolean,number],
  setSearchResult: React.Dispatch<React.SetStateAction<[boolean, number]>>,
  setNews: React.Dispatch<React.SetStateAction<NewsArticle[] | undefined>>,
  news:Array<NewsArticle>|undefined,
  setLoaded: React.Dispatch<React.SetStateAction<boolean>>
};

export const NewsCotext = createContext<NewsContextValues>({} as NewsContextValues);

export const rgba=(bgColor:string):string=> {
  let str='';
  bgColor.split('').forEach((c:string):void=>{
    c=='b'?str=str+c+'a':
    c==')'?str=str+', 0.5'+c:
    str+=c
  });
  return `linear-gradient(${bgColor}, ${str} 150px)`;
};

export const APIkeys=[
  import.meta.env.VITE_APIkey_1,
  import.meta.env.VITE_APIkey_2,
  import.meta.env.VITE_APIkey_3
];

function App() {

  const [news, setNews] = useState<Array<NewsArticle>>();
  // const [searchTerm, setSearchTerm] = useState<SearchTerm>({
  //     keyword: [],
  //     from: '',
  //     to: '',
  //     category: 'general',
  //     operator: 'OR'
  //   });
  // const [multiWord, setMultiWord] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<[boolean,number]>([false,0]);
  const [APIunavailable, setAPIunavailable] = useState<boolean>(false);
  // const [displayList, setDisplayList] = useState<boolean>(true);
  const [detailedSearch, setDetailedSearch] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [headLine, setHeadLine] = useState<boolean>(true);
  const [loaded, setLoaded]=useState<boolean>(false)

  // const textRef=useRef<HTMLInputElement>(null);
  // const orRef=useRef<HTMLInputElement>(null);
  // const andRef=useRef<HTMLInputElement>(null);
  // const fromRef=useRef<HTMLInputElement>(null);
  // const toRef=useRef<HTMLInputElement>(null);

  // const lang:string='en';
  
  const runAxios=(
    number:number,
    category:string,
    lang:string,
    q:string,
    from:string,
    to:string,
    search:boolean
    ):void =>{

      setHeadLine(false)
      setLoaded(false)

      const url=category=='search'?
      `https://gnews.io/api/v4/search?apikey=${APIkeys[number]}&lang=${lang}&q=${q}`:
      `https://gnews.io/api/v4/top-headlines?apikey=${APIkeys[number]}&category=${category}&lang=${lang}&q=${q}&from=${from}&to=${to}`

      axios.get(url)
      .then((res) => {
        console.log("API working in loop",number);
        search? setSearchResult([true,res.data.articles.length]) : setSearchResult([false,0])
        setNews([...res.data.articles]);
        setAPIunavailable(false);
        category!=='search' && setSelectedCategory(category.charAt(0).toUpperCase() + category.slice(1))
        window.scrollTo(0,0)
        setLoaded(true)
      })
      .catch((e)=>{
        console.log("ERR in number",number);
        console.log("ERR",e);
        number<2? runAxios(number+1,category,lang,q,from,to,search) : setAPIunavailable(true)
      });
  };

  return (
    <NewsCotext.Provider value={{runAxios,setDetailedSearch,setSelectedCategory,setHeadLine,setAPIunavailable,selectedCategory,APIunavailable,searchResult,setSearchResult,setNews,news,setLoaded}}>
      <Header/>

      {APIunavailable && <Unavailable/>}

      {!APIunavailable &&
        <div className='loading' style={{display:loaded?'none':'block'}}>
          <div></div>
        </div>
      
      }

      {detailedSearch && <Form/>}

      
            
      {!APIunavailable && headLine && <HeadLine/>}

      {!APIunavailable && !headLine && <Categorized/>}

    </NewsCotext.Provider>
  )
};

export default App;