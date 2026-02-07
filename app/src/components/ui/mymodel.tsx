'use client';
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';

// 3D Model Component with manual loading and fallback
function Model3D({ modelPath }: { modelPath: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [model, setModel] = useState<THREE.Group | null>(null);
  const [useFallback, setUseFallback] = useState(false);

  // Load model manually without Suspense
  useEffect(() => {
    const loader = new GLTFLoader();
    
    loader.load(
      modelPath,
      (gltf) => {
        setModel(gltf.scene);
        setUseFallback(false);
        console.log('Model loaded successfully');
      },
      undefined,
      (error) => {
        console.error('Failed to load model:', error);
        setUseFallback(true);
      }
    );
  }, [modelPath]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMouse({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x = mouse.y * Math.PI * 0.5;
      groupRef.current.rotation.y = mouse.x * Math.PI * 0.5;
    }
  });

  // Show fallback cube if model loading failed
  if (useFallback || !model) {
    return (
      <mesh ref={groupRef}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#d3772b" />
      </mesh>
    );
  }

  return <group ref={groupRef}>{model && <primitive object={model} />}</group>;
}

// Main Component
interface ModelViewerProps {
  sketchfabModelUrl?: string;
  height?: string;
}

export default function ModelViewer({
  sketchfabModelUrl = '/mymdels/scene.gltf',
  height = '500px'
}: ModelViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height,
        borderRadius: '8px',
        overflow: 'hidden',
        background: '#1a1a1a',
        position: 'relative'
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ width: '100%', height: '100%', display: 'block' }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          failIfMajorPerformanceCaveat: false
        }}
      >
        <color attach="background" args={['#1a1a1a']} />
        
        {/* Lighting */}
        <ambientLight intensity={0.9} />
        <directionalLight position={[10, 10, 10]} intensity={2} />
        <directionalLight position={[-10, -10, -10]} intensity={0.8} />
        <pointLight position={[0, 5, 5]} intensity={1.5} color="#d3772b" />
        
        {/* 3D Objects */}
        <Model3D modelPath={sketchfabModelUrl} />
      </Canvas>
    </div>
  );
}
