# ReactApp1

Data can be found here: [School Student Daily Attendence](https://www.kaggle.com/datasets/sahirmaharajj/school-student-daily-attendance)

There is an issue with components and conditional rendering in relation to how to handle elements and values in components. 

[commit](https://github.com/ericung/ReactApp1/commit/894e82481d93270f82b99d37810a08de9ef55142) - React renders the main component which is form at a different time than the component.

regular functional programming functions can be found in intermediate state data transformations

1. filter

``` js
   const chemists = people.filter(person =>
    person.profession === 'chemist'
  );
```
   
2. map

``` js
   {artworks.map(artwork => (
        <li key={artwork.id}>
          <label>
            <input
              type="checkbox"
              checked={artwork.seen}
              onChange={e => {
                onToggle(
                  artwork.id,
                  e.target.checked
                );
              }}
            />
            {artwork.title}
          </label>
        </li>
      ))}
```
  
3. find

``` js
  const artwork = draft.find(a =>
        a.id === artworkId
      );
```

find and filter are quotient operations on a topological space


```javascript
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
```

fibonacci slice in redux, here the generator values and generator function is reduced to a single function, which could become too convoluted if it expands too much.

I'm not sure if this can be applied generally. Will need to see

