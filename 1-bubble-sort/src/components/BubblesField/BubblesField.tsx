import React from 'react';
import { NOT_SOLVED_STATUS, SORTED_STATUS, SORTING_STATUS, SORTING_PAUSED } from "../../constants/constants";
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
            status: NOT_SOLVED_STATUS
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
            status: SORTING_PAUSED
        });
    }

    startSorting = (): void => {
        const {status, currentStep, bubbleNumbers} = this.state;

        switch (status) {
            case NOT_SOLVED_STATUS:
                this.setState({
                    status: SORTING_STATUS
                });
                this.doStepForBubbleSort(currentStep, bubbleNumbers);
                break;
            case SORTING_STATUS:
                this.pauseSorting();
                break;
            case SORTING_PAUSED:
                this.setState(() => ({
                    status: SORTING_STATUS
                  }));
                this.setState({
                    status: SORTING_STATUS
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
            status: NOT_SOLVED_STATUS
        });
    }

    doStepForBubbleSort: DoStepForBubbleSort = (step = 1, arrayOfNumbers) => {
        let updatedArrayOfNumbers: number[] = [...arrayOfNumbers];

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
    
        if (this.state.status !== SORTING_PAUSED) {
            if (step < updatedArrayOfNumbers.length) {
                setTimeout(this.doStepForBubbleSort.bind(this, step, updatedArrayOfNumbers), 4)
            } else{
                this.setState({
                    status: SORTED_STATUS
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
                <button onClick={this.startSorting} disabled={bubbleNumbers.length < 1 || status === SORTED_STATUS}>{status === SORTING_STATUS ? "Pause" : "Start" }</button>
            </div>
            <pre>{status}</pre>
        </div>);
    }
}

export default BubblesField;