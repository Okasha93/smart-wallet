import React from 'react';
import './Transaction.css';



const Transaction = () => {
    // const initialState = {
    //     deposit: '',
    //     withdraw: '',
    // }
    
    // const reducer = (state, action) => {
    //     switch(action.name) {
    //         case "deposit":
    //             return {...state,[action.deposit] : action.value};
    //         case {...state,[action.withdraw] : action.value}:
    //             return state;
            
    //     }
    // }

    // const [state, dispatch] = useReducer(reducer, initialState);

    // const handleDeposit = (e) => {
    //     dispatch({
    //         type: "deposit",
    //         deposit: e.target.value,
    //     })
    // }

    // const handleWithdraw= (e) => {
    //     dispatch({
    //         type: "withdraw",
    //         withdraw: e.target.value,
    //     })
    // }

  return (
    <div>
       <button type="button" className="btn">View Transaction</button>

    </div>
  )
}

export default Transaction;
