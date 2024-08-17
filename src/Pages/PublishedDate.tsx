import calendar from '../../public/calendar.svg'

function PublishedDate(props:{date:string}) {

    const showDate=(d:string)=>{
        const date=new Date(d)
        const current=new Date()
        let returnStr:string

        switch(true){
            case date.getDate()==current.getDate():
                const unit=current.getHours()-date.getHours()>=2?'Hours Ago':'Hour Ago'
                returnStr=`${current.getHours()-date.getHours()} ${unit}`
                break;
            default:
                returnStr=`${date.toLocaleString('default', {month:'long'})} ${date.getDate()}`
        }
        
        return returnStr
    }

    return (
        
        <div className="publishedDate">
            <img src={calendar}/>
            {showDate(props.date)}
        </div>
    )
}

export default PublishedDate