import { useState, useEffect, useRef, useContext } from 'react'
import { NewsCotext } from '../App'



function Form() {

  const {lang,textRef,orRef,andRef,fromRef,toRef,setSearchTerm,searchTerm,setMultiWord,multiWord,runAxios,setDummyArticles} =useContext(NewsCotext)
  

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

  const submitHandler=(e)=>{
    // console.log("Submitted")
    e.preventDefault()


    let query='';
    searchTerm.keyword.forEach((t,key)=>{
      // console.log(key,t)
      // if(key==0){
      //   query+=t
      // }else{
      //   query+=` ${searchTerm.operator} ${t}`
      // }
      key==0? query+=t : query+=` ${searchTerm.operator} ${t}`
    })
    console.log("query",query)

    
    setDummyArticles(true,5)

    
    // setNews([...tempData])
    // setSearchResult([true,7])



    // axios
    // .get(
    //   `https://gnews.io/api/v4/top-headlines?
    //   apikey=${APIkeys[0]}&
    //   category=${searchTerm.category}&
    //   lang=${lang}&
      
    //   q=${query}&
    //   from=${searchTerm.from}&
    //   to=${searchTerm.to}
      
      
    //   `)
    //   .then((res) => {
    //     console.log("submit",res.data.articles)
    //     // console.log("API res",res.data.results)
    //     setNews([...res.data.articles])
    //     setSearchResult([true,res.data.articles.length])
    //   });

      runAxios(0,searchTerm.category,lang,query,searchTerm.from,searchTerm.to,true)
  }
  
  return (
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
  )
}

export default Form


