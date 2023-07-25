import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import './Wallet.css';
import TransactionHistory from '../TransactionHistory/TransactionHistory';
import  'bootstrap/dist/css/bootstrap.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Wallet = () => {
  // state management
  const [balance, setBalance] = useState(0);
  const [latestBalance, setLatestBalance] = useState(0);
  const [depositValue, setDepositValue] = useState(0);
  const [withdrawValue, setWithdrawValue] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [showTransactionHistory, setShowTransactionHistory] = useState(false);
  const [bonus, setBonus] = useState(0);

  useEffect(() => {
    // Load transaction history from localStorage when the component mounts
    const savedTransactionHistory = JSON.parse(localStorage.getItem('transactionHistory'));
    if (savedTransactionHistory) {
      setTransactionHistory(savedTransactionHistory);
  
      // Calculate the initial balance and bonus from the saved transaction history
      let initialBalance = 0;
      let calculatedBonus = 0;
  
      for (const transaction of savedTransactionHistory) {
        if (transaction.type === 'add') {
          initialBalance += transaction.amount;
  
          // Check if the transaction has a bonus and add it to the calculatedBonus
          if (transaction.amount === 100) {
            calculatedBonus += 5;
          } else if (transaction.amount === 500) {
            calculatedBonus += 20;
          } else if (transaction.amount === 1000) {
            calculatedBonus += 50;
          }
        } else if (transaction.type === 'withdraw') {
          initialBalance -= transaction.amount;
        }
      }
  
      // Store the latest balance with the bonus
      const updatedBalance = initialBalance + calculatedBonus;
      setBonus(calculatedBonus);
      setLatestBalance(updatedBalance);
      setBalance(updatedBalance);
      
    }
  }, []);
  
  
  
  

  useEffect(() => {
    // Save transaction history and bonus to localStorage whenever they change
    localStorage.setItem('transactionHistory', JSON.stringify(transactionHistory));
    localStorage.setItem('bonus', JSON.stringify(bonus)); // Save the bonus value to localStorage
  }, [transactionHistory, bonus]);

  // handle deposit function and save transaction
  const handleDeposit = () => {
    if (depositValue <= 0) {
      toast.error('Deposit amount must be greater than 0.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
  
    const currentBalance = latestBalance + Number(depositValue);
    let bonus = 0;
    if (depositValue === '100') {
      bonus = 5;
    } else if (depositValue === '500') {
      bonus = 20;
    } else if (depositValue === '1000') {
      bonus = 50;
    }
  
    const updatedBalance = currentBalance + bonus;
    setLatestBalance(updatedBalance);
    setBalance(updatedBalance);
    setBonus(bonus); 
  
    // Save the deposit transaction and bonus value to the history
    const transaction = {
      date: new Date(),
      type: 'add',
      amount: Number(depositValue),
      balance: updatedBalance,
    };
    setTransactionHistory([...transactionHistory, transaction]);
  
    // Save the bonus value to local storage
    localStorage.setItem('bonus', JSON.stringify(bonus));

    toast.success(`You successfully deposit ${depositValue}$`, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    if (bonus > 0) {
      toast.success(`Congratulations!You got ${bonus}$ bonus!`, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  
  
  // handle withdraw function and save transaction
  const handleWithdraw = () => {
    if (withdrawValue <= 0) {
      toast.error('Withdraw amount must be greater than 0.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    const currentBalance = latestBalance - Number(withdrawValue);
    if (withdrawValue <= latestBalance) {
      setLatestBalance(currentBalance);
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

    toast.success(`You successfully withdrew ${withdrawValue}$`, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleEditTransaction = (index, updatedAmount) => {
    if (index === transactionHistory.length - 1) {
      const updatedHistory = [...transactionHistory];
      const transactionToEdit = updatedHistory[index];
      const timeDifference = new Date() - transactionToEdit.date;
      // limiting time for editing transaction
      if (timeDifference <= 5 * 60 * 1000) {
        if (transactionToEdit.type === 'add') {
          const originalAmount = transactionToEdit.amount;
          const balanceDifference = updatedAmount - originalAmount;
          transactionToEdit.amount = updatedAmount;
          transactionToEdit.balance += balanceDifference;
          setTransactionHistory(updatedHistory);
          setLatestBalance(transactionToEdit.balance);
          setBalance(transactionToEdit.balance);
  
          // Update balances of next transactions
          for (let i = index + 1; i < updatedHistory.length; i++) {
            const nextTransaction = updatedHistory[i];
            nextTransaction.balance += balanceDifference;
          }
        } else if (transactionToEdit.type === 'withdraw') {
          const originalAmount = transactionToEdit.amount;
          const balanceDifference = updatedAmount - originalAmount;
          transactionToEdit.amount = updatedAmount;
          transactionToEdit.balance -= balanceDifference;
          setTransactionHistory(updatedHistory);
          setLatestBalance(transactionToEdit.balance);
          setBalance(transactionToEdit.balance);
  
          // Update balances of next transactions
          for (let i = index + 1; i < updatedHistory.length; i++) {
            const nextTransaction = updatedHistory[i];
            nextTransaction.balance -= balanceDifference;
          }
        }
      } else {
        toast.error('You can only edit transactions within the first 5 minutes of creation.', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast.error('You can only edit the last transaction.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
        <ToastContainer position="top-center"/>
      </div>
    );
  };
  
  export default Wallet;
 