import {
    ADD_RESULT,
    GET_RESULTS,
    UPDATE_RESULT,
    DELETE_RESULT,
} from '../Actions/types';

let resultState = { results: []};

export const resultReducer = (state = resultState, action) => {
    switch (action.type) {
        case ADD_RESULT:
            let {result} = action.data;
            let clone = JSON.parse(JSON.stringify(state.results))
            clone.unshift(result) // Add new results to the top of the list
            return {...state, results: clone}

        case GET_RESULTS:
            let {results} = action.data;
            return {...state, results}

        case UPDATE_RESULT:{
            let {result} = action.data;
            let clone = JSON.parse(JSON.stringify(state.results))
            const index = clone.findIndex((obj) => obj.id === result.id) // Check if result exists
            
            if (index !== -1) {
                clone[index] = result;
            }
            return {...state, results: clone};
        }

        case DELETE_RESULT:{
            let {id} = action.data;
            let clone = JSON.parse(JSON.stringify(state.results))
            const index = clone.findIndex((obj) => obj.id === id) // Check if result exists
            
            if (index !== -1) {
                clone.splice(index, 1)
            }
            return {...state, results: clone};
        }
    
        default:
            return state;
    }
}
