import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


import axios from 'axios';
import dummy from './temp.json'

import Header from './components/Header';



function App() {


  const rgba=(bgColor)=>{
    let str=''
    bgColor.split('').forEach(val=>{

          if(val=='b'){
            str=str+val+'a'
    
          }else if(val==')'){
            str=str+', 0.5'+val
    
          }else{
            str+=val
          }
        })
        return `linear-gradient(${bgColor}, ${str} 150px)`
  
  }

  const tagWidthChange=()=>{
    return window.innerWidth*0.86/7-5
  }
  
  const [news, setNews] = useState()
  const [searchTerm, setSearchTerm] = useState({keyword:[],from:'',to:'',category:'general',operator:'OR'})

  const [multiWord, setMultiWord] =useState(false)
  const [tempData, setTempData] =useState(dummy.dummy)
  const [tagWidth,setTagWidth]=useState(tagWidthChange())
  const [mainBG,setMainBG]=useState()
  const [searchResult, setSearchResult] = useState([false,0])

  const textRef=useRef()
  const orRef=useRef()
  const andRef=useRef()
  const fromRef=useRef()
  const toRef=useRef()


  const APIkey='5ff8585f9ec438acfacef3cea3ba6587'
  // const APIkey='63709e9a616b9fa345fdbc4b2f00325c'
  // const APIkey='7309621cf5facb77d5c1b0afe394ee1c'
  

  // const search='apple OR banana'
  // const category='health'
  // const lang='en'
  // const country='au'
  // const In='title'
  // const from='2020-10-22T05:59:52Z'
  // const to='2023-12-20T05:59:52Z'
  // const sortby='relevance'

  const search='example'
  const category='general'
  const lang='en'
  const country=''
  const In='title'
  const from=''
  const to=''
  const sortby='relevance'

  useEffect(()=>{
    
    setNews([...tempData])
    axios
    .get(
      `https://gnews.io/api/v4/top-headlines?apikey=${APIkey}&category=${searchTerm.category}&lang=${lang}&country=${country}
      
      `)
      .then((res) => {
        console.log("submit",res.data.articles[1].description)
        // console.log("API res",res.data.results)
        setNews([...res.data.articles])
      });

    setMainBG(rgba($('.general').css("background-color")))
    
  },[])

  const onchange=(e)=>{
    console.log("change",e.target.name)
    // console.log("Change",e.target.name,e.target.value)
    if(e.target.name=='keyword'){
      if(e.target.value==""){
        setSearchTerm((prev)=>({...prev,keyword:[]}))
        setMultiWord(false)
      }else{

      // console.log("length",e.target.value.split(" ")[0],e.target.value.split(" ")[1])
                let terms=[]
                e.target.value.split(" ").forEach((val,key)=>{
                  // console.log(key,val)
                  if(val){
                    terms.push(val)
                  }
                })
                if(e.target.value.split(" ")[0] && e.target.value.split(" ")[1]){
                  setMultiWord(true)
                }else{
                  setMultiWord(false)
                  // setSearchTerm((prev)=>({...prev,operator:null}))
                }
                  setSearchTerm((prev)=>({...prev,keyword:terms}))
      }
    }else if(e.target.name=='from'){
      setSearchTerm((prev)=>({...prev,from:e.target.value+'T00:00:00Z'}))
    }else if(e.target.name=='to'){
      setSearchTerm((prev)=>({...prev,to:e.target.value+'T00:00:00Z'}))
    }else if(e.target.name=='operator'){
      setSearchTerm((prev)=>({...prev,operator:e.target.value}))
    }
  }

  useEffect(()=>{
    // console.log(searchTerm)
    // console.log(searchTerm[6])
  },[searchTerm])

  // console.log("News",news)
  const submitHandler=(e)=>{
    console.log("Submitted")
    e.preventDefault()


    let query='';
    searchTerm.keyword.forEach((t,key)=>{
      console.log(key,t)
      if(key==0){
        query+=t
      }else{
        query+=` ${searchTerm.operator} ${t}`
      }
    })
    console.log(query)

    
    
    
    setNews([...tempData])
    axios
    .get(
      `https://gnews.io/api/v4/top-headlines?
      q=${query}&
      apikey=${APIkey}&
      category=${searchTerm.category}&
      lang=${lang}&
      country=${country}&
      in=${In}&
      from=${searchTerm.from}&
      to=${searchTerm.to}&
      sortby=${sortby}
      
      `)
      .then((res) => {
        console.log("submit",res.data.articles)
        // console.log("API res",res.data.results)
        setNews([...res.data.articles])
        setSearchResult([true,res.data.articles.length])
      });


  }

  const clickTag=(e)=>{

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
    setMainBG(rgba($(e.target).css("background-color")))
    setSearchTerm({keyword:[],from:'',to:'',category:e.target.className,operator:'OR'})

    textRef.current.value=''
    orRef.current.checked=true
    andRef.current.checked=false
    // orRef.current.disabled=true
    // andRef.current.disabled=true
    setMultiWord(false)
    toRef.current.value=''
    fromRef.current.value=''

    setSearchResult([false, 0])
    
    setNews([...tempData])
    axios
    .get(
      `https://gnews.io/api/v4/top-headlines?apikey=${APIkey}&category=${e.target.className}&lang=${lang}&country=${country}
      
      `)
      .then((res) => {
        console.log("submit",res)
        // console.log("API res",res.data.results)
        setNews([...res.data.articles])
      });

  
  }

  useEffect(()=>{

    // console.log(searchTerm)
  },[searchTerm])

  window.onresize=()=>{
    setTagWidth(tagWidthChange())
  }

  // console.log("jQuery",$("#root").css("width"))

  return (
    <>

    
<Header></Header>



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

  <form onInput={(e)=>onchange(e)} onSubmit={(e)=>submitHandler(e)}>
      {/* <select name="category">
          <option value="general">general</option>
          <option value="world">world</option>
          <option value="nation">nation</option>
          <option value="business">business</option>
          <option value="technology">technology</option>
          <option value="entertainment">entertainment</option>
          <option value="sports">sports</option>
          <option value="science">science</option>
          <option value="health">health</option>
      </select> */}

      <div className='formFlex'>


        <input name='keyword' type='text' placeholder=' Enter keyword.' ref={textRef}/>

        <div className='operatorDiv'>

        <div className='orDiv'>
      <input type="radio" name="operator" value="OR" disabled={!multiWord} defaultChecked ref={orRef}/>
      <label style={{color:multiWord?'black':'grey'}}>&nbsp;OR</label>

        </div>
        <div className='andDiv'>

        <input type="radio" name="operator" value="AND" disabled={!multiWord} ref={andRef}/>
        <label style={{color:multiWord?'black':'grey'}}>AND</label>

        </div>

        </div>

        <div className='fromDiv'>

        <label>From</label>
        <input name="from" type="date" ref={fromRef}/>
        </div>

        <div className='dash'></div>

        <div className='toDiv'>
        <label>To</label>
        <input name="to" type="date" ref={toRef}/>

        </div>
      </div>

        <input type="submit" value="&nbsp;&nbsp;&nbsp;&nbsp;Search"></input>
        {/* <div onClick={(e)=>submitHandler(e)}>Submit</div> */}

  </form>
  {searchResult[0] && <h3 className='searchResult'>{searchResult[1]>=10?'10+':searchResult[1]} articles found.</h3>}
  
      <div className='articleContainer'>

  {news?.map((dt, key) => {
    return (
      <article key={key}>
        
        <a href={dt.url} target='_blank'>

  <div className='date'>

        <img src='../../public/clock.svg'/><div>{dt.publishedAt.split("T")[0]}&nbsp;|&nbsp;{dt.source.name}</div>
  </div>
        <h2>{dt.title}</h2>
<div className='a_flex'>
        <p>{dt.content}</p>

        <img src={dt.image}/>
</div>

        </a>
      
      </article>
    );
  })}

      </div>

</div>

</main>


      
    </>
  )
}

export default App


