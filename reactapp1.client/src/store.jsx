import { configureStore } from '@reduxjs/toolkit'
import fibonacciReducer from './FibonacciSlice'

export default configureStore({
    reducer: {
        fibonacci: fibonacciReducer,
    },
});