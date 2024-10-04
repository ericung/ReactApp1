import React from 'react';
import * as THREE from 'three';

export default class Canvas extends React.Component {
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

