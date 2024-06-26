import { useContext, useRef, RefObject } from "react";
import { NewsCotext } from '../App'
import DNN from '../../public/dnn.png'

function Header() {

    const { runAxios, setDetailedSearch, setSelectedCategory, setHeadLine } = useContext(NewsCotext)

    const H_textRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null)

    const searchArticle = (e:React.FormEvent<HTMLFormElement>):void=>{
        e.preventDefault()
        let query = '';
        H_textRef.current!.value.split(" ").forEach((t:string, key:number):void =>{
            key==0? query+=t : query+=` OR ${t}`;
        });
        runAxios(0, 'search', 'en', `"${H_textRef.current!.value}"`, '', '', true);
        setSelectedCategory('')
    }

    const clickTag=(e:React.MouseEvent<HTMLDivElement>):void =>{
        const Target = e.target as HTMLDivElement;
        runAxios(0, Target.className, 'en', '', '', '', false);
    };

    return (
        <header>

            <img
                className='logo'
                src={DNN}
                onClick={()=>{
                    setHeadLine(true)
                    window.scrollTo(0,0)
                }}
            />
            
            <div className='tagFlex'>
                {[
                "general",
                "business",
                "technology",
                "entertainment",
                "sports",
                "science",
                "health"
                ].map((tag:string, key:number) =>{
                return (
                    <div
                        key={key}
                        className={tag}
                        onClick={(e)=>clickTag(e)}
                    >
                        {tag.split('').map((t:string, key:number):string =>{
                            return key==0? t.toUpperCase():t
                        })}
                    </div>
                    )
                })}
            </div>

            <form onSubmit={(e)=>searchArticle(e)}>
                <input type='text' ref = {H_textRef} required placeholder = 'Enter a keyword.'/>
                <input type='submit' value=''/>
                <div onClick={()=>setDetailedSearch(true)}>&gt;&gt;<span>Furthur Search</span></div>
            </form>

        </header>
    )
};

export default Header;