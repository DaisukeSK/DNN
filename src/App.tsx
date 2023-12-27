import { useState, useEffect, useRef, createContext, RefObject } from 'react';
import axios from 'axios';
import dummy from './temp.json';
import Header from './components/Header';
import Article from './components/Article';
import Form from './components/Form';
import Unavailable from './components/Unavailable';
// import altImg from '../public/altImg.png';
// import clockImg from '../public/clock.svg';

export type NewsArticle={
  content:string,
  description:string,
  image:string,
  publishedAt:string,
  source:{name:string,url:string},
  title:string,
  url:string

}

export type SearchTerm ={
  keyword:string[],from:string,to:string,category:string,operator:string

}

type NewsContextValues={
  lang:string,
  textRef:RefObject<HTMLInputElement>,
  orRef:RefObject<HTMLInputElement>,
  andRef:RefObject<HTMLInputElement>,
  fromRef:RefObject<HTMLInputElement>,
  toRef:RefObject<HTMLInputElement>,
  setSearchTerm:(state:SearchTerm)=>void,
  searchTerm:SearchTerm,
  setMultiWord:(state:boolean)=>void,
  multiWord:boolean,
  runAxios:(number:number,category:string,lang:string,q:string,from:string,to:string,search:boolean)=>void,
  setDummyArticles:any
}


export const NewsCotext=createContext<NewsContextValues>({} as NewsContextValues)

function App() {

  const rgba=(bgColor:string):string=> {
    let str=''
    bgColor.split('').forEach(c=>{

          c=='b'?str=str+c+'a':
          c==')'?str=str+', 0.5'+c:
          str+=c

        })
        return `linear-gradient(${bgColor}, ${str} 150px)`
  
  }

  const tagWidthChange=():number=>{
    return window.innerWidth*0.86/7-7
  }


  
  const [news, setNews] = useState<Array<NewsArticle>>()
  const [searchTerm, setSearchTerm] = useState<SearchTerm>({keyword:[],from:'',to:'',category:'general',operator:'OR'})

  const [multiWord, setMultiWord] =useState<boolean>(false)
  const [tempData, setTempData] =useState(dummy.dummy)
  const [tagWidth,setTagWidth]=useState<number>(tagWidthChange())
  const [mainBG,setMainBG]=useState<string>()
  const [searchResult, setSearchResult] = useState<[boolean,number]>([false,0])
  const [APIunavailable, setAPIunavailable] = useState<boolean>(false)



  const textRef=useRef<HTMLInputElement>(null)
  const orRef=useRef<HTMLInputElement>(null)
  const andRef=useRef<HTMLInputElement>(null)
  const fromRef=useRef<HTMLInputElement>(null)
  const toRef=useRef<HTMLInputElement>(null)


  // const APIkey=import.meta.env.VITE_APIkey_2
  // const APIkey2=import.meta.env.VITE_APIkey_2
  // const APIkey3=import.meta.env.VITE_APIkey_3

  const APIkeys=[
    import.meta.env.VITE_APIkey_1,
    import.meta.env.VITE_APIkey_2,
    import.meta.env.VITE_APIkey_3

  ]
  // const APIkey='63709e9a616b9fa345fdbc4b2f00325c'
  // const APIkey='7309621cf5facb77d5c1b0afe394ee1c'
  // const APIkey=process.env.APIkey1
  

  // const search='apple OR banana'
  // const category='health'
  // const lang='en'
  // const country='au'
  // const In='title'
  // const from='2020-10-22T05:59:52Z'
  // const to='2023-12-20T05:59:52Z'
  // const sortby='relevance'

  // const search='example'
  // const category='general'
  const lang:string='en'
  // const country=''
  // const In='title'
  // const from=''
  // const to=''
  // const sortby='relevance'
  
  const runAxios=(number:number,category:string,lang:string,q:string,from:string,to:string,search:boolean):void=>{
    axios
  .get(`https://gnews.io/api/v4/top-headlines?apikey=${APIkeys[number]}&category=${category}&lang=${lang}&q=${q}&from=${from}&to=${to}`)
    .then((res) => {
      console.log("API working in loop",number)
      // console.log("res",res.data.articles)
      // if(search){
      //   setSearchResult([true,res.data.articles.length])
      // }else{
      //   setSearchResult([false,0])
      // }
      search? setSearchResult([true,res.data.articles.length]) : setSearchResult([false,0]);
      setNews([...res.data.articles])
      setAPIunavailable(false)
    })
    .catch((e)=>{

      console.log("ERR in number",number)
      console.log("ERR",e)
      // if(number<2){

      //   runAxios(number+1,category,lang,q,from,to,search)
      // }else{
      //   setAPIunavailable(true)
      // }
      number<2? runAxios(number+1,category,lang,q,from,to,search) : setAPIunavailable(true)

    });
  }

  const setDummyArticles=(boolean:boolean,number:number)=>{
    setNews([...tempData])
    setSearchResult([boolean,number])
    console.log(boolean,number)
  }

  useEffect(()=>{
    
    // setNews([...tempData])
    setDummyArticles(false,0)

    // axios
    // .get(
    //   `https://gnews.io/api/v4/top-headlines?
    //   apikey=${APIkey}&
    //   category=${searchTerm.category}&
    //   lang=${lang}&
      
    //   q=${query}&
    //   from=${searchTerm.from}&
    //   to=${searchTerm.to}
      
      
    //   `)


    
    // axios
    // .get(
    //   `https://gnews.io/api/v4/top-headlines?
    //     apikey=${APIkeys[0]}&
    //     category=${searchTerm.category}&
    //     lang=${lang}&

    //       q=${''}&
    //   from=${''}&
    //   to=${''}

    
    // `)
    //   .then((res) => {
    //     // console.log("submit",res.data.articles[1].description)
    //     console.log("API res",res.data.articles[1].content)
    //     setNews([...res.data.articles])
    //   })

    // .catch((e)=>{
      
      //   console.log("ERR",e)
      // });
      
      
      runAxios(0,searchTerm.category,lang,'','','',false)

    setMainBG(rgba($('.general').css("background-color")))
    
  },[])

  // const onchange=(e)=>{
  //   console.log("change",e.target.name)
  //   // console.log("Change",e.target.name,e.target.value)
  //   if(e.target.name=='keyword'){
  //     if(e.target.value==""){
  //       setSearchTerm((prev)=>({...prev,keyword:[]}))
  //       setMultiWord(false)
  //     }else{

  //     // console.log("length",e.target.value.split(" ")[0],e.target.value.split(" ")[1])
  //               let terms=[]
  //               e.target.value.split(" ").forEach((val,key)=>{
  //                 // console.log(key,val)
  //                 if(val){
  //                   terms.push(val)
  //                 }
  //               })
  //               if(e.target.value.split(" ")[0] && e.target.value.split(" ")[1]){
  //                 setMultiWord(true)
  //               }else{
  //                 setMultiWord(false)
  //                 // setSearchTerm((prev)=>({...prev,operator:null}))
  //               }
  //                 setSearchTerm((prev)=>({...prev,keyword:terms}))
  //     }
  //   }else if(e.target.name=='from'){
  //     setSearchTerm((prev)=>({...prev,from:e.target.value+'T00:00:00Z'}))
  //   }else if(e.target.name=='to'){
  //     setSearchTerm((prev)=>({...prev,to:e.target.value+'T00:00:00Z'}))
  //   }else if(e.target.name=='operator'){
  //     setSearchTerm((prev)=>({...prev,operator:e.target.value}))
  //   }
  // }

  

  // console.log("News",news)



  // const submitHandler=(e)=>{
  //   // console.log("Submitted")
  //   e.preventDefault()


  //   let query='';
  //   searchTerm.keyword.forEach((t,key)=>{
  //     // console.log(key,t)
  //     // if(key==0){
  //     //   query+=t
  //     // }else{
  //     //   query+=` ${searchTerm.operator} ${t}`
  //     // }
  //     key==0? query+=t : query+=` ${searchTerm.operator} ${t}`
  //   })
  //   console.log("query",query)

    
  //   setDummyArticles(true,5)

    
  //   // setNews([...tempData])
  //   // setSearchResult([true,7])



  //   // axios
  //   // .get(
  //   //   `https://gnews.io/api/v4/top-headlines?
  //   //   apikey=${APIkeys[0]}&
  //   //   category=${searchTerm.category}&
  //   //   lang=${lang}&
      
  //   //   q=${query}&
  //   //   from=${searchTerm.from}&
  //   //   to=${searchTerm.to}
      
      
  //   //   `)
  //   //   .then((res) => {
  //   //     console.log("submit",res.data.articles)
  //   //     // console.log("API res",res.data.results)
  //   //     setNews([...res.data.articles])
  //   //     setSearchResult([true,res.data.articles.length])
  //   //   });

  //     runAxios(0,searchTerm.category,lang,query,searchTerm.from,searchTerm.to,true)
  // }

  
  const clickTag=(e:React.MouseEvent<HTMLDivElement>):void=>{

    // console.log("clicked", $(e.target).css("background-color"))
    
    // let rgba=''
    // $(e.target).css("background-color").split('').forEach((val,key)=>{
    //   console.log(val)
    //   if(val=='b'){
    //     rgba=rgba+val+'a'

    //   }else if(val==')'){
    //     rgba=rgba+', 0.5'+val

    //   }else{
    //     rgba+=val
    //   }
    // })
    // console.log('rgba',rgba)

    // setMainBG($(e.target).css("background-color"))
    // setMainBG(`linear-gradient(${$(e.target).css("background-color")}, ${rgba} 100px)`)

    const Event=e.target as HTMLDivElement

    setMainBG(rgba($(e.target).css("background-color")))
    setSearchTerm({keyword:[],from:'',to:'',category:Event.className,operator:'OR'})

    textRef.current!.value=''
    orRef.current!.checked=true
    andRef.current!.checked=false
    // orRef.current.disabled=true
    // andRef.current.disabled=true
    setMultiWord(false)
    toRef.current!.value=''
    fromRef.current!.value=''

    setDummyArticles(false, 0)
    // setSearchResult([false, 0])
    
    // setNews([...tempData])

  //   axios
  //   .get(
  //     `https://gnews.io/api/v4/top-headlines?
  //     apikey=${APIkeys[1]}&
  //     category=${e.target.className}&
  //     lang=${lang}&

  //     q=${''}&
  // from=${''}&
  // to=${''}
      
  //     `)
  //     .then((res) => {
  //       console.log("submit",res)
  //       // console.log("API res",res.data.results)
  //       setNews([...res.data.articles])
  //     });

      runAxios(0,Event.className,lang,'','','',false)
  }

  

  window.onresize=()=>{
    setTagWidth(tagWidthChange())
  }

  // console.log("jQuery",$("#root").css("width"))


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
].map((tag,key)=>{
    return (
    <div
      key={key}
      className={tag}
      style={{width:`${tagWidth}px`}}
      onClick={(e)=>clickTag(e)}
    >
      
      {/* {tag.toUpperCase()} */}
      {tag.split('').map((t,key)=>{
        return key==0?t.toUpperCase():t
      })}
    </div>
      )
  })}
  {/* <div className="general" style={{width:`${tagWidth}px`}} onClick={(e)=>clickTag(e)}>general</div>
  <div className="world" style={{width:`${tagWidth}px`}} onClick={(e)=>clickTag(e)}>world</div>
  <div className="nation" style={{width:`${tagWidth}px`}} onClick={(e)=>clickTag(e)}>nation</div>
  <div className="business" style={{width:`${tagWidth}px`}} onClick={(e)=>clickTag(e)}>business</div>
  <div className="technology" style={{width:`${tagWidth}px`}} onClick={(e)=>clickTag(e)}>technology</div>
  <div className="entertainment" style={{width:`${tagWidth}px`}} onClick={(e)=>clickTag(e)}>entertainment</div>
  <div className="sports" style={{width:`${tagWidth}px`}} onClick={(e)=>clickTag(e)}>sports</div>
  <div className="science" style={{width:`${tagWidth}px`}} onClick={(e)=>clickTag(e)}>science</div>
  <div className="health" style={{width:`${tagWidth}px`}} onClick={(e)=>clickTag(e)}>health</div> */}

</div>


<div className='formANDarticles' style={{background:mainBG}}>
{/* <div className='formANDarticles' style={{outline:`50px solid ${mainBG}`}}> */}

{/* <div style={{position:'absolute', top:0,left:0}}>{APIkey}</div> */}

{APIunavailable &&
        <Unavailable/>
        }
{!APIunavailable &&

<Form/>
  // <form onInput={(e)=>onchange(e)} onSubmit={(e)=>submitHandler(e)}>
  //     {/* <select name="category">
  //         <option value="general">general</option>
  //         <option value="world">world</option>
  //         <option value="nation">nation</option>
  //         <option value="business">business</option>
  //         <option value="technology">technology</option>
  //         <option value="entertainment">entertainment</option>
  //         <option value="sports">sports</option>
  //         <option value="science">science</option>
  //         <option value="health">health</option>
  //     </select> */}

  //     <div className='formFlex'>


  //       <input name='keyword' type='text' placeholder=' Enter keyword.' ref={textRef}/>

  //       <div className='operatorDiv'>

  //       <div className='orDiv'>
  //     <input type="radio" name="operator" value="OR" disabled={!multiWord} defaultChecked ref={orRef}/>
  //     <label style={{color:multiWord?'black':'grey'}}>&nbsp;OR</label>

  //       </div>
  //       <div className='andDiv'>

  //       <input type="radio" name="operator" value="AND" disabled={!multiWord} ref={andRef}/>
  //       <label style={{color:multiWord?'black':'grey'}}>AND</label>

  //       </div>

  //       </div>

  //       <div className='fromDiv'>

  //       <label>From</label>
  //       <input name="from" type="date" ref={fromRef}/>
  //       </div>

  //       <div className='dash'></div>

  //       <div className='toDiv'>
  //       <label>To</label>
  //       <input name="to" type="date" ref={toRef}/>

  //       </div>
  //     </div>

  //       <input type="submit" value="&nbsp;&nbsp;&nbsp;&nbsp;Search"></input>
  //       {/* <div onClick={(e)=>submitHandler(e)}>Submit</div> */}

  // </form>
        
        }
  {!APIunavailable && searchResult[0] && <h3 className='searchResult'>{searchResult[1]>=10?'10+':searchResult[1]} article(s) found.</h3>}
  
      <div className='articleContainer'>

        

  {!APIunavailable && news?.map((dt:NewsArticle, key:number) => {
    return (
      <Article key={key} article={dt}/>
//       <article key={key}>
        
//         <a href={dt.url} target='_blank'>

//   <div className='date'>

//         <img src={clockImg}/><div>{dt.publishedAt.split("T")[0]}&nbsp;|&nbsp;{dt.source.name}</div>
//   </div>
//         <h2>{dt.title}</h2>
// <div className='a_flex'>
// <div className='pContainer'>
// {/* <p>{dt.content}</p> */}
// {/* <p>{dt.content.split(`... [${/[0-9]{1,4}/} chars]`)[0]}</p> */}
// {/* <p>{dt.content.split(/\.\.\.\s\[\d{1,4}\s/)[0]}</p> */}
// <p>{dt.content.split(/...\s\[\d{1,4}\schars]/)[0]+'...'}</p>
// {/* <p>{dt.content}</p> */}

//   <div className='readMore'><span>Read more [External website]</span></div>
// </div>

//         <img src={dt.image} onError=
// {(e)=>{$(e.target).attr('src',altImg)}}/>

// {/* <img src={altImg}/> */}

// </div>

//         </a>
      
//       </article>
    );
  })}

      </div>

</div>

</main>


      
    </NewsCotext.Provider>
  )
}

export default App


