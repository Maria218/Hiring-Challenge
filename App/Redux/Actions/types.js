// Student Actions
export const ADD_STUDENT = 'ADD_STUDENT';
export const GET_STUDENTS = 'GET_STUDENTS';
export const UPDATE_STUDENT = 'UPDATE_STUDENT';
export const DELETE_STUDENT = 'DELETE_STUDENT';

// Create Student
export const addStudent = (student) => ({
    type: ADD_STUDENT,
    data: {student}
})

// Read Students
export const getStudents = (students) => ({
    type: GET_STUDENTS,
    data: {students}
})

// Update Student
export const updateStudent = (student) => ({
    type: UPDATE_STUDENT,
    data: {student}
})

// Remove Student
export const deleteStudent = (id) => ({
    type: DELETE_STUDENT,
    data: {id}
})


// Student Results Actions
export const ADD_RESULT = 'ADD_RESULT';
export const GET_RESULTS = 'GET_RESULTS';
export const UPDATE_RESULT = 'UPDATE_RESULT';
export const DELETE_RESULT = 'DELETE_RESULT';

// Create Result
export const addResult = (result) => ({
    type: ADD_RESULT,
    data: {result}
})

// Read Result
export const getResults = (results) => ({
    type: GET_RESULTS,
    data: {results}
})

// Update Result
export const updateResult = (result) => ({
    type: UPDATE_RESULT,
    data: {result}
})

// Remove Result
export const deleteResult = (id) => ({
    type: DELETE_RESULT,
    data: {id}
})
