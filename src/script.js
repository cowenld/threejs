import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()

const geometry = new THREE.BufferGeometry();
const count = 500;
const positionsArr = new Float32Array(count * 3 * 3);

for(let i = 0; i< count * 3 * 3; i++) {
    positionsArr[i] = (Math.random() - 0.5) * 7;
}

const positionsAttrs = new THREE.BufferAttribute(positionsArr, 3);
geometry.setAttribute('position', positionsAttrs);



const material = new THREE.MeshBasicMaterial({ color: 0xcc0000, wireframe: true })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const geometry2 = new THREE.BufferGeometry();
const positionsArr2 = new Float32Array(count * 3 * 3);

for(let i = 0; i< count * 3 * 3; i++) {
    positionsArr2[i] = (Math.random() - 0.5) * 7;
}

const positionsAttrs2 = new THREE.BufferAttribute(positionsArr2, 3);
geometry2.setAttribute('position', positionsAttrs2);

const material2 = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true })
const mesh2 = new THREE.Mesh(geometry2, material2)
scene.add(mesh2)


// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()