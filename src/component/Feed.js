import Thread from './Thread'
function Feed({threads,user,setOpenPopup,getThreads,setselectedReplyThread}) {
  return (
    <div className="feed">
     {threads.map((thread)=>{
      return (
     <Thread setselectedReplyThread={setselectedReplyThread} key={thread.id} getThreads={getThreads}setOpenPopup={setOpenPopup} thread={thread} user={user}/>
      )
     })

     }
      
    </div>
  );
}

export default Feed;
