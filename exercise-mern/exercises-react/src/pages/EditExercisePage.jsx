import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditExercisePage = ({exerciseToEdit}) => {
  const [name, setName] = useState(exerciseToEdit.name);
  const [reps, setReps] = useState(exerciseToEdit.reps);
  const [weight, setWeight] = useState(exerciseToEdit.weight);
  const [unit, setUnit] = useState(exerciseToEdit.unit);
  const [date, setDate] = useState(exerciseToEdit.date);

  const navigate = useNavigate()

  const editExercise = async () => {
    const editedExercise = { name, reps, weight, unit, date };
    const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
      method: 'PUT',
      body: JSON.stringify(editedExercise),
      headers: { 'Content-Type': 'application/json'}
    });
    if(response.status === 200){
      alert("Successfully edited the exercise!");
    } else {
      alert(`Failed to edit the exercise, status code = ${response.status}`);
    }
    navigate("/");
  };

  return (
    <div>
      <h1>Edit your Exercise</h1>
      <label>Name
      <input
          type = "text"
          value = {name}
          onChange={e => setName(e.target.value)} />
      </label>
      <label>Reps
      <input
          type = "number"
          value = {reps}
          onChange={e => setReps(e.target.valueAsNumber)} />
        </label>
      <label>Weight
      <input
          type = "number"
          value = {weight}
          onChange={e => setWeight(e.target.valueAsNumber)} />
      </label>
      <label>Units
      <select
          type = "text"
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
          value = {date}
          onChange={e => setDate(e.target.value)} />
        </label>
      <button
          onClick={editExercise}
      >Save Exercise</button>
      <p></p>
    </div>
  )

  }
export default EditExercisePage
