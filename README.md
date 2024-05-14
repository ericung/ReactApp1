# ReactApp1

Data can be found here: [School Student Daily Attendence](https://www.kaggle.com/datasets/sahirmaharajj/school-student-daily-attendance)

There is an issue with components and conditional rendering in relation to how to handle elements and values in components.

regular functional programming functions can be found in intermediate state data transformations

1. filter
   const chemists = people.filter(person =>
    person.profession === 'chemist'
  );
3. map
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
4. find
  const artwork = draft.find(a =>
        a.id === artworkId
      );

