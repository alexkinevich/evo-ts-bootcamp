import { CREDIT, DEBIT, UPDATE, GET_BALANCE_WITH_TAX} from './constants/constants';

type Action = {
    "type": string,
    "payload": number
}

type ActionCreator = (payload: number) => Action;

export const updatesBalance: ActionCreator = (payload) => ({
    type: UPDATE,
    payload
});

export const debitBalance: ActionCreator = (payload) => ({
    type: DEBIT,
    payload
});

export const setBalance: ActionCreator = (payload) => ({
    type: CREDIT,
    payload
});

export const getBalanceWithTax: ActionCreator = (payload) => ({
    type: GET_BALANCE_WITH_TAX,
    payload
});