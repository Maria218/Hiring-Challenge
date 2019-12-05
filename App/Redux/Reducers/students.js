import {
    ADD_STUDENT,
    GET_STUDENTS,
    UPDATE_STUDENT,
    DELETE_STUDENT,
} from '../Actions/types';

let studentState = { students: []};

export const studentReducer = (state = studentState, action) => {
    switch (action.type) {
        case ADD_STUDENT:
            let {student} = action.data;
            let clone = JSON.parse(JSON.stringify(state.students))
            clone.unshift(student) // Add new students to the top of the list
            return {...state, students: clone}

        case GET_STUDENTS:
            let {students} = action.data;
            return {...state, students}

        case UPDATE_STUDENT:{
            let {student} = action.data;
            let clone = JSON.parse(JSON.stringify(state.students))
            const index = clone.findIndex((obj) => obj.id === student.id) // Check if Student exists
            
            if (index !== -1) {
                clone[index] = student;
            }
            return {...state, students: clone};
        }

        case DELETE_STUDENT:{
            let {id} = action.data;
            let clone = JSON.parse(JSON.stringify(state.students))
            const index = clone.findIndex((obj) => obj.id === id) // Check if Student exists
            
            if (index !== -1) {
                clone.splice(index, 1)
            }
            return {...state, students: clone};
        }
    
        default:
            return state;
    }
}
