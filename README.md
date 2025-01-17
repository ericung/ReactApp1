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

=======

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

Three.js and React.js Example Component

```javascript
export default class MainScene extends React.Component {
    componentDidMount() {
        this.initScene();
    }

    initScene = () => {
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );

        const fov = 75;
        const aspect = 2; 
        const near = 0.1;
        const far = 5;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

        camera.position.set( 0, 0, 2 );
        camera.lookAt( 0, 0, 0 );

        const scene = new THREE.Scene();

        const boxWidth = 1;
        const boxHeight = 1;
        const boxDepth = 1;
        const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

        const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );

        const cube = new THREE.Mesh(geometry, material);

        scene.add(cube);

        renderer.render(scene, camera);
        function render(time) {
            time *= 0.001;

            cube.rotation.x = time;
            cube.rotation.y = time;

            renderer.render(scene, camera);

            requestAnimationFrame(render);
        }

        requestAnimationFrame(render);
    }

    render() {
        return (<>
            <div className="canvas" ref={this.divRef}></div>
        </>)
    }
}
```

div refs so that the scene can be rerendered
[React Ref](https://react.dev/learn/manipulating-the-dom-with-refs)

SignalR

with some backend modifications, signalr can be added to a react app on the client side

```javascript
const URL = "https://localhost:7260/messageHub";

const SignalR = () => {
    const [connection, setConnection] = useState(null);

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl(URL)
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start().then(() => {
                console.log("Connected!");
            }).catch(err => console.error("Connection failed: ", err));
        }
    }, [connection]);
    
    return () => {
        <div>
            <h1>SignalR Connected</h1>
        </div>
    };
}
```
