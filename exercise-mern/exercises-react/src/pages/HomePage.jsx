import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ExerciseTable from "../components/ExerciseTable";

function HomePage({ setExerciseToEdit }) {
    const [exercises, setExercises] = useState([]);
    const navigate = useNavigate();

    const loadExercises = async () => {
        const response = await fetch('/exercises')
        const data = await response.json()
        setExercises(data)
    }

    useEffect(() => {
        loadExercises();
    }, []);

    const onDelete = async _id => {
        try {
            const response = await fetch(`/exercises/${_id}`, { method: 'DELETE' });
            if (response.status === 204) {
                setExercises(exercises.filter(m => m._id !== _id));
            } else {
                console.error(`Failed to delete exercise with id = ${_id}, status code = ${response.status}`);
            }
        } catch (error) {
            console.error('Error deleting exercise:', error);
        }
    };

    const onEdit = (exercise) => {
        setExerciseToEdit(exercise);
        navigate("/edit-exercise");
    };

    return (
        <main className="App-main">
            <h1>Start tracking your workout!</h1>
            <ExerciseTable
                exercises={exercises}
                onDelete={onDelete}
                onEdit={onEdit}
            />
        </main>
    );
}

export default HomePage;
