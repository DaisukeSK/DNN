import { useContext, useRef } from 'react';
import { NewsCotext } from '../App';

function Form() {

  const {textRef,orRef,andRef,fromRef,toRef,setSearchTerm,searchTerm,setMultiWord,multiWord,runAxios,setDummyArticles,setDetailedSearch,setHeadLine} = useContext(NewsCotext);
  
  const selectRef:any=useRef(null)
  const langRef:any=useRef(null)
  const formRef:any=useRef(null)

  const onchange=(e:React.FormEvent<HTMLFormElement>):void =>{
    const Event=e.target as HTMLFormElement;

    switch(Event.name){
      case 'from':
        setSearchTerm({...searchTerm, from: Event.value+'T00:00:00Z'});
        break;

      case 'to':
        setSearchTerm({...searchTerm, to: Event.value+'T00:00:00Z'});
        break;

      case 'operator':
        setSearchTerm({...searchTerm, operator: Event.value});
        break;

      case 'keyword':
        let terms:string[]=[];
        Event.value.split(" ").forEach((str:string):void =>{
          str && terms.push(str);
        });
        terms.length>1? setMultiWord(true):setMultiWord(false);
        setSearchTerm({...searchTerm, keyword: terms});
    };
  };

  const submitHandler=(e:React.FormEvent<HTMLFormElement>):void =>{

    e.preventDefault();
    setHeadLine(false);
    let query='';

    searchTerm.keyword.forEach((t:string, key:number):void =>{
      key==0? query+=t : query+=` ${searchTerm.operator} ${t}`;
    });
    
    setDummyArticles(true,5);
    setDetailedSearch(false);

    console.log("text",textRef.current!.value)
    console.log("lang",langRef.current.value)
    console.log("selectRef",selectRef.current.value)
    runAxios(0, selectRef.current.value, langRef.current.value, query, searchTerm.from, searchTerm.to, true);
    
    setSearchTerm({
      keyword: [],
      from: '',
      to: '',
      category: 'general',
      operator: 'OR'
    })
  };
  
  return (
    <>
      <div className='coverPageBG'></div>

      <form className='detailedSearch' onInput={(e)=>onchange(e)} onSubmit={(e)=>submitHandler(e)} ref={formRef}>
        <div
          className='x'
          onClick={()=>{
          setDetailedSearch(false)
          setSearchTerm({
            keyword: [],
            from: '',
            to: '',
            category: 'general',
            operator: 'OR'
          })}}
        >
          <svg width='10' height='10'>
            <path strokeWidth='2' d='m0,0 l10,10'/>
            <path strokeWidth='2' d='m10,0 l-10,10'/>

          </svg>
        </div>

        <div className="keyword">

          <input name='keyword' type='text' placeholder=' Enter keyword.' ref={textRef}/>

          <div className='operatorDiv'>

            <div className="or">
              <input type="radio" name="operator" value="OR" disabled={!multiWord} defaultChecked ref={orRef}/>
              <label style={{color:multiWord?'black':'grey'}}>&nbsp;OR</label>

            </div>

            <div className="and">
              <input type="radio" name="operator" value="AND" disabled={!multiWord} ref={andRef}/>
              <label style={{color:multiWord?'black':'grey'}}>AND</label>


            </div>
            
          </div>

        </div>
        <div className='categoryAndLang'>


          <label>Category:&nbsp;</label>
          <select name='category' ref={selectRef}>

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
                <option
                  key={key}
                  value={tag}
                >
                  {tag.split('').map((t:string, key:number):string=>{
                    return key==0? t.toUpperCase():t
                  })}
                </option>
                )
              })}

          </select>
          <label>Language:&nbsp;</label>
          <select name='lang' ref={langRef}>
            <option value='en'>English</option>
            <option value='ja'>Japanese</option>
            <option value='zh'>Chinese</option>
            <option value='nl'>Dutch</option>
            <option value='fr'>French</option>

            <option value='ar'>Arabic</option>
            <option value='de'>German</option>
            <option value='el'>Greek</option>
            <option value='he'>Hebrew</option>
            <option value='hi'>Hindi</option>
            <option value='it'>Italian</option>
            <option value='ml'>Malayalam</option>
            <option value='mr'>Marathi</option>
            <option value='no'>Norwegian</option>
            <option value='pt'>Portuguese</option>

            <option value='ro'>Romanian</option>
            <option value='ru'>Russian</option>
            <option value='es'>Spanish</option>
            <option value='sv'>Swedish</option>
            <option value='ta'>Tamil</option>
            <option value='te'>Telugu</option>
            <option value='uk'>Ukrainian</option>
          </select>
        </div>



        <div className='dateRange'>
          <label>From:&nbsp;</label>
          <input name="from" type="date" ref={fromRef}/>
          <div className='dash'>-</div>
          <label>To:&nbsp;</label>
          <input name="to" type="date" ref={toRef}/>
        </div>

        <hr/>

        <input type="submit" value="&nbsp;&nbsp;&nbsp;&nbsp;Search"></input>

      </form>
    </>
  )
};

export default Form;