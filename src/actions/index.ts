import axios from 'axios';

export const GET_FUNCTION_DATA = 'get_function_data';

export function getAllFunctions(search){

    const response = axios.get(`${process.env.REACT_APP_WOW_FUNCTION_ENDPOINT}/${search}`);

    return{
        type: GET_FUNCTION_DATA,
        payload: response
    }

}