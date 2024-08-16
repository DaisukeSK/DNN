import { useContext, useEffect } from "react"
import { context } from "../../App"
import Weather from "./Weather"
import TopStory from "./TopStory"
import PickUp from "./PickUp"
import Featured from "./Featured"
import HotNews from "./HotNews"
import Trending from "./Trending"
// import MoreToSee from "./MoreToSee"

// import axios from "axios"
import '../../CSS/HeadLine.css'

function HeadLine() {

    const { 
        getNews,
        // setDummyData
    } = useContext(context)

    useEffect(()=>{
        getNews(0,'')
        // setDummyData()

        window.scrollTo(0,0)
    },[])

    return (
        <>
            <TopStory/>
            <hr/>
            <Featured featured={true}/>
            <hr/>
            <PickUp/>
            <HotNews/>
            <Trending/>
            <hr/>
            {/* <hr/> */}
            <Featured/>
            <Weather/>
            {/* <hr/>
            <MoreToSee/> */}
        </>
    )
}

export default HeadLine