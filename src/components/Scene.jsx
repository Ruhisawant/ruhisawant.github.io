import { Environment, OrbitControls } from "@react-three/drei";
import { Book } from "./Book";

// 3D Scene components
export const Scene = () => {
  return (
    <>
      {/* Main Book Container */}
      <group
        position-y={0.1}
        rotation-x={-Math.PI / 15}
        rotation-y={-Math.PI / 35}
        rotation-z={-0.03}
      >
        <Book scale={1.5} />
      </group>

      {/* Camera Interaction */}
      <OrbitControls enableZoom={false} />

      {/* Environment Lighting Preset */}
      <Environment preset="studio" />

      {/* Primary Directional Light with Shadow Casting */}
      <directionalLight
        position={[2, 5, 2]}
        intensity={0.8}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />

      {/* Ground Plane for Shadow Reception */}
      <mesh
        position-y={-1.5}
        rotation-x={-Math.PI / 2}
        receiveShadow
      >
        <planeGeometry args={[100, 100]} />
        <shadowMaterial transparent opacity={0.2} />
      </mesh>
    </>
  );
};