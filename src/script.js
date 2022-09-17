import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Loader
const textureLoader = new THREE.TextureLoader()

const normalTexture = textureLoader.load('/textures/NormalMap.png')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereGeometry( .5, 64, 64 );

// Materials

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.normalMap = normalTexture
material.color = new THREE.Color(0x292929)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

// White Light
const pointLight2 = new THREE.PointLight(0xFFFFFF, 2)
pointLight2.position.set(0, -3.6, 0)
pointLight2.intensity = 6

// Create GUI Folder
const light1 = gui.addFolder('Light 1')

light1.add(pointLight2.position, 'x')
light1.add(pointLight2.position, 'y')
light1.add(pointLight2.position, 'z')
light1.add(pointLight2, 'intensity')

// const pointLightHelper = new THREE.PointLightHelper(pointLight2, 1)
// scene.add(pointLightHelper)

// Blue Light
const pointLight3 = new THREE.PointLight(0x0000FF, 2)
pointLight3.position.set(18, 9, 1)
pointLight3.intensity = 10

// Create GUI Folder
const light2 = gui.addFolder('Light 2')

light2.add(pointLight3.position, 'x')
light2.add(pointLight3.position, 'y')
light2.add(pointLight3.position, 'z')
light2.add(pointLight3, 'intensity')

// const pointLightHelperBlue = new THREE.PointLightHelper(pointLight3, 1)
// scene.add(pointLightHelperBlue)

scene.add(pointLight)
scene.add(pointLight2)
scene.add(pointLight3)

/**
 * Sizes
 */
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

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowX = window.innerWidth /2;
const windowY = window.innerHeight / 2;

function onDocumentMouseMove (event){
    mouseX = (event.clientX - windowX)
    mouseY = (event.clientY - windowY)
}

const clock = new THREE.Clock()

const tick = () =>
{
    // Animate
    targetX = mouseX * .001
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects -> Movement continious over time
    sphere.rotation.y = .5 * elapsedTime

    // Animate movement on mouse hover
    sphere.rotation.x += .25 * (targetY - sphere.rotation.x)
    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.rotation.z += .5 * (targetY - sphere.rotation.z)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()