import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nurses from "./Components/Nurses";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Nurses/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
