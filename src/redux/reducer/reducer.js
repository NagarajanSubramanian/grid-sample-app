import { combineReducers } from 'redux';
import {ADD_EMPLOYEE, LOAD_EMPLOYEE} from './../../constants/constants';

function addEmployeeData(state = [], action) {
    switch (action.type) {
      case ADD_EMPLOYEE:
        return [
          ...state,
           action.employeeData
        ]
      case LOAD_EMPLOYEE:
      return action.employeeDatas
      default:
        return state
    }
  }

  const addEmployeeDataApp = combineReducers({
    addEmployeeData
  });

  export default addEmployeeDataApp;