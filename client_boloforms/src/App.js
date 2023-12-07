import { Route, Routes } from 'react-router-dom';
import './App.css';
import CategorizeForm from './components/CategorizeForm';
import DisplyCategorize from './components/DisplyCategorize';
import ClozeForm from './components/ClozeForm';
import DisplayCloze from './components/DisplayCloze';


function App() {

  return (
    <div className="App">
      <h1 className="text-3xl font-bold">
        Form Editor
      </h1>
      {/* <Routes>
        <Route path='/' element={<CategorizeForm />} />
        <Route path='/categorize' element={<DisplyCategorize />} />
      </Routes> */}
      {/* <ClozeForm /> */}
      <DisplayCloze />
    </div>
  );
}

export default App;
