import React, {useState, useEffect} from 'react';
import { NOT_SOLVED_STATUS, SORTED_STATUS, SORTING_STATUS, SORTING_PAUSED } from "../../constants/constants";
import styles from './style.module.css';

interface BubblesProps {
};

type FillNumbers = () => void;

type GenateRandomNumbers = () => number[];

type DoStepForBubbleSort = (step: number, arrayOfNumbers: number[]) => void;

type PauseSorting = () => void;

type ReplaceArrayNumbers = (index: number, arrayOfNumbers: number[]) => number[];

const BubblesField: React.FC<BubblesProps> = ()=>{
    const [bubbleNumbers, setBubbleNumbers] = useState([] as number[]);
    const [bubblesCount, setBubblesCount] = useState(30);
    const [currentStep, setCurrentStep] = useState(1);
    const [status, setStatus] = useState(NOT_SOLVED_STATUS);

    // useEffect(() => {
    //     fillNumbers();
    // });

    const generateRandomNumbers: GenateRandomNumbers = () => {
        const numbersArray: number[] = [];
        for (let index = 0; index < bubblesCount; index++) {
            numbersArray[index] = Math.round(Math.random() * 100);
        }

        return numbersArray;
    };

    const replaceArrayNumbers: ReplaceArrayNumbers = (arrayIndex, arrayOfNumbers) => {
        const numberItemForCurrentStep = arrayOfNumbers[arrayIndex];
        arrayOfNumbers[arrayIndex] = arrayOfNumbers[arrayIndex - 1];
        arrayOfNumbers[arrayIndex - 1] = numberItemForCurrentStep;
        
        return arrayOfNumbers;
    };

    const pauseSorting: PauseSorting = () => {
        setStatus(SORTING_PAUSED);
    }

    const startSorting = (): void => {
        switch (status) {
            case NOT_SOLVED_STATUS:
                //Start sorting
                setStatus(SORTING_STATUS);
                doStepForBubbleSort(currentStep, bubbleNumbers);
                break;
            case SORTING_STATUS:
                // Pause sort
                pauseSorting();
                break;
            case SORTING_PAUSED:
                setStatus(SORTING_STATUS);
                doStepForBubbleSort(currentStep, bubbleNumbers);
                break;
            default:
                break;
        }
    };

    const fillNumbers: FillNumbers = () => {
        setBubbleNumbers(generateRandomNumbers());
    }

    const doStepForBubbleSort: DoStepForBubbleSort = (step = 1, arrayOfNumbers) => {
        let updatedArrayOfNumbers: number[] = [...arrayOfNumbers];

        if (step < arrayOfNumbers.length && step > 0) {
            if (arrayOfNumbers[step] < arrayOfNumbers[step - 1]) {
                replaceArrayNumbers(step, updatedArrayOfNumbers);
                setBubbleNumbers(updatedArrayOfNumbers);
                step = 1;
            } else{
                step++;
            }
        }
    
        if (status !== SORTING_PAUSED) {
            if (step < updatedArrayOfNumbers.length) {
                setTimeout(doStepForBubbleSort, 2, step, updatedArrayOfNumbers)
            } else{
                // Finish sorting
                console.log("Array has been filtered")
            }
        } else{
            console.log("asd")
        }
    }

    return (
    <div>
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
            <button onClick={startSorting}>{status === SORTING_STATUS ? "Pause" : "Start" }</button>
        </div>
        <pre>{status}</pre>
    </div>);
}

export default BubblesField;