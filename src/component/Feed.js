import Thread from './Thread'
function Feed({threads,user,setOpenPopup}) {
  return (
    <div className="feed">
     {threads.map((thread)=>{
      return (
     <Thread key={thread.id} setOpenPopup={setOpenPopup} thread={thread} user={user}/>
      )
     })

     }
      
    </div>
  );
}

export default Feed;
