import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateHeader from "./components/Header";
import CreateFooter from "./components/Footer";
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import CreateExercisePage from './pages/CreateExercisePage';
import EditExercisePage from './pages/EditExercisePage';

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <div className="app">
      <CreateHeader />
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit} />} />
          <Route path="/create-exercise" element={<CreateExercisePage />} />
          <Route path="/edit-exercise" element={<EditExercisePage exerciseToEdit={exerciseToEdit} />}/>
        </Routes>
      </Router>
      <CreateFooter />
    </div>
  );
}

export default App;
