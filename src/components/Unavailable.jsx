import { useState, useEffect, useRef } from 'react'

import exclamation from '../../public/exclamation.png'

function Unavailable() {
  
  
  return (
    <div className='unavailable'>

          <div className='unavailableFlex'><img src={exclamation}/><h2>Sorry...</h2></div>
          <hr/>
          <p>Due to limitation of API usage, News App is temporarily unavailable.<br/>
          Please try again later. ( The limitation is reset every 00:00 UTC.)
          </p>
        </div>
  )
}

export default Unavailable


