import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r125/three.module.js';

const heroSection = document.getElementById('hero');
const heroRect = heroSection.getBoundingClientRect();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, heroRect.width / heroRect.height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(heroRect.width, heroRect.height);
heroSection.appendChild(renderer.domElement);

const particlesGeometry = new THREE.BufferGeometry();
const particlesMaterial = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 0.03 });

const particlesVertices = [];
for (let i = 0; i < 1000; i++) {
    const x = (Math.random() - 0.5) * 10;
    const y = (Math.random() - 0.5) * 10;
    const z = (Math.random() - 0.5) * 10;
    particlesVertices.push(x, y, z);
}

particlesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(particlesVertices, 3));
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

camera.position.z = 5;

const animate = function () {
    requestAnimationFrame(animate);

    const newRect = heroSection.getBoundingClientRect();
    if (newRect.width !== heroRect.width || newRect.height !== heroRect.height) {
        heroRect.width = newRect.width;
        heroRect.height = newRect.height;
        renderer.setSize(heroRect.width, heroRect.height);
        camera.aspect = heroRect.width / heroRect.height;
        camera.updateProjectionMatrix();
    }

    particles.rotation.x += 0.001;
    particles.rotation.y += 0.001;

    renderer.render(scene, camera);
};

animate();