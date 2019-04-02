import {ADD_EMPLOYEE, LOAD_EMPLOYEE} from './../../constants/constants';

export function addEmployee(employeeData) {
    return { 
        type: ADD_EMPLOYEE, employeeData 
    }
  }

export function loadEmployee(employeeDatas){
    return {
        type: LOAD_EMPLOYEE, employeeDatas
    }
}