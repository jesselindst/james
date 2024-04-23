import logo from './logo.svg';
import './App.css';
import Test from './components/header.js';
import AudioSender from './components/AudioApi.js';

function App() {
  return (
    <div className="App">
      <div className='Main-Container'>hallo</div>
      <AudioSender/>
    </div>
  );
}

export default App;
