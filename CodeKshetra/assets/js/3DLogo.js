/**
 * 3D Logo Animation Script
 * 
 * Author: Navneet Baid
 * Last Updated: 07/01/2024
 * 
 * Description: 
 * This script uses Three.js to create a 3D logo animation with lighting and interactive controls.
 */

import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r125/three.module.js';
import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r125/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r125/examples/jsm/controls/OrbitControls.js';

// Set up Three.js scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 40;
const renderer = new THREE.WebGLRenderer();
renderer.outputEncoding = THREE.sRGBEncoding;
document.getElementById('logoCanvas').appendChild(renderer.domElement);

// Load 3D logo model using GLTFLoader
const gltfLoader = new GLTFLoader();
let object;
// Set initial ambient light intensity
let ambientLightIntensity = 0.8; 

// Function to calculate initial scale based on screen size
const getInitialScale = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (width < 600 && height < 600) {
        // Phone
        return 0.04;
    } else if (width < 1024 && height < 768) {
        // Tablet
        return 0.05;
    } else if (width < 1440) {
        // Laptop
        return 0.08;
    } else if (width < 1920) {
        // Monitor
        return 0.1;
    } else {
        // TV or larger screens
        return 0.15;
    }
};

const initialScale = getInitialScale();

// Load the 3D logo model and set initial scale
gltfLoader.load('./assets/3DLogo.gltf', (gltf) => {
    gltf.scene.scale.set(initialScale, initialScale, initialScale);
    scene.add(gltf.scene);

    // Add ambient light and directional light to the scene
    const ambientLight = new THREE.AmbientLight(0xffffff, ambientLightIntensity);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Set camera position and orientation based on the 3D model
    const boundingBox = new THREE.Box3().setFromObject(gltf.scene);
    const center = boundingBox.getCenter(new THREE.Vector3());
    const size = boundingBox.getSize(new THREE.Vector3());

    // Additional camera and focus adjustments
    const maxSize = Math.max(size.x, size.y, size.z);
    const fitHeightDistance = maxSize / (2 * Math.atan((Math.PI * camera.fov) / 360));
    const fitWidthDistance = fitHeightDistance / camera.aspect;
    const distance = 1.2 * Math.max(fitHeightDistance, fitWidthDistance);

    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    const focusPoint = direction.clone().multiplyScalar(distance).add(center);
    camera.lookAt(focusPoint);

    object = gltf.scene;
});

// Set up OrbitControls for interactive camera movement
const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
controls.enableZoom = false;

// Animation function
const animate = () => {
    requestAnimationFrame(animate);

    // Rotate the object if autoRotate is enabled
    if (object) {
        if (controls.autoRotate) {
            object.rotation.y += 0.0001;
        }
    }

    // Update camera and renderer based on window size
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Update controls and render the scene
    controls.update();
    renderer.render(scene, camera);

    // Update background color based on ambient light intensity
    const ambientColor = new THREE.Color(0x060c22); // Dark blue color
    renderer.setClearColor(ambientColor);
};

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Intersection observer to trigger animation when the aboutCodeKshetra Section is in view
const aboutCodeKshetraSection = document.getElementById('aboutCodeKshetra');
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // If the aboutCodeKshetra section is in view, start the animation
                animate();
                // Stop observing after the first trigger
                observer.unobserve(aboutCodeKshetraSection);
            } else {
                // If not in view, stop the animation
                controls.autoRotate = true;
            }
        });
    },
    { threshold: 0.5 } // Adjust threshold as needed
);

observer.observe(aboutCodeKshetraSection);