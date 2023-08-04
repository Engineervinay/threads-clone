import Nav from './component/Nav'
import Header from './component/Header'
import Feed from './component/Feed'
import PopUp from './component/PopUp'
import './App.css';

function App() {
  return (
    <div className="App">
      <Nav/>
      <Header/>
      <Feed/> 
      <PopUp/>
    </div>
  );
}

export default App;
