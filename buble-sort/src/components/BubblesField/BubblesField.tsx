import React, {Fragment, useState} from 'react';
import styles from './style.module.css';

interface BubblesProps {
};

type FillNumbers = () => void;

type GenateRandomNumbers = () => number[];

type ReplaceArrayNumbers = (index1: number, index2: number, arrayOfNumbers: number[]) => number[];

type SortArrayWithBubbleSorting = (arrayOfNumbers: number[]) => number[];

const BubblesField: React.FC<BubblesProps> = (props)=>{
    const [bubbleNumbers, setBubbleNumbers] = useState([] as number[]);
    const [bubblesCount, setBubblesCount] = useState(30);
    const [currentStep, setCurrentStep] = useState(null);
    const [isSorted, setIsSorted] = useState(false);

    const generateRandomNumbers: GenateRandomNumbers = () => {
        const numbersArray: number[] = [];// = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
        for (let index = 0; index < bubblesCount; index++) {
            numbersArray[index] = Math.round(Math.random() * 100);
        }

        return numbersArray;
    };

    const replaceArrayNumbers: ReplaceArrayNumbers = (arrayIndex1, arrayIndex2, arrayOfNumbers) => {
        //
        
        return arrayOfNumbers;
    };

    const sortArrayWithBubbleSorting: SortArrayWithBubbleSorting = (arrayOfNumbers) => {
        return arrayOfNumbers;
    };

    const startSorting = (): void =>{
        // set sorting with delay;
    };

    const fillNumbers: FillNumbers = () => {
        setBubbleNumbers(generateRandomNumbers());
    }

    return (
    <>
        <h1>
            Bubble Sort
        </h1>
        <div className={styles.field}>
        {
            bubbleNumbers.map(number=><div style={{height: number*2}} className={styles.line}></div>)
        }
        </div>
        <div className={styles.buttons}>
            <button onClick={fillNumbers}>New Set</button>
            <button onClick={startSorting}>Start</button>
        </div>
    </>);
}

export default BubblesField;