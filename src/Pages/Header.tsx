import { useState, useRef, useContext, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { context } from '../App'
import DNN from '../../public/dnn.png'
import Search from '../../public/search.svg'
import Github from '../SVG/Github'
import LinkedIn from '../SVG/LinkedIn'
import Home from '../SVG/Home'

import { StyledHeader, Aside } from '../Styled Components'
import hamburger from '../../public/hamburgerMenu.svg'
import arrow from '../../public/arrow.svg'

function Header() {

    const inputRef_laptop = useRef<HTMLInputElement>(null)
    const inputRef_mobile = useRef<HTMLInputElement>(null)
    const [mouseOver, setMouseOver] = useState<boolean>(false)
    const [showAside, setShowAside] = useState<boolean>(false)

    const { showSearchBar, setShowSearchBar } = useContext(context)
    
    const navigate = useNavigate();

    const location = useLocation();

    useEffect(()=>{

        setShowAside(false)

    },[location])

    return (
        <>
            <StyledHeader onMouseEnter={()=>setMouseOver(true)} mouseover={mouseOver?1:0}>

                <div className='hamburger' onClick={()=>setShowAside(true)}>
                    <img src={hamburger}/>
                </div>

                <Aside show={showAside?1:0}>
                    <img src={arrow} onClick={()=>setShowAside(false)}/>
                    <hr/>

                    <div className='search_mobile'>
                        <input type='text' ref={inputRef_mobile}/>
                        <input type='submit' onClick={()=>inputRef_mobile.current?.value && navigate(`/search/${inputRef_mobile.current?.value}`)} value=''/>
                    </div>

                    <ul>
                        {['Business','Sports','Entertainment','Technology','Science','Health'].map((tab:string,key:number)=>{
                        return (
                            <li key={key}>
                                <Link to={`/category/${tab.toLowerCase()}`}>
                                    {tab}
                                </Link>
                            </li>
                        )})}
                    </ul>
                </Aside>


                <div className='search'>
                    {showSearchBar? 
                        <>
                            <input type='text' ref={inputRef_laptop}/>
                            <input type='submit' onClick={()=>inputRef_laptop.current?.value && navigate(`/search/${inputRef_laptop.current?.value}`)} value=''/>
                        </>
                        :
                        <div className='glass' onClick={()=>setShowSearchBar(true)}>
                            <img src={Search}/>
                            <div>Search</div>
                        </div>
                    }
                </div>

                <Link to={'/'} className='logo' onClick={()=>window.scrollTo(0,0)}>
                    <img src={DNN}/>
                </Link>

                <div className='links'>
                    <a href='https://portfolio-daisuke.vercel.app' target='_blank'><Home/></a>
                    <a href='https://github.com/DaisukeSK' target='_blank'><Github/></a>
                    <a href='https://www.linkedin.com/in/daisuke-seki-670202261' target='_blank'><LinkedIn/></a>
                </div>
                
            </StyledHeader>

            <nav
                onMouseEnter={()=>setMouseOver(true)}
                onMouseLeave={()=>setMouseOver(false)}
                style={{top:mouseOver?'70px':0}}
            >

                {['Business','Sports','Entertainment','Technology','Science','Health'].map((tab:string,key:number)=>{
                    return (
                        <Link
                            to={`/category/${tab.toLowerCase()}`}
                            key={key}
                        >
                            {tab}
                            <div></div>
                        </Link>
                )})}

            </nav>
        </>
    )
}

export default Header