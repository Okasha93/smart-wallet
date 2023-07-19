import React from 'react';
import { useState } from 'react';
import Button from '../Button/Button';
import Transaction from '../Transaction/Transaction';
import './Container.css';



const Container = () => {

    const [depositValue, setDepositValue] = useState(0);
    const [withdrawValue, setWithdrawValue] = useState(0);
    const [balance, setBalance] = useState(0);
    const [disabled, setDisabled] = useState(false);

    const handleDeposit = (e) => {
        const currentBalance = Number(balance) + Number(depositValue);
         if(depositValue == 100){
            setBalance(currentBalance + 5);
        } else if(depositValue == 500){
            setBalance(currentBalance + 20);
        } else if(depositValue == 1000) {
            setBalance(currentBalance + 50);
        } else if(depositValue > 0 ){
            setBalance(currentBalance);
        } else {
            alert('Please enter a valid number');
        }  
    }

    const handleWithdraw = (e) => {
        const currentBalance = Number(balance) - Number(withdrawValue)
        if(withdrawValue <= balance){
            setBalance(currentBalance);
        } else {
            setDisabled(true);
        }  
    }

    return (
    <div className="container d-flex justify-content-center">

        <div className='balance-container'>
            <h1>Current Balance</h1>
            <h2>{balance} $</h2>
        </div>

        <div className='inputs-container'>

            <div className='deposit-container'>
                <label>
                    <input type="number" pattern="[0-9]*" name="deposit" min="1" id="deposit" className="form-control1" placeholder="0.00 $" onChange={(e) => setDepositValue(e.target.value)} />
                </label>

                <Button title="Deposit" onClick={handleDeposit}/>

            </div>

            <div className='withdraw-container'>
                <label>
                    <input type="number" pattern="[0-9]*" name="withdraw" min="1" id="withdraw" className="form-control2" placeholder="0.00 $" onChange={(e) => setWithdrawValue(e.target.value)}/>
                </label>
               
                <Button title="Withdraw" onClick={handleWithdraw} disabled={disabled}/>

            </div>

        </div>
        
        
        <Transaction />

    </div>
  )
}

export default Container;
