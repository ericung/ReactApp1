import { useEffect, useState } from 'react';
import { useImmer } from 'use-immer';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { generate } from './FibonacciSlice';
import './App.css';
import Canvas from './Canvas';
import SignalR from './SignalR';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';

let camera, scene, renderer;
let cameraControls;
let sphereGroup, smallSphere;
let groundMirror, verticalMirror;

init();
animate();

function init() {

    const container = document.getElementById( 'container' );

    // renderer
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    // scene
    scene = new THREE.Scene();

    // camera
    //camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
    camera=new THREE.OrthographicCamera(-window.innerWidth/2, window.innerWidth/2, window.innerHeight/2, -window.innerHeight/2, 0.1, 1000);
    camera.position.set( 0, 75, 160 );

    cameraControls = new OrbitControls( camera, renderer.domElement );
    cameraControls.target.set( 0, 40, 0 );
    cameraControls.maxDistance = 400;
    cameraControls.minDistance = 10;
    cameraControls.update();

    //

    const planeGeo = new THREE.PlaneGeometry( 100.1, 100.1 );

    // reflectors/mirrors

    let geometry, material;

    geometry = new THREE.CircleGeometry( 40, 64 );
    groundMirror = new Reflector( geometry, {
        clipBias: 0.003,
        textureWidth: window.innerWidth * window.devicePixelRatio,
        textureHeight: window.innerHeight * window.devicePixelRatio,
        color: 0xb5b5b5
    } );
    groundMirror.position.y = 0.5;
    groundMirror.rotateX( - Math.PI / 2 );
    scene.add( groundMirror );

    geometry = new THREE.PlaneGeometry( 100, 100 );
    verticalMirror = new Reflector( geometry, {
        clipBias: 0.003,
        textureWidth: window.innerWidth * window.devicePixelRatio,
        textureHeight: window.innerHeight * window.devicePixelRatio,
        color: 0xc1cbcb
    } );
    verticalMirror.position.y = 50;
    verticalMirror.position.z = - 50;
    scene.add( verticalMirror );

    sphereGroup = new THREE.Object3D();
    scene.add( sphereGroup );

    geometry = new THREE.CylinderGeometry( 0.1, 15 * Math.cos( Math.PI / 180 * 30 ), 0.1, 24, 1 );
    material = new THREE.MeshPhongMaterial( { color: 0xffffff, emissive: 0x8d8d8d } );
    const sphereCap = new THREE.Mesh( geometry, material );
    sphereCap.position.y = - 15 * Math.sin( Math.PI / 180 * 30 ) - 0.05;
    sphereCap.rotateX( - Math.PI );

    geometry = new THREE.SphereGeometry( 15, 24, 24, Math.PI / 2, Math.PI * 2, 0, Math.PI / 180 * 120 );
    const halfSphere = new THREE.Mesh( geometry, material );
    halfSphere.add( sphereCap );
    halfSphere.rotateX( - Math.PI / 180 * 135 );
    halfSphere.rotateZ( - Math.PI / 180 * 20 );
    halfSphere.position.y = 7.5 + 15 * Math.sin( Math.PI / 180 * 30 );

    sphereGroup.add( halfSphere );

    geometry = new THREE.IcosahedronGeometry( 5, 0 );
    material = new THREE.MeshPhongMaterial( { color: 0xffffff, emissive: 0x7b7b7b, flatShading: true } );
    smallSphere = new THREE.Mesh( geometry, material );
    scene.add( smallSphere );

    // walls
    const planeTop = new THREE.Mesh( planeGeo, new THREE.MeshPhongMaterial( { color: 0xffffff } ) );
    planeTop.position.y = 100;
    planeTop.rotateX( Math.PI / 2 );
    scene.add( planeTop );

    const planeBottom = new THREE.Mesh( planeGeo, new THREE.MeshPhongMaterial( { color: 0xffffff } ) );
    planeBottom.rotateX( - Math.PI / 2 );
    scene.add( planeBottom );

    const planeFront = new THREE.Mesh( planeGeo, new THREE.MeshPhongMaterial( { color: 0x7f7fff } ) );
    planeFront.position.z = 50;
    planeFront.position.y = 50;
    planeFront.rotateY( Math.PI );
    scene.add( planeFront );

    const planeRight = new THREE.Mesh( planeGeo, new THREE.MeshPhongMaterial( { color: 0x00ff00 } ) );
    planeRight.position.x = 50;
    planeRight.position.y = 50;
    planeRight.rotateY( - Math.PI / 2 );
    scene.add( planeRight );

    const planeLeft = new THREE.Mesh( planeGeo, new THREE.MeshPhongMaterial( { color: 0xff0000 } ) );
    planeLeft.position.x = - 50;
    planeLeft.position.y = 50;
    planeLeft.rotateY( Math.PI / 2 );
    scene.add( planeLeft );

    // lights
    const mainLight = new THREE.PointLight( 0xe7e7e7, 1.5, 250 );
    mainLight.position.y = 60;
    scene.add( mainLight );

    const greenLight = new THREE.PointLight( 0x00ff00, 0.25, 1000 );
    greenLight.position.set( 550, 50, 0 );
    scene.add( greenLight );

    const redLight = new THREE.PointLight( 0xff0000, 0.25, 1000 );
    redLight.position.set( - 550, 50, 0 );
    scene.add( redLight );

    const blueLight = new THREE.PointLight( 0xbbbbfe, 0.25, 1000 );
    blueLight.position.set( 0, 50, 550 );
    scene.add( blueLight );

    window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    groundMirror.getRenderTarget().setSize(
        window.innerWidth * window.devicePixelRatio,
        window.innerHeight * window.devicePixelRatio
    );
    verticalMirror.getRenderTarget().setSize(
        window.innerWidth * window.devicePixelRatio,
        window.innerHeight * window.devicePixelRatio
    );

}

function animate() {

    requestAnimationFrame( animate );

    const timer = Date.now() * 0.01;

    sphereGroup.rotation.y -= 0.002;

    smallSphere.position.set(
        Math.cos( timer * 0.1 ) * 30,
        Math.abs( Math.cos( timer * 0.2 ) ) * 20 + 5,
        Math.sin( timer * 0.1 ) * 30
    );
    smallSphere.rotation.y = ( Math.PI / 2 ) - timer * 0.1;
    smallSphere.rotation.z = timer * 0.8;

    renderer.render( scene, camera );

}

export function FibonacciRedux() {
    const value = useSelector((state) => state.fibonacci.V)
    const dispatch = useDispatch()

    return (
        <div>
            <div>
                <button
                    aria-label="generate"
                    onClick={() => dispatch(generate())}
                >
                    Generate Redux
                </button>
                <textarea value={value}></textarea>
            </div>
        </div>
    )
}


// Idea for the generator design pattern
// Start with state version and state generator variables
// Functions for generating for each generator variable
// Render Function based on state version
// main function to render the values appropriately
// TODO: investigate reduction
function FibonacciState() {
    const [stateX, setStateX] = useState('a');
    const [stateY, setStateY] = useState('b');
    const [stateZ, setStateZ] = useState('');
    const [state, setState] = useState('Z');

    function stateXGenerator() {
        setStateX(stateY + stateZ);
        setState('Y');
    }

    function stateYGenerator() {
        setStateY(stateZ + stateX);
        setState('Z');
    }

    function stateZGenerator() {
        setStateZ(stateX + stateY);
        setState('X');
    }

    function Generate() {
        switch (state) {
            case 'X': stateXGenerator(); break;
            case 'Y': stateYGenerator(); break;
            case 'Z': stateZGenerator(); break;
        }
    }

    function Render() {
        switch (state) {
            case 'X': return (<textarea value={stateX}></textarea>)
            case 'Y': return (<textarea value={stateY}></textarea>)
            case 'Z': return (<textarea value={stateZ}></textarea>)
        }
    }

    return (
        <div>
            <button type="submit" onClick={Generate}>
                Generate
            </button>
            {
                Render()
            }
        </div>
    );
}


function EditProfile() {
    const [firstName, setFirstName] = useState(' ');
    const [lastName, setLastName] = useState(' ');
    const [edit, setEdit] = useState(false);

    // Fragment
    // The reason why the Edit button can be placed in a component is because
    // it doesn't have any values that need to be changed.
    function Edit() {
        if (edit)
            return (
                <button type="submit" >
                    Save Profile
                </button>
            )
        else    
            return (
                <button type="submit">
                    Edit Profile
                </button>
            )
    }

    function FirstName({ firstName }) {
        return (
            <label>
                First name:{' '}
                {
                    (edit) ?
                        (
                            <input value={firstName} onChange={e => setFirstName(e.target.value)} />
                        ) :
                        (
                            <i>{firstName}</i>
                        )
                }
            </label>
        );
    }
    FirstName.propTypes = {
        firstName: PropTypes.string.isRequired
    }
    
    // The values in the label for first and last name changes which needs to be
    // rerendered within the main form branch.
    return (
        <form onSubmit={e => { e.preventDefault(); setEdit(!edit); }}>
            <FirstName firstName={firstName}/>
           <label>
                Last name:{' '}
                {
                    (edit) ?
                        (
                            <input value={lastName} onChange={e => setLastName(e.target.value)} />
                        ) :
                        (
                            <i>{lastName}</i>
                        )
                }
            </label>
            <Edit />
            <p><i>Hello, {firstName} {lastName} !</i></p>
        </form>
    );
}


function Profile({ name }) {
    return (
        <>
            <h3> {name} <img
                src="https://th.bing.com/th/id/R.b8b237b649495e4f40809e688f3d42d8?rik=tI0%2bbvO1PUVHpg&riu=http%3a%2f%2fpixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com%2fimage%2fba79ccaf05eaf17.png&ehk=Am57ejsedPsZBAjirb1YceWmxJjnatK%2bIQNJQGRmd6I%3d&risl=&pid=ImgRaw&r=0"
                width="60"
                height="60"
                alt="cat"
            /> </h3>
        </>
    );
}
Profile.propTypes = {
    name: PropTypes.string.isRequired
}


// template 
function ProfileLine() {
    return (
        <section>
            <h1>Proptypes</h1>
            <section>
                <Profile name="1"/>
            </section>
            <section>
                <Profile name="2"/>
            </section>
            <section>
                <Profile name="3"/>
            </section>
        </section>
    );
}

function App() {
    const [students, setStudents] = useState();

    useEffect(() => {
        populateStudentData();
    }, []);

    const contents = students === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>DBN</th>
                    <th>Date</th>
                    <th>Enrolled</th>
                    <th>Absent</th>
                    <th>Present</th>
                    <th>Released</th>
                </tr>
            </thead>
            <tbody>
                {students.map(student =>
                    <tr key={student.id}>
                        <td>{student.dbn}</td>
                        <td>{student.date}</td>
                        <td>{student.enrolled}</td>
                        <td>{student.absent}</td>
                        <td>{student.present}</td>
                        <td>{student.released}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <SignalR />
            <FibonacciRedux />
            <FibonacciState />
            <EditProfile />
            <ProfileLine />
            <Canvas />
            <h1 id="tabelLabel">Student student</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>
    );
    
    async function populateStudentData() {
        const response = await fetch('student');
        const data = await response.json();
        setStudents(data);
    }
}

export default App;
