import { useState,useEffect } from 'react'
import Nav from './component/Nav'
import Header from './component/Header'
import Feed from './component/Feed'
import PopUp from './component/PopUp'
import './App.css';
import WriteIcon from './component/WriteIcon'
function App() {
  const[user,setUser]=useState(null)
  const[threads,setThreads]=useState(null)
  const[viewThreadsFeed,setViewThreadsFeed]=useState(true)
  const[filteredThreads,setFilteredThreads]=useState(null)
  const[openPopup,setOpenPopup]=useState(false)
  const userId="e626d981-4318-4188-a640-09dbd13e3241";
  const getUser=async()=>{
    try{
      const response=await fetch(`http://localhost:3000/users?user_uuid=${userId}`);
      const data=await response.json()
      setUser(data[0])
    }catch(error){
      console.error(error)
    }
  }
  const getThreads=async()=>{
    try{
      const response=await fetch(`http://localhost:3000/threads?thread_from=${userId}`)
      const data=await response.json()
      setThreads(data)
    }catch(error){
      console.error(error)
    }
  }
  const getThreadsFeed=()=>{
    if(viewThreadsFeed){
      const ownthreads=threads?.filter(thread =>thread.reply_to === null)
      setFilteredThreads(ownthreads)
    }
    if(!viewThreadsFeed){
      const replyThreads=threads?.filter(thread => thread.reply_to !== null)
      setFilteredThreads(replyThreads)
    }
  }
  useEffect(()=>{
    getUser()
    getThreads()
    
  },[])
  
  useEffect(()=>{
    getThreadsFeed()
  },[user,threads,viewThreadsFeed])
  console.log(threads)
  console.log(filteredThreads);
  return (
   <> {user &&<div className="App">
      <Nav url={user.instagram_url}/>
      <Header user={user} viewThreadsFeed={viewThreadsFeed} setViewThreadsFeed={setViewThreadsFeed}/>
      {filteredThreads && <Feed threads={filteredThreads} setOpenPopup={setOpenPopup} getThreads={getThreads}user={user}/>} 
      {openPopup &&<PopUp setOpenPopup={setOpenPopup}/>}
     <div onClick={()=>setOpenPopup(true)}>
          <WriteIcon/>
     </div>
    </div>}
    </>
  );
}

export default App;
