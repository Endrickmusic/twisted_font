import './styles.css'
import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useControls, Leva } from 'leva'
import TwistedText from './TwistedText.jsx'
import { Instance, OrbitControls, Instances, Stats, Environment, Lightformer } from '@react-three/drei'

function Floor() {
  return (
      <mesh 
      position = {[0, -1,0]}
      rotation-x={-Math.PI / 2} receiveShadow>
          <circleGeometry args={[10]} />
          <meshStandardMaterial 
          color={'white'}
          />
      </mesh>
  )
}


const Grid = ({ number = 23, lineWidth = 0.026, height = 0.5 }) => (
  // Renders a grid and crosses as instances
  <Instances position={[0, -2, 0]}>
    <planeGeometry args={[lineWidth, height]} />
    <meshBasicMaterial color="#999" />
    {Array.from({ length: number }, (_, y) =>
      Array.from({ length: number }, (_, x) => (
        <group key={x + ':' + y} position={[x * 2 - Math.floor(number / 2) * 2, -0.01, y * 2 - Math.floor(number / 2) * 2]}>
          <Instance rotation={[-Math.PI / 2, 0, 0]} />
          <Instance rotation={[-Math.PI / 2, 0, Math.PI / 2]} />
        </group>
      ))
    )}
    <gridHelper args={[100, 100, '#bbb', '#bbb']} position={[0, -0.01, 0]} />
  </Instances>
)

function App() {
  const config = useControls('Text', {
    text: '  Christian Hohenbild  ',
    color: '#ffdc00',
    fontSize: { value: 1, min: 0.1, max: 2 },
    fontDepth: { value: 0.005, min: 0.0001, max: 1.0, step: 0.0001 },
    uRadius: { value: 2.1, min: 0.1, max: 3 },
    uTwists: { value: 1, min: 0, max: 3, step: 0.01 },
    rotation: { value: 1.55, min: 0, max: 2*Math.PI, step: 0.05 },
    uRotateSpeed: { value: 1.2, min: 0, max: 3, step: 0.01 },
    roughness: { value: 0.05, min: 0.0, max: 1.0, step: 0.01 },
    normalScale: { value: 0.05, min: 0.0, max: 1.0, step: 0.01 },
    lightIntensity: { value: 25.0, min: 0.0, max: 100.0, step: 1.0 },
    
  })

  return (
    <>
      <Leva collapsed />
      <Canvas 
        shadows 
        camera={{ position: [0, 2, 5], zoom: 1 }} 
        gl={{ preserveDrawingBuffer: true }}>
        
        <color attach="background" args={['#f2f2f5']} />
        <Grid />
        <Floor />
        <Suspense fallback={null}>
          <TwistedText config={config} />
        </Suspense>
        {/* <Environment 
           files="./Environments/envmap.hdr"
           resolution={32}>

          <group rotation={[-Math.PI / 4, -0.3, 0]}>
            <Lightformer 
            intensity={10} 
            rotation-x={Math.PI / 2} 
            position={[0, 5, -9]} 
            scale={[1, 1, 1]} />
          </group>
         
        </Environment> */}

        {/* <ambientLight> */}
        <directionalLight 
          position={[0, 2, 3]} 
          castShadow
          intensity={config.lightIntensity}
          />
        <OrbitControls
          autoRotateSpeed={-0.1}
          zoomSpeed={0.25}
          minZoom={20}
          maxZoom={100}
          enablePan={false}
          dampingFactor={0.05}
          minPolarAngle={-Math.PI / 2}
          maxPolarAngle={(0.99 * Math.PI) / 2}
        />
        <Stats />
      </Canvas>
    </>
  )
}

export default App
