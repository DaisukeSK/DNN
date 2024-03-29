import { useContext, useState } from "react";
import { NewsCotext, NewsArticleType } from '../App'
import Thumbnail from "./svg/Thumbnail";
import List from "./svg/List";
import ListedArticle from "./Article/ListedArticle";
import ThumbnailedArticle from "./Article/ThumbnailedArticle";
import ScienceSVG from "./svg/categories/ScienceSVG";
import SportsSVG from "./svg/categories/SportsSVG";
import BusinessSVG from "./svg/categories/BusinessSVG";
import HealthSVG from "./svg/categories/HealthSVG";
import EntertainmentSVG from "./svg/categories/EntertainmentSVG";
import TechnologySVG from "./svg/categories/TechnologySVG";
import GeneralSVG from "./svg/categories/GeneralSVG";

function Categorized() {

    const { selectedCategory ,searchResult, news }=useContext(NewsCotext)
    
    const [displayList, setDisplayList] = useState<boolean>(true);
    
    const titleColor:string=
    selectedCategory=='General'?'OrangeRed':
    selectedCategory=='Business'?'navy':
    selectedCategory=='Technology'?'MediumSeaGreen':
    selectedCategory=='Entertainment'?'MediumVioletRed':
    selectedCategory=='Sports'?'LightSeaGreen':
    selectedCategory=='Science'?'GoldenRod':
    'RoyalBlue'

    const categorySVGs:{ [key: string]: JSX.Element } = {
        'General':<GeneralSVG color={titleColor}/>,
        'Business':<BusinessSVG color={titleColor}/>,
        'Technology':<TechnologySVG color={titleColor}/>,
        'Entertainment':<EntertainmentSVG color={titleColor}/>,
        'Sports':<SportsSVG color={titleColor}/>,
        'Science':<ScienceSVG color={titleColor}/>,
        'Health':<HealthSVG color={titleColor}/>,
    }

    return (

        <main className='categorized'>

            <div className="categoryTitle">
                {Object.keys(categorySVGs).map((category:string)=>
                    category==selectedCategory && categorySVGs[category]
                )}
                <h1 style={{color:titleColor}}>{selectedCategory}</h1>
                <div className="forBDbottom" style={{background: `linear-gradient(90deg, ${titleColor}, transparent)`}}></div>
            </div>

            <div className='formANDarticles'>

                <div className='switchDisplay'>

                    <div>Display:</div>

                    <div className='listDiv' style={{pointerEvents:displayList?'none':'auto'}} onClick={()=>setDisplayList(true)}>
                        <List fillColor={displayList?'#000000':'#aaaaaa'}/>
                    </div>
                    
                    <div className='thumbnailDiv' style={{pointerEvents:displayList?'auto':'none'}} onClick={()=>setDisplayList(false)}>
                        <Thumbnail fillColor={displayList?'#aaaaaa':'#000000'}/>
                    </div>

                    {searchResult[0] &&
                        <h3 className='searchResult'>{searchResult[1]>=10?'10+':searchResult[1]} article(s) found.</h3>
                    }
                </div>

                <hr/>
                
                <div className='articleContainer'>
                    {news?.map((dt:NewsArticleType, key:number) =>{
                        return displayList?
                        <ListedArticle key={key} article={dt}/>
                        :key<=8 && <ThumbnailedArticle key={key} article={dt}/>
                    })}
                </div>
                
            </div>

        </main>
    )
};

export default Categorized;