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

