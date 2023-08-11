import PopUpThread from './PopUpThread'
import ThreadInput from './ThreadInput'
function PopUp({setOpenPopup,popupFeedThreads}) {
  console.log(popupFeedThreads)
  return (
    <div className="popup">
        <p className="close-popup"onClick={()=>setOpenPopup(false)}>X</p>
     
    {popupFeedThreads?.map(popupFeedThread=>
          
        <PopUpThread  key={popupFeedThread.id} popupFeedThread={popupFeedThread}/>
          
        
    )
    }
    
      
      <ThreadInput/>
    </div>
  )
}

export default PopUp