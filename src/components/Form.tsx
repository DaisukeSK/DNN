import { useContext } from 'react';
import { NewsCotext } from '../App';

function Form() {

  const {lang,textRef,orRef,andRef,fromRef,toRef,setSearchTerm,searchTerm,setMultiWord,multiWord,runAxios,setDummyArticles} = useContext(NewsCotext);
  
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
    let query='';
    searchTerm.keyword.forEach((t:string, key:number):void =>{
      key==0? query+=t : query+=` ${searchTerm.operator} ${t}`;
    });
    
    setDummyArticles(true,5);
    runAxios(0, searchTerm.category, lang, query, searchTerm.from, searchTerm.to, true);
  };

  // useEffect(()=>{
  //   console.log("multiWord",searchTerm.keyword.length,multiWord)
  // },[searchTerm])

  return (
    <form onInput={(e)=>onchange(e)} onSubmit={(e)=>submitHandler(e)}>

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

    </form>
  )
};

export default Form;