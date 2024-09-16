import React from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';

const ExerciseRow = ({ exercise, onDelete, onEdit }) => {
    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td>
                <MdEdit className="icon" onClick={() => onEdit(exercise)} />
                <MdDelete className="icon" onClick={() => onDelete(exercise._id)} />
            </td>
        </tr>
    );
};

export default ExerciseRow;
