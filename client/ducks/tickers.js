'use strict';

import { lastStored } from 'utils/local-storage';
import { get } from 'lodash';

// Namespaces
const ns = 'TICKERS_';
const stateName = 'tickers';

// Action Types
const ADD       = `${ns}ADD`;
const REMOVE    = `${ns}REMOVE`;

// Initial State
const initalState = ['BTC:USD', 'ETH:USD', 'DASH:USD', 'XMR:USD', 'LTC:USD', 'DOGE:USD'];

// Reducer
export default function reducer (state = get(lastStored, stateName, initalState), action) {
    switch (action.type) {
        case ADD:
            return [...state, action.tickerId];
        case REMOVE:
            return state.filter(ticker => ticker !== action.tickerId);
        default:
            return state;
    }
}

// Action Creators
export const addTicker = (tickerId) => ({ type: ADD, tickerID });
export const removeTicker = (tickerId) => ({ type: REMOVE, tickerId });
