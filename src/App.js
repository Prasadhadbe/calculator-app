import "./App.css"
import React, {useReducer} from "react";
import Digitbutton from "./Digit-button";
import Operationbutton from "./Operation-button";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
}


function calculate(currentOperand, previousOperand, operation){
  switch (operation){
    case '+':
      return (parseFloat(previousOperand) + parseFloat(currentOperand)).toString();
    case "-":
      return (parseFloat(previousOperand) - parseFloat(currentOperand)).toString();
    case "÷":
      if (parseFloat(currentOperand) === 0) {
        alert("Cannot divide by zero");
        return previousOperand;
      }
      return (parseFloat(previousOperand) / parseFloat(currentOperand)).toString();
    case "*":
      if (previousOperand === null) return currentOperand;
      return (parseFloat(currentOperand) * parseFloat(previousOperand)).toString();
    default:
      return currentOperand;
  }
}


function reducer(state, {type, payload}){
  switch (type){
    case ACTIONS.ADD_DIGIT:
      if(payload.digit === 0 && state.currentOperand === 0) {return state}
      if (payload.digit === "." && state.currentOperand === null) { return state } 
      if (payload.digit === "." && state.currentOperand.includes(".")) { return state } 

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      }
    case ACTIONS.CLEAR:
      return {
        currentOperand: 0,
        previousOperand: null,
        operation: null,
      }
    case ACTIONS.DELETE_DIGIT:
      return {
        ...state,
        currentOperand: state.currentOperand && state.currentOperand.slice(0, -1),
      }
    case ACTIONS.CHOOSE_OPERATION:
      return {
        ...state,
        previousOperand: state.currentOperand,
        currentOperand: null,
        operation: payload.operation,
      }
    case ACTIONS.EVALUATE:
      if (!state.previousOperand || !state.operation || !state.currentOperand) {
        return state;
      }
      const result = calculate(parseFloat(state.currentOperand), parseFloat(state.previousOperand), state.operation);
      return {
        currentOperand: result.toString(),
        previousOperand: null,
        operation: null,
      }
    default:
      return state;
  }
}


function App() {

  const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {})

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{previousOperand}{operation}</div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button className="span-two" onClick={() => dispatch({type: ACTIONS.CLEAR})}>AC</button>
      <button>DEL</button>
      <Operationbutton dispatch={dispatch} operation="÷"/>
      <Digitbutton dispatch={dispatch} digit={1}/>
      <Digitbutton dispatch={dispatch} digit={2}/>
      <Digitbutton dispatch={dispatch} digit={3}/>
      <Operationbutton dispatch={dispatch} operation="*"/>
      <Digitbutton dispatch={dispatch} digit={4}/>
      <Digitbutton dispatch={dispatch} digit={5}/>
      <Digitbutton dispatch={dispatch} digit={6}/>
      <Operationbutton dispatch={dispatch} operation="+"/>
      <Digitbutton dispatch={dispatch} digit={7}/>
      <Digitbutton dispatch={dispatch} digit={8}/>
      <Digitbutton dispatch={dispatch} digit={9}/>
      <Operationbutton dispatch={dispatch} operation="-"/>
      <Digitbutton dispatch={dispatch} digit="."/>
      {/* <button>.</button> */}
      <Digitbutton dispatch={dispatch} digit={0}/>

      <button className="span-two" onClick={() => dispatch({type: ACTIONS.EVALUATE})}>=</button>

    </div>
  )
 }

export default App;
