import Thread from './Thread'
function Feed({threads,user,setOpenPopup,getThreads}) {
  return (
    <div className="feed">
     {threads.map((thread)=>{
      return (
     <Thread key={thread.id} getThreads={getThreads}setOpenPopup={setOpenPopup} thread={thread} user={user}/>
      )
     })

     }
      
    </div>
  );
}

export default Feed;
