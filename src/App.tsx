import { useState, createContext, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import './CSS/App.css'
import dummyJson from '../ignore/dummy.json'

import HeadLine from './Pages/HeadLine/HeadLine.tsx'
import ArticleList from './Pages/ArticleList.tsx'
import Header from './Pages/Header.tsx'
import Unavailable from './Pages/Unavailable.tsx'

type contextType={
    news:any,
    showSearchBar: boolean,
    setShowSearchBar: React.Dispatch<React.SetStateAction<boolean>>,
    getNews: (n:number, s:string)=>void,
    setDummyData: ()=>void,
    showDate: (d:string) => string,
    titleCount: (d:string, count:number) => string,
}

export const context = createContext<contextType>({} as contextType)

function App() {

    const [showSearchBar, setShowSearchBar] = useState<boolean>(false)
    const [unavailable, setUnavailable] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)

    const [news, setNews] = useState<any>([])

    // const apikey1 = [import.meta.env.VITE_APIkey_11, import.meta.env.VITE_APIkey_12, import.meta.env.VITE_APIkey_13]
    const apikey2 = [import.meta.env.VITE_APIkey_21, import.meta.env.VITE_APIkey_22, import.meta.env.VITE_APIkey_23]

    const showDate=(d:string)=>{
        const date=new Date(d)
        const current=new Date()
        let returnStr:string

        switch(true){
            case date.getDate()==current.getDate():
                const unit=current.getHours()-date.getHours()>=2?'Hours Ago':'Hour Ago'
                returnStr=`${current.getHours()-date.getHours()} ${unit}`
                break;
            default:
                returnStr=`${date.toLocaleString('default', {month:'long'})} ${date.getDate()}`
        }
        
        return returnStr
    }

    const titleCount=(title:string, count:number):string=>{

        if(title.length!>count){

            const array:Array<string>=title.split('')
            array.splice(count)

            while(array[array.length-1]!==' '){
                array.pop()
            }

            array.pop()
            array.push('...')

            return array.join('')
        }else{
            return title
        }
    }

    const getNews = (n:number,s:string):void => {

        setLoading(true)
        setUnavailable(false)

        setNews([])

        let url1=''
        let url2=''
        let url3=''

        const category1='business'
        const category2='entertainment'
        const category3='sports'

        // let url3;

        if(s.includes('/search/')){
            url1=`https://gnews.io/api/v4/search?lang=en&q=${s.split('/search/')[1]}&apikey=${apikey2[n]}`
            // url2=`https://newsapi.org/v2/everything?q=${s.split('/search/')[1]}&sortBy=popularity&pageSize=100&language=en&searchIn=title,description,content&apiKey=${apikey1[n1]}`
            // url3=`https://newsdata.io/api/1/latest?apikey=pub_50372c68861d2462ab76986d77c70b8770d53&q=${s.split('/search/')[1]}&language=en&image=1`
        }else if(s.includes('/category/')){
            url1=`https://gnews.io/api/v4/top-headlines?lang=en&category=${s.split('/category/')[1]}&apikey=${apikey2[n]}`
            // url2=`https://newsapi.org/v2/top-headlines?country=us&pageSize=100&category=${s.split('/category/')[1]}&apiKey=${apikey1[n1]}`
            // url3=`https://newsdata.io/api/1/latest?apikey=pub_50372c68861d2462ab76986d77c70b8770d53&category=${s.split('/category/')[1]}&language=en&image=1`
        }else{
            url1=`https://gnews.io/api/v4/top-headlines?lang=en&category=${category1}&apikey=${apikey2[n]}`
            url2=`https://gnews.io/api/v4/top-headlines?lang=en&category=${category2}&apikey=${apikey2[n]}`
            url3=`https://gnews.io/api/v4/top-headlines?lang=en&category=${category3}&apikey=${apikey2[n]}`
            // url2=`https://newsapi.org/v2/top-headlines?country=us&pageSize=100&category=${category1}&apiKey=${apikey1[n1]}`
            // url3='https://newsdata.io/api/1/latest?apikey=pub_50372c68861d2462ab76986d77c70b8770d53&language=en&image=1'
        }

        
        // if(true){
        if(!s){

            axios.all([
                axios.get(url1),
                axios.get(url2),
                axios.get(url3)
            ])
            .then(axios.spread((obj1,obj2,obj3)=>{
    
                setLoading(false)
                setUnavailable(false)

                setNews([...obj1.data.articles,...obj2.data.articles,...obj3.data.articles])
                
            }))
            .catch((error)=>{
                console.log("Err in loop",n,error)
                if(n<=1){
                    getNews(n+1,s)
                }else{
                    setLoading(false)
                    setUnavailable(true)
                }
            })
                
        }else{

            axios.get(url1)
            .then((obj1)=>{
    
                setLoading(false)
                setUnavailable(false)
    
                setNews([...obj1.data.articles.map((article:any)=>{
                    return {...article}
                    })
                ])
                
            })
            .catch((error)=>{
                console.log("Err in loop",n,error)
                if(n<=1){
                    getNews(n+1,s)
                }else{
                    setLoading(false)
                    setUnavailable(true)
                }
            })
        }
    }

    const setDummyData=():void=>{
        setLoading(false)
        setNews([...dummyJson.data,...dummyJson.data,...dummyJson.data])
    }

    document.body.onclick =(e):void=> {
        const t = e.target as HTMLElement
        const p = t.parentNode as HTMLElement
        p.className!=='search' && setShowSearchBar(false)
    }

    useEffect(()=>{
        console.log("length:",news.length)
    },[news])

    return (
        
        <context.Provider value={{ news, showSearchBar, setShowSearchBar, getNews, setDummyData, showDate, titleCount}}>
        
            <BrowserRouter>

                <Header/>

                { loading && <div className="loading"></div>}
                { unavailable && <Unavailable/>}{/*  */}
                
                <Routes>
                    <Route path={'/'} element={<HeadLine/>}></Route>
                    <Route path={'/category/:category'} element={<ArticleList/>}></Route>
                    <Route path={'/search/:search'} element={<ArticleList/>}></Route>
                </Routes>

                <footer>&copy;2024 DaisukeSK All Rights Reserved.</footer>

            </BrowserRouter>

        </context.Provider>
    )
}

export default App