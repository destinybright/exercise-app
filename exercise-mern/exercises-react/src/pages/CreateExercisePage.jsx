import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateExercisePage = () => {
  const [name, setName] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('');
  const [date, setDate] = useState('');

  const navigate = useNavigate();

  const createExercise = async () => {
    const newExercise = { name, reps, weight, unit, date };
    const response = await fetch('/exercises', {
      method: 'POST',
      body: JSON.stringify(newExercise),
      headers: { 'Content-Type': 'application/json'}
    });
    if(response.status === 201){
      alert("Successfully added the exercise!");
    } else {
      alert(`Failed to add exercise, status code = ${response.status}`);
    }
    navigate("/");
  };

  return (
    <div>
      <h1>Add your Exercise</h1>
      <label>Name
      <input
          type = "text"
          placeholder = "Enter Exercise Name Here"
          value = {name}
          onChange={e => setName(e.target.value)} />
      </label>
      <label>Reps
      <input
          type = "number"
          placeholder = "Enter Reps Here"
          value = {reps}
          onChange={e => setReps(e.target.valueAsNumber)} />
        </label>
        <label>Weight
      <input
          type = "number"
          placeholder = "Enter Weight Here"
          value = {weight}
          onChange={e => setWeight(e.target.valueAsNumber)} />
        </label>
      <label>Units
      <select
          type = "text"
          placeholder = "Enter Unit Here"
          value = {unit}
          onChange={e => setUnit(e.target.value)}>
          <option value="">Pick Unit Here</option>
          <option value="kgs">kgs</option>
          <option value="lbs">lbs</option>
      </select>
      </label>
      <label>Date
      <input
          type = "text"
          placeholder = "Enter Date Here"
          value = {date}
          onChange={e => setDate(e.target.value)} />
        </label>
      <button
          onClick={createExercise}
      >Add Exercise</button>
      <p></p>
    </div>
  )
  }

  export default CreateExercisePage
