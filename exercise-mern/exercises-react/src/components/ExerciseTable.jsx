import React from "react"
import ExerciseRow from "./ExerciseRow"

function ExerciseTable({exercises, onDelete, onEdit}) {
    return (
      <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Reps</th>
          <th>Weight</th>
          <th>Unit</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
      {exercises.map((exercise, i) => (<ExerciseRow exercise={exercise} onDelete={onDelete} onEdit={onEdit} key={i}/>))}
      </tbody>
    </table>
    )
}

export default ExerciseTable
