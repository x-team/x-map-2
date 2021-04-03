import { createStore, combineReducers, Reducer } from 'redux'
import { MakeStore, createWrapper } from 'next-redux-wrapper'

// @ts-expect-error: this package doesn’t have type definitions
import { reducer as tooltip } from 'redux-tooltip'

const initialState = {}

const appReducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export const store = createStore(combineReducers({ appReducer, tooltip }), {
  appReducer: initialState,
})

const makeStore: MakeStore = () => createStore(appReducer)
export const wrapper = createWrapper(makeStore)
