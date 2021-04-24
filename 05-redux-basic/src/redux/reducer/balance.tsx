import {
    UPDATE,
    DEBIT,
    CREDIT,
    GET_BALANCE_WITH_TAX
  } from '../constants/constants';
  
  const initialBalance = 0;
  
  export default (balance = initialBalance, action: Action): number => {
    const { type, payload = 0 } = action;
  
    switch (type) {
      case UPDATE:
        return payload;
      case DEBIT:
        return balance - payload;
      case CREDIT:
        return balance + payload;
      case GET_BALANCE_WITH_TAX:
        const updatedBalance = balance * (payload / 100);
        return updatedBalance;
      default:
        return balance;
    }
  };
  