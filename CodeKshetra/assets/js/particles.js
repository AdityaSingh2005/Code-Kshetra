/**
 * Particle Animation Script using Three.js
 * 
 * Author: Navneet Baid
 * Last Updated: 07/01/2024
 * Description: This script creates a simple particle animation in the background
 *              of a webpage's hero section using Three.js library.
 */

import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r125/three.module.js';

const heroSection = document.getElementById('hero');
const heroRect = heroSection.getBoundingClientRect();

// Set up Three.js scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, heroRect.width / heroRect.height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(heroRect.width, heroRect.height);
heroSection.appendChild(renderer.domElement);

// Create particle geometry and material
const particlesGeometry = new THREE.BufferGeometry();
const particlesMaterial = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 0.03 });

// Generate random particle vertices
const particlesVertices = [];
for (let i = 0; i < 1000; i++) {
    const x = (Math.random() - 0.5) * 10;
    const y = (Math.random() - 0.5) * 10;
    const z = (Math.random() - 0.5) * 10;
    particlesVertices.push(x, y, z);
}

// Set particle positions in the geometry
particlesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(particlesVertices, 3));
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

// Set initial camera position
camera.position.z = 5;

// Animation function
const animate = function () {
    requestAnimationFrame(animate);

    // Check if the dimensions of the hero section have changed
    const newRect = heroSection.getBoundingClientRect();
    if (newRect.width !== heroRect.width || newRect.height !== heroRect.height) {
        heroRect.width = newRect.width;
        heroRect.height = newRect.height;

        // Update renderer and camera aspect ratio
        renderer.setSize(heroRect.width, heroRect.height);
        camera.aspect = heroRect.width / heroRect.height;
        camera.updateProjectionMatrix();
    }

    // Rotate the particles for animation
    particles.rotation.x += 0.001;
    particles.rotation.y += 0.001;

    // Render the scene with the updated camera and particles position
    renderer.render(scene, camera);
};

// Start the animation loop
animate();