import Thread from './Thread'
function Feed({threads,user}) {
  return (
    <div className="feed">
     {threads.map((thread)=>{
      return (
     <Thread key={thread.id} thread={thread} user={user}/>
      )
     })

     }
      
    </div>
  );
}

export default Feed;
