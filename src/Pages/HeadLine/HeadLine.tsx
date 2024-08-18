import { useContext, useEffect } from "react"
import { context } from "../../App"
import Weather from "./Weather"
import TopStory from "./TopStory"
import PickUp from "./PickUp"
import Featured from "./Featured"
import HotNews from "./HotNews"
import Trending from "./Trending"

function HeadLine() {

    const { getNews, news } = useContext(context)

    useEffect(()=>{
        getNews(0,'')
        window.scrollTo(0,0)
    },[])

    return news.length!==0 && (
        <>
            <TopStory/>
            <hr/>
            <Featured featured={true}/>
            <hr/>
            <PickUp/>
            <HotNews/>
            <Trending/>
            <hr/>
            <Featured/>
            <Weather/>
        </>
    )
}

export default HeadLine