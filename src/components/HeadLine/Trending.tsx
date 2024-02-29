function Trending(props:{number:number,news:any}){
    return (

        <article>

            <div className='rank' id={`id${props.number}`}>{props.number}</div>

            <a className='imgA' href={props.news.url} target='_blank'>
                <div className="whiteBG"></div>
                <img src={props.news.image}/>
            </a>

            <a className='titleA' href={props.news.url} target='_blank'>
                <div>{props.news.title}</div>
            </a>

        </article>
    )
}

export default Trending;