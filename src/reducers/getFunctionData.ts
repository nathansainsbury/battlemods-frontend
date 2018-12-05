import { GET_FUNCTION_DATA } from './../actions';

export default function(state = [], action){

    switch(action.type){
        case GET_FUNCTION_DATA:
            return action.payload.data || state;
        default:
            return state;
    }

}