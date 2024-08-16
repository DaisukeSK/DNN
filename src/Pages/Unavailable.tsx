import exclamation from '../../public/exclamation.png'

function Unavailable() {

    return (
        
        <section className="unavailable">

            <div className='unavailableFlex'>
                <img src = {exclamation}/>
                <h2>Sorry...</h2>
            </div>
            <hr/>
            <p>
                Due to limitation of API usage, DNN is temporarily unavailable.<br/>
                Please try again later. ( The limitation is reset every 00:00 UTC.)
            </p>
            
        </section>
    )
}

export default Unavailable