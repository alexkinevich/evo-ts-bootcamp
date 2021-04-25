import { CREDIT, DEBIT, UPDATE, GET_BALANCE_WITH_TAX} from './constants/constants';

export type Action = {
    "type": string,
    "payload": number
}

export type ActionCreator = (payload: number) => Action;

export const setBalance: ActionCreator = (payload) => ({
    type: UPDATE,
    payload
});

export const debitFromBalance: ActionCreator = (payload) => ({
    type: DEBIT,
    payload
});

export const addToBalance: ActionCreator = (payload) => ({
    type: CREDIT,
    payload
});

export const getBalanceWithTax: ActionCreator = (payload) => ({
    type: GET_BALANCE_WITH_TAX,
    payload
});