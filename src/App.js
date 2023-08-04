import { useState,useEffect } from 'react'
import Nav from './component/Nav'
import Header from './component/Header'
import Feed from './component/Feed'
import PopUp from './component/PopUp'
import './App.css';

function App() {
  const[user,setUser]=useState(null)
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

  useEffect(()=>{
    getUser()
  },[])
  console.log(user)
  return (
    <div className="App">
      <Nav />
      <Header/>
      <Feed/> 
     {/* <PopUp/>*/}
    </div>
  );
}

export default App;
