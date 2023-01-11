import { createSlice, PayloadAction } from '@reduxjs/toolkit' ;
import { IState } from '../component/type/type'

const initialState: IState = {
  continuation: false,
    checkAll: true,
    checkNonStop: true,
    checkOne: true,
    checkTwo: true,
    checkThree: true,
    cheapBut: false,
    quickBut: false,
    optimalBut: false,
    keySearch: 0,
    arrTicket: [],
    errors: false,
    countTicket: 5,
}

const toolkitSlice = createSlice ({
  name: 'toolkit',
  initialState,
  reducers: {
  inputAll(state){
    state.checkAll = !state.checkAll
    state.cheapBut = false
    state.quickBut = false
    state.optimalBut = false
    state.countTicket = 5
   },
    inputNonStop(state){
      state.checkNonStop = !state.checkNonStop
      state.cheapBut = false
      state.quickBut = false
      state.optimalBut = false
      state.countTicket = 5
    },
    inputOne(state){
      state.checkOne = !state.checkOne
      state.cheapBut = false
      state.quickBut = false
      state.optimalBut = false
      state.countTicket = 5
    },
    inputTwo(state){
      state.checkTwo = !state.checkTwo
      state.cheapBut = false
      state.quickBut = false
      state.optimalBut = false
      state.countTicket = 5
    },
    inputThree(state){
      state.checkThree = !state.checkThree
      state.cheapBut = false
      state.quickBut = false
      state.optimalBut = false
      state.countTicket = 5
    },
    cheap(state){
      state.cheapBut = true
      state.quickBut = false
      state.optimalBut = false
      state.countTicket = 5
    },
    quick(state){
      state.cheapBut = false
      state.quickBut = true
      state.optimalBut = false
      state.countTicket = 5
    },
    optimal(state){
      state.cheapBut = false
      state.quickBut = false
      state.optimalBut = true
      state.countTicket = 5
    },
    swapKey(state, action: PayloadAction<number>){
      state.keySearch = action.payload
    },
    searchArrTicket(state, action: PayloadAction<[]>){
      state.arrTicket = [...state.arrTicket, ...action.payload]

    },
    searchArrContinuation(state, action: PayloadAction<boolean>){
      state.continuation = action.payload
    },
    addCountTicket(state){
      state.countTicket = state.countTicket + 5
    },
    error(state){
      state.errors = true
    }
  }
  });

export default toolkitSlice.reducer;
export const {inputAll,
              inputNonStop,
              inputOne,
              inputTwo,
              inputThree,
              cheap,
              quick,
              optimal,
              swapKey,
              searchArrTicket,
              searchArrContinuation,
              addCountTicket,
              error} = toolkitSlice.actions;