import { createSlice } from '@reduxjs/toolkit'

// The redux version of the generator design pattern
export const fibonacciSlice = createSlice({
    name: 'counter',
    initialState: {
        X: 'a',
        Y: 'b',
        Z: '',
        S: 'Z',
        V: '',
    },
    reducers: {
        // need to rerender this.
        generate: (state) => {
            switch (state.S) {
                case 'X':
                    state.X = state.Y + state.Z;
                    state.S = 'Y';
                    state.V = state.X;
                    break;
                case 'Y':
                    state.Y = state.Z + state.X;
                    state.S = 'Z';
                    state.V = state.Y;
                    break;
                case 'Z':
                    state.Z = state.X + state.Y;
                    state.S = 'X';
                    state.V = state.Z;
                    break;
            }
        },
    },
})

// Action creators are generated for each case reducer function
export const { generate } = fibonacciSlice.actions

export default fibonacciSlice.reducer