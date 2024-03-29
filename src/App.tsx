import { useState, createContext } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Form from './components/Form';
import HeadLine from './components/HeadLine/HeadLine';
import Categorized from './components/Categorized';
import Unavailable from './components/Unavailable';

export type NewsArticleType = {
    content: string,
    description: string,
    image: string,
    publishedAt: string,
    source: {name: string, url: string},
    title: string,
    url: string
};

type NewsContextValues = {
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
    searchResult: [boolean,number],
    setSearchResult: React.Dispatch<React.SetStateAction<[boolean, number]>>,
    setNews: React.Dispatch<React.SetStateAction<Array<NewsArticleType>|undefined>>,
    news: Array<NewsArticleType>|undefined,
    setLoaded: React.Dispatch<React.SetStateAction<boolean>>
};

export const NewsCotext = createContext<NewsContextValues>({} as NewsContextValues);

export const APIkeys = [
    import.meta.env.VITE_APIkey_1,
    import.meta.env.VITE_APIkey_2,
    import.meta.env.VITE_APIkey_3
];

function App() {

    const [news, setNews] = useState<Array<NewsArticleType>>();
    const [searchResult, setSearchResult] = useState<[boolean,number]>([false,0]);
    const [APIunavailable, setAPIunavailable] = useState<boolean>(false);
    const [detailedSearch, setDetailedSearch] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [headLine, setHeadLine] = useState<boolean>(true);
    const [loaded, setLoaded]=useState<boolean>(false)

    const runAxios = (
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

        const url = category=='search'?
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
        <NewsCotext.Provider value={{runAxios,setDetailedSearch,setSelectedCategory,setHeadLine,setAPIunavailable,selectedCategory,searchResult,setSearchResult,setNews,news,setLoaded}}>
        
            <Header/>

            {detailedSearch && <Form/>}

            {APIunavailable && <Unavailable/>}

            {!APIunavailable &&
                <div className='loading' style={{display:loaded?'none':'block'}}>
                    <div></div>
                </div>
            }
                    
            {!APIunavailable && headLine && <HeadLine/>}

            {!APIunavailable && !headLine && <Categorized/>}

        </NewsCotext.Provider>
    )
};

export default App;