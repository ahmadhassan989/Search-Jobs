import './App.css';
import Jobs from './components/Jobs'

function App() {
  const jobs = {
    a:{
      name:'asp.net',
      salay: '1000'
    },
    b:{
      name:'asp.net',
      salay: '1000'
    },
    c:{
      name:'asp.net',
      salay: '1000'
    },

  }
  return (
    <div className="App">
       
        <Jobs jobs={jobs} ></Jobs>

    </div>
  );
}

export default App;
