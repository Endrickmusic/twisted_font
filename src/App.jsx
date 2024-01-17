import './styles.css'
import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useControls, Leva } from 'leva'
import MyText from './TwistedText'
import { Instance, OrbitControls, Instances, Stats, Environment, Lightformer } from '@react-three/drei'

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
    text: 'HELLO,HELLO,',
    color: '#f60',
    fontSize: { value: 1, min: 0.1, max: 2 },
    fontDepth: { value: 0.5, min: 0.01, max: 3.5 },
    uRadius: { value: 1.5, min: 0.1, max: 3 },
    uTwists: { value: 1, min: 0, max: 3, step: 1 },
    uTwistSpeed: { value: 35, min: 0, max: 100, step: 1 },
    uRotateSpeed: { value: 0.5, min: 0, max: 3, step: 0.01 }
  })

  return (
    <>
      <Leva collapsed />
      <Canvas shadows camera={{ position: [0, 2, 5], zoom: 1 }} gl={{ preserveDrawingBuffer: true }}>
        <color attach="background" args={['#f2f2f5']} />
        <Grid />

        <Suspense fallback={null}>
          <MyText config={config} />
        </Suspense>
        <Environment resolution={32}>
          <group rotation={[-Math.PI / 4, -0.3, 0]}>
            <Lightformer intensity={20} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[1, 1, 1]} />
          </group>
        </Environment>

        <ambientLight />
        <pointLight position={[10, 10, 10]} />
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
