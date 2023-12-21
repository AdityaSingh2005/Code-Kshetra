import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r125/three.module.js';
import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r125/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r125/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 40;

const renderer = new THREE.WebGLRenderer();
renderer.outputEncoding = THREE.sRGBEncoding;
document.getElementById('logoCanvas').appendChild(renderer.domElement);

const gltfLoader = new GLTFLoader();

let object;
let ambientLightIntensity = 0.8; // Set initial ambient light intensity

const initialScale = window.innerWidth < 600 ? 0.05 : 0.1; // Adjust scale for small devices

gltfLoader.load('./assets/3DLogo.gltf', (gltf) => {
    gltf.scene.scale.set(initialScale, initialScale, initialScale);
    scene.add(gltf.scene);

    const ambientLight = new THREE.AmbientLight(0xffffff, ambientLightIntensity);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const boundingBox = new THREE.Box3().setFromObject(gltf.scene);
    const center = boundingBox.getCenter(new THREE.Vector3());
    const size = boundingBox.getSize(new THREE.Vector3());

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

const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
controls.enableZoom = false;

const animate = () => {
    requestAnimationFrame(animate);

    if (object) {
        if (controls.autoRotate) {
            object.rotation.y += 0.0001;
        }
    }

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

    controls.update();
    renderer.render(scene, camera);

    // Update background color based on ambient light intensity
    const ambientColor = new THREE.Color(0x060c22); // Dark blue color
    renderer.setClearColor(ambientColor);
};

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

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