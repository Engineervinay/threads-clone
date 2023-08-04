import Thread from './Thread'
function Feed({threads}) {
  return (
    <div className="feed">
     {threads.map((thread)=>{
      
     <Thread thread={thread}/>
    
     })

     }
      
    </div>
  );
}

export default Feed;
