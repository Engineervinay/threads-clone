import PopUpThread from './PopUpThread'
import ThreadInput from './ThreadInput'
function PopUp({openPopup,setOpenPopup}) {
  
  return (
    <div className="popup">
        <p className="close-popup"onClick={()=>setOpenPopup(false)}>X</p>
      <PopUpThread/>
      <ThreadInput/>
    </div>
  )
}

export default PopUp