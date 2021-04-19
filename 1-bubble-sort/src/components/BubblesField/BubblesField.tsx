import React from 'react';
import { SORT_STATUS } from "../../constants/constants";
import styles from './style.module.css';

interface BubblesProps {
};

type FillNumbers = () => void;

type GenateRandomNumbers = () => number[];

type DoStepForBubbleSort = (step: number, arrayOfNumbers: number[]) => void;

type PauseSorting = () => void;

type ReplaceArrayNumbers = (index: number, arrayOfNumbers: number[]) => number[];

type BubblesFieldState = {
    bubbleNumbers: number[],
    bubblesCount: 30,
    currentStep: number,
    status: string
};

export class BubblesField extends React.Component<BubblesProps, BubblesFieldState>
{
    constructor(props: BubblesProps){
        super(props);

        this.state = {
            bubbleNumbers: [] as number[],
            bubblesCount: 30,
            currentStep: 1,
            status: SORT_STATUS.NotSolved
        }
    }

    generateRandomNumbers: GenateRandomNumbers = () => {
        const numbersArray: number[] = [];
        for (let index = 0; index < this.state.bubblesCount; index++) {
            numbersArray[index] = Math.round(Math.random() * 100);
        }

        return numbersArray;
    };

    replaceArrayNumbers: ReplaceArrayNumbers = (arrayIndex, arrayOfNumbers) => {
        const numberItemForCurrentStep = arrayOfNumbers[arrayIndex];
        arrayOfNumbers[arrayIndex] = arrayOfNumbers[arrayIndex - 1];
        arrayOfNumbers[arrayIndex - 1] = numberItemForCurrentStep;
        
        return arrayOfNumbers;
    };

    pauseSorting: PauseSorting = () => {
        this.setState({
            status: SORT_STATUS.SortingPaused
        });
    }

    startSorting = (): void => {
        const {status, currentStep, bubbleNumbers} = this.state;

        switch (status) {
            case SORT_STATUS.NotSolved:
                this.setState({
                    status: SORT_STATUS.Sorting
                });
                this.doStepForBubbleSort(currentStep, bubbleNumbers);
                break;
            case SORT_STATUS.Sorting:
                this.pauseSorting();
                break;
            case SORT_STATUS.SortingPaused:
                this.setState({
                    status: SORT_STATUS.Sorting
                  },
                  () => { this.doStepForBubbleSort(currentStep, bubbleNumbers) });
                break;
            default:
                break;
        }
    };

    fillNumbers: FillNumbers = () => {
        this.setState({
            bubbleNumbers: this.generateRandomNumbers(),
            status: SORT_STATUS.NotSolved
        });
    }

    doStepForBubbleSort: DoStepForBubbleSort = (step = 1, arrayOfNumbers) => {
        const updatedArrayOfNumbers: number[] = [...arrayOfNumbers];

        if (step < arrayOfNumbers.length && step > 0) {
            if (arrayOfNumbers[step] < arrayOfNumbers[step - 1]) {
                this.replaceArrayNumbers(step, updatedArrayOfNumbers);
                this.setState({
                    bubbleNumbers: updatedArrayOfNumbers
                });
                step = 1;
            } else{
                step++;
            }
        }
    
        if (this.state.status !== SORT_STATUS.SortingPaused) {
            if (step < updatedArrayOfNumbers.length) {
                setTimeout(this.doStepForBubbleSort.bind(this, step, updatedArrayOfNumbers), 4)
            } else{
                this.setState({
                    status: SORT_STATUS.Sorted
                });
            }
        }
    }

    render()
    {
        const { status, bubbleNumbers } = this.state;

        return (<div>
            <h1>
                Bubble Sort
            </h1>
            <div className={styles.field}>
            {
                bubbleNumbers.map(number=><div style={{height: number*2}} className={styles.line}></div>)
            }
            </div>
            <div className={styles.buttons}>
                <button onClick={this.fillNumbers}>New Set</button>
                <button onClick={this.startSorting} disabled={bubbleNumbers.length < 1 || status === SORT_STATUS.Sorted}>{status === SORT_STATUS.Sorting ? "Pause" : "Start" }</button>
            </div>
            <pre>{status}</pre>
        </div>);
    }
}

export default BubblesField;