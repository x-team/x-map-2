import {
  createStore,
  combineReducers,
} from "redux"

import { reducer as tooltip } from "redux-tooltip"

const initialState = {}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export const store = createStore(combineReducers({ appReducer, tooltip }), { appReducer: initialState });
