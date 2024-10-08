import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, Html } from "@react-three/drei"; // Используем Html для отображения

const modelFolders = ["ball", "cat", "gears", "pokeball", "rat"];

const Earth = ({ modelPath }) => {
  const { scene } = useGLTF(`/3dModels/${modelPath}/scene.gltf`); 
  return <primitive object={scene} scale={2} position-y={0} rotation-y={0} />;
};

const EarthCanvas = () => {
  const [modelIndex, setModelIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
    const interval = setInterval(() => {
      setIsLoading(true);
      setModelIndex((prevIndex) => (prevIndex + 1) % modelFolders.length);
      setIsLoading(false);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const modelPath = modelFolders[modelIndex];

  return (
    <Canvas
      style={{ height: "300px" }}
      shadows
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.2,
        far: 100,
        position: [-4, 3, 6],
      }}
    >
      <Suspense fallback={<Html><div style={{ color: 'white' }}>Loading...</div></Html>}> {/* Используем Html для fallback */}
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI}
          minPolarAngle={Math.PI / 8}
        />
        <ambientLight intensity={0.9} />
        <directionalLight
          intensity={1}
          position={[1, 1, 1]}
          castShadow
        />
        <directionalLight position={[-1, -1, -1]} intensity={0.9} />
        <Earth modelPath={modelPath} />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
