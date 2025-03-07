import { useState } from 'react';
import './App.css';
import BackgroundAnimate from './BackgroundAnimation';
import InputShortener from './InputShortner';
import LinkResult from './LinkResult';


function App() {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="container">
      <InputShortener setInputValue={setInputValue} />
      <BackgroundAnimate />
      <LinkResult inputValue={inputValue} />

    </div>
  );
}

export default App;
