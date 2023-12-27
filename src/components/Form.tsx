import { useContext, useEffect } from 'react'
import { NewsCotext } from '../App'



function Form() {

  const {lang,textRef,orRef,andRef,fromRef,toRef,setSearchTerm,searchTerm,setMultiWord,multiWord,runAxios,setDummyArticles} =useContext(NewsCotext)
  
  

  const onchange=(e:React.FormEvent<HTMLFormElement>):void=>{

    const Event=e.target as HTMLFormElement
    console.log("change",Event.name)
    // console.log("Change",e.target.name,e.target.value)
    if(Event.name=='keyword'){
      if(Event.value==""){
        // setSearchTerm((prev:SearchTerm)=>({...prev,keyword:[]}))
        setSearchTerm({...searchTerm,keyword:[]})
        setMultiWord(false)
      }else{

      // console.log("length",e.target.value.split(" ")[0],e.target.value.split(" ")[1])
                let terms:string[]=[]
                Event.value.split(" ").forEach((val:string)=>{
                  // console.log(key,val)
                  if(val){
                    terms.push(val)
                  }
                })
                if(Event.value.split(" ")[0] && Event.value.split(" ")[1]){
                  setMultiWord(true)
                }else{
                  setMultiWord(false)
                  // setSearchTerm((prev)=>({...prev,operator:null}))
                }
                  setSearchTerm({...searchTerm,keyword:terms})
      }
    }else if(Event.name=='from'){
      setSearchTerm({...searchTerm,from:Event.value+'T00:00:00Z'})
    }else if(Event.name=='to'){
      setSearchTerm({...searchTerm,to:Event.value+'T00:00:00Z'})
    }else if(Event.name=='operator'){
      setSearchTerm({...searchTerm,operator:Event.value})
    }
  }

  const submitHandler=(e:React.FormEvent<HTMLFormElement>):void=>{
    // console.log("Submitted")
    e.preventDefault()


    let query='';
    searchTerm.keyword.forEach((t:string,key:number)=>{
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

  useEffect(()=>{
    // console.log("ST",searchTerm)
  },[searchTerm])
  
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


