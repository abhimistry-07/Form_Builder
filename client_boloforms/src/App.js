import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import CategorizeForm from './components/CategorizeForm';
import DisplyCategorize from './components/DisplyCategorize';
import ClozeForm from './components/ClozeForm';
import DisplayCloze from './components/DisplayCloze';
import ComprehensionForm from './components/ComprehensionForm';
import DisplayComprehension from './components/DisplayComprehension';

const NavBar = () => {
  return <>
    <Link to="/">
      <h1 className="text-2xl font-bold mb-5">
        Form Editor
      </h1>
    </Link>
    <div className='flex justify-between'>
      <Link to="/categorize" className="text-xl font-bold">
        Click here to see Categorize Questions page
      </Link>
      <Link to="/cloze" className="text-xl font-bold">
        Click here to see Cloze Questions page
      </Link>
      <Link to="/clozeform" className="text-xl font-bold">
        Click here to see Cloze Form page
      </Link>
    </div>
  </>
}

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path='/' element={<CategorizeForm />} />
        <Route path='/categorize' element={<DisplyCategorize />} />
        <Route path='/cloze' element={<DisplayCloze />} />
        <Route path='/clozeform' element={<ClozeForm />} />
      </Routes>
      <ComprehensionForm />
      <DisplayComprehension />
    </div>
  );
}

export default App;
