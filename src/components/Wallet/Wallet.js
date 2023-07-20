import React from 'react';
import { useState, useEffect } from 'react';
import Button from '../Button/Button';
import './Wallet.css';
import TransactionHistory from '../TransactionHistory/TransactionHistory';
import  'bootstrap/dist/css/bootstrap.css';




const Wallet = () => {

    // state managment
    const [balance, setBalance] = useState(0);
    const [depositValue, setDepositValue] = useState(0);
    const [withdrawValue, setWithdrawValue] = useState(0);
    const [disabled, setDisabled] = useState(false);
    const [transactionHistory, setTransactionHistory] = useState([]);
    const [showTransactionHistory, setShowTransactionHistory] = useState(false);

  
    useEffect(() => {
      // Load transaction history from localStorage when the component mounts
      const savedTransactionHistory = JSON.parse(localStorage.getItem('transactionHistory'));
      if (savedTransactionHistory) {
        setTransactionHistory(savedTransactionHistory);
      }
    }, []);
  

    useEffect(() => {
      // Save transaction history to localStorage whenever it changes
      localStorage.setItem('transactionHistory', JSON.stringify(transactionHistory));
    }, [transactionHistory]);;
    

    // handle deposit function and save transaction
    const handleDeposit = () => {
      const currentBalance = Number(balance) + Number(depositValue);
      let bonus = 0;
      if (depositValue === '100') {
        bonus = 5;
        alert("CongratZ you got 5$ bonus!");
      } else if (depositValue === '500') {
        bonus = 20;
        alert("CongratZ you got 20$ bonus!");
      } else if (depositValue === '1000') {
        bonus = 50;
        alert("CongratZ you got 50$ bonus!");
      }
  
      const updatedBalance = currentBalance + bonus;
      setBalance(updatedBalance);
  
      // Save the deposit transaction to the history
      const transaction = {
        date: new Date(),
        type: 'add',
        amount: Number(depositValue),
        balance: updatedBalance,
      };
      setTransactionHistory([...transactionHistory, transaction]);
    };
  

    // handle withdraw function and save transaction
    const handleWithdraw = () => {
      const currentBalance = Number(balance) - Number(withdrawValue);
      if (withdrawValue <= balance) {
        setBalance(currentBalance);
  
        // Save the withdraw transaction to the history
        const transaction = {
          date: new Date(),
          type: 'withdraw',
          amount: Number(withdrawValue),
          balance: currentBalance,
        };
        setTransactionHistory([...transactionHistory, transaction]);
      } else {
        setDisabled(true);
      }
    };
  
    
    // handling Edite transaction button
    const handleEditTransaction = (index, updatedAmount) => {
      if (index >= 0 && index < transactionHistory.length) {
        const updatedHistory = [...transactionHistory];
        const transactionToEdit = updatedHistory[index];
        const timeDifference = new Date() - transactionToEdit.date; 
        // limiting time for editing transaction
        if (timeDifference <= 5 * 60 * 1000) {
          const originalAmount = transactionToEdit.amount;
          const balanceDifference = updatedAmount - originalAmount;
          transactionToEdit.amount = updatedAmount;
          transactionToEdit.balance += balanceDifference;
          setTransactionHistory(updatedHistory);
        } else {
          alert('You can only edit transactions within the first 5 minutes of creation.');
        }
      }
    };

    // handle showing transaction history
    const handleToggleTransactionHistory = () => {
        setShowTransactionHistory((prevValue) => !prevValue);
      };
  
    return (
        <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="balance-container text-center mb-4">
              <h1>Current Balance</h1>
              <h2>{balance} $</h2>
            </div>
  
            <div className="inputs-container">
              <div className="deposit-container mb-3 ">
                <label>
                  <input
                    onChange={(e) => setDepositValue(e.target.value)}
                    type="number"
                    pattern="[0-9]*"
                    name="deposit"
                    min="1"
                    id="amount"
                    className="form-control"
                    placeholder="0.00 $"
                  />
                </label>
                <Button title="Deposit" onClick={handleDeposit} className="  btn-deposit" />
              </div>
  
              <div className="withdraw-container ms-3">
                <label>
                  <input
                    onChange={(e) => setWithdrawValue(e.target.value)}
                    type="number"
                    pattern="[0-9]*"
                    name="withdraw"
                    min="1"
                    id="amount"
                    className="form-control"
                    placeholder="0.00 $"
                  />
                </label>
                <Button
                  title="Withdraw"
                  onClick={handleWithdraw}
                  disabled={disabled}
                  className="btn-withdraw"
                />
              </div>
            </div>  

            <button type="button" className=" btn btn-trans" onClick={handleToggleTransactionHistory}>{showTransactionHistory ? 'Hide Transaction History' : 'Show Transaction History'}</button>

          {showTransactionHistory && (
            <TransactionHistory
              transactionHistory={transactionHistory}
              onEditTransaction={handleEditTransaction}
            />
          )}

          </div>
        </div>
      </div>
    );
  };
  
  export default Wallet;
 