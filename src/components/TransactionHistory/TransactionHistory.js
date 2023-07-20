import React from 'react';
import './TransactionHistory.css';
import  'bootstrap/dist/css/bootstrap.css';



const TransactionHistory = (props) => {


  // formating currency
  const formatCurrency = (amount) => {
    if (amount !== null && amount !== undefined) {
      return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }
    return '-';
  };

  // handling Edit button click
  const handleEditClick = (index) => {
    const updatedAmount = prompt('Enter the new amount:');
    if (updatedAmount !== null) {
      props.onEditTransaction(index, Number(updatedAmount));
      
    }
  };

  return (
  <div className="transaction-history-container">
      <h2>Transaction History</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Current Balance</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.transactionHistory.map((transaction, index) => (
            <tr key={index}>
              <td>{new Date(transaction.date).toLocaleString('en-US', { timeZone: 'Africa/Cairo' })}</td>
              <td>{transaction.type === 'add' ? 'Deposit' : 'Withdraw'}</td>
              <td>{formatCurrency(transaction.amount)}</td>
              <td>{formatCurrency(transaction.balance)}</td>
              <td>
  
                  <button onClick={() => handleEditClick(index)} className="btn btn-edit">
                    Edit
                  </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
