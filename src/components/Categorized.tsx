import { useContext } from "react";
import { NewsCotext, NewsArticle } from '../App'
import Thumbnail from "./svg/Thumbnail";
import List from "./svg/List";
import ListedArticle from "./Article/ListedArticle";
import ThumbnailedArticle from "./Article/ThumbnailedArticle";
import Unavailable from "./Unavailable";

function Categorized() {

  const {selectedCategory,APIunavailable,setDisplayList,displayList,searchResult,news}=useContext(NewsCotext)

  return (

    <main className='categorized'>

      <h1>{selectedCategory}</h1>
      
      <div className='formANDarticles'>

        {/* {APIunavailable && <Unavailable/>} */}

        {!APIunavailable &&
          <>
            <div className='switchDisplay'>
              <div>Display:</div>
              <div className='listDiv' onClick={()=>setDisplayList(true)}><List/></div>
              <div className='thumbnailDiv' onClick={()=>setDisplayList(false)}><Thumbnail/></div>
              {searchResult[0] &&
                <h3 className='searchResult'>{searchResult[1]>=10?'10+':searchResult[1]} article(s) found.</h3>
              }
            </div>

            <hr/>
            
            <div className='articleContainer'>
              {news?.map((dt:NewsArticle, key:number) =>{
                return displayList?
                <ListedArticle key={key} article={dt}/>
                :key<=8 && <ThumbnailedArticle key={key} article={dt}/>
              })}
            </div>
          </>
        }

      </div>

    </main>
  )
};

export default Categorized;