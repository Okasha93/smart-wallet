import React from 'react';
import { useState } from 'react';
import Button from '../Button/Button';
import Transaction from '../Transaction/Transaction';


const Container = () => {

    const [inputValue, setInputValue] = useState(0);
    const [balance, setBalance] = useState(0);
    const [disabled, setDisabled] = useState(false);

    const handleDeposit = (e) => {
        const currentBalance = Number(balance) + Number(inputValue);
         if(inputValue == 100){
            setBalance(currentBalance + 5);
        } else if(inputValue == 500){
            setBalance(currentBalance + 20);
        } else if(inputValue == 1000) {
            setBalance(currentBalance + 50);
        } else if(inputValue > 0 ){
            setBalance(currentBalance);
        } else {
            alert('Please enter a valid number');
        }  
    }

    const handleWithdraw = (e) => {
        const currentBalance = Number(balance) - Number(inputValue)
        if(inputValue <= balance){
            setBalance(currentBalance);
        } else {
            setDisabled(true);
        }  
    }

    return (
    <div>

        <div>
            <h1>Current Balance</h1>
            <h2>{balance}</h2>
        </div>

        <div>
            <label className="form-label">Deposit
            <input type="number" pattern="[0-9]*" name="deposit" min="1" id="deposit" className="form-control" placeholder="0.00 $" onChange={(e) => setInputValue(e.target.value)} />
            </label>
            <Button title="Deposit" onClick={handleDeposit}/>
        </div>

        <div>
            <label className="form-label">Withdraw
            <input type="number" pattern="[0-9]*" name="withdraw" min="1" id="withdraw" className="form-control" placeholder="0.00 $" onChange={(e) => setInputValue(e.target.value)}/>
            </label>
            <Button title="Withdraw" onClick={handleWithdraw} disabled={disabled}/>
        </div>
        
        <Transaction />

    </div>
  )
}

export default Container;
