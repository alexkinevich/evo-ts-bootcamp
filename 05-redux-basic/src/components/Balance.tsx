import React, { useState, MouseEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../redux/types';
import { addToBalance, debitFromBalance, setBalance, getBalanceWithTax } from '../redux/actions';

import styles from './Balance.module.css';

const mapStateToProps = ({balance}: RootState) => ({
    balance
});
const mapDispatchToProps = {
      addToBalance: (count: number) => addToBalance(count),
      setBalance: (newBalance: number) => setBalance(newBalance),
      debitFromBalance: (count: number) => debitFromBalance(count),
      getBalanceWithTax: (taxCount: number) => getBalanceWithTax(taxCount),
    };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface BalanceProps extends PropsFromRedux {
}

const Balance: React.FC<BalanceProps> = ({balance = 0, addToBalance, setBalance, debitFromBalance, getBalanceWithTax })=> {
    const [value, setValue] = useState(0);

    const setBalanceHandler = (event: MouseEvent) => {
        event.preventDefault();
        setBalance(value);
    }

    const addToBalanceHandler = (event: MouseEvent) => {
        event.preventDefault();
        addToBalance(value);
    }

    const debitFromBalanceHandler = (event: MouseEvent) => {
        event.preventDefault();
        debitFromBalance(value);
    }

    const getBalanceWithTaxHandler = (event: MouseEvent) => {
        event.preventDefault();
        getBalanceWithTax(value);
    }

    return (
      <div className="balance-content">
            <input type="text" className={`${styles.input}`} defaultValue={10000} value={value} 
                onChange={(event: React.ChangeEvent<HTMLInputElement>)=> setValue(Number(event.target.value))}/>
            <div>
                <button className={styles.button} onClick={setBalanceHandler}>Set balance</button>
                <button className={styles.button} onClick={addToBalanceHandler}>Add to balance &#65291;</button>
                <button className={styles.button} onClick={debitFromBalanceHandler}>Debit from balance &#65123;</button>
                <button className={styles.button} onClick={getBalanceWithTaxHandler}>Get balance with tax 14 %</button>
            </div>
          <p>Current Balance: {balance}</p>         
      </div>
    );
}


export default connector(Balance);
  