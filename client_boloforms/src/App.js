import { Route, Routes } from 'react-router-dom';
import './App.css';
import CategorizeForm from './components/CategorizeForm';
import DisplyCategorize from './components/DisplyCategorize';
import ClozeForm from './components/ClozeForm';


function App() {

  return (
    <div className="App">
      <h1 className="text-3xl font-bold">
        Form Editor
      </h1>
      <ClozeForm />
      {/* <Routes>
        <Route path='/' element={<CategorizeForm />} />
        <Route path='/categorize' element={<DisplyCategorize />} />
      </Routes> */}
    </div>
  );
}

export default App;
