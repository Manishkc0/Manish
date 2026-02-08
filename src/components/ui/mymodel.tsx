'use client';
import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';

// 3D Model Component with manual loading and fallback
function Model3D({ modelPath, zoom, scrollRotation, animationType = 'rotate' }: { modelPath: string; zoom: number; scrollRotation: number; animationType?: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [model, setModel] = useState<THREE.Group | null>(null);

  // Load model manually without Suspense
  useEffect(() => {
    const loader = new GLTFLoader();
    
    loader.load(
      modelPath,
      (gltf) => {
        console.log('Model loaded:', gltf);
        const scene = gltf.scene;
        scene.scale.set(0.02, 0.02, 0.02);
        scene.position.set(0, 0, 0);
        scene.rotation.set(0, 0, 0);
        setModel(scene);
        console.log('Model loaded successfully');
      },
      (progress) => {
        console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
      },
      (error) => {
        console.error('Failed to load model:', error);
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

  useFrame(({ camera }) => {
    if (groupRef.current && model) {
      // Apply different animation effects based on type
      switch(animationType) {
        case 'flip':
          // Flip animation
          groupRef.current.rotation.x = Math.sin(scrollRotation * 2) * Math.PI;
          groupRef.current.rotation.y = mouse.x * Math.PI * 0.1 + scrollRotation;
          break;
        case 'zoom':
          // Zoom effect (scale changes)
          const scale = 1 + Math.sin(scrollRotation) * 0.3;
          groupRef.current.scale.set(scale, scale, scale);
          groupRef.current.rotation.x = mouse.y * Math.PI * 0.15;
          groupRef.current.rotation.y = mouse.x * Math.PI * 0.15 + scrollRotation * 0.5;
          break;
        case 'spiral':
          // Spiral animation
          groupRef.current.rotation.x = scrollRotation * 2;
          groupRef.current.rotation.y = scrollRotation * 3;
          groupRef.current.rotation.z = scrollRotation;
          groupRef.current.position.y = Math.sin(scrollRotation) * 0.5;
          break;
        case 'pendulum':
          // Pendulum swing animation
          groupRef.current.rotation.z = Math.sin(scrollRotation * 2) * 0.5;
          groupRef.current.rotation.y = mouse.x * Math.PI * 0.1;
          groupRef.current.rotation.x = mouse.y * Math.PI * 0.1;
          break;
        case 'bounce':
          // Bounce animation
          groupRef.current.position.y = Math.abs(Math.sin(scrollRotation * 3)) * 1.5 - 0.75;
          groupRef.current.rotation.y = mouse.x * Math.PI * 0.1 + scrollRotation;
          groupRef.current.rotation.x = mouse.y * Math.PI * 0.1;
          break;
        default: // 'rotate'
          // Default smooth rotation
          groupRef.current.rotation.x = mouse.y * Math.PI * 0.15 + scrollRotation * 0.3;
          groupRef.current.rotation.y = mouse.x * Math.PI * 0.15 + scrollRotation * 0.5;
      }
    }
    camera.position.z = 10 / zoom;
  });

  return <group ref={groupRef}>{model && <primitive object={model} />}</group>;
}

// Main Component
interface ModelViewerProps {
  sketchfabModelUrl?: string;
  height?: string;
  isFullScreen?: boolean;
  animationType?: string;
}

export default function ModelViewer({
  sketchfabModelUrl = '/mymdels/scene.gltf',
  height = '600px',
  isFullScreen = false,
  animationType = 'rotate'
}: ModelViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [scrollRotation, setScrollRotation] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      setZoom((prev) => {
        const newZoom = prev + (e.deltaY > 0 ? -0.1 : 0.1);
        return Math.max(0.5, Math.min(newZoom, 3)); // Limit zoom between 0.5 and 3
      });
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrollRotation(scrollTop * 0.01);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: isFullScreen ? '100vw' : '100%',
        height: isFullScreen ? '100vh' : height,
        background: '#1a1a1a',
        position: isFullScreen ? 'fixed' : 'relative',
        top: isFullScreen ? 0 : 'auto',
        left: isFullScreen ? 0 : 'auto',
        cursor: 'grab',
        margin: isFullScreen ? 0 : '20px 0',
        borderRadius: isFullScreen ? 0 : '8px',
        overflow: 'hidden'
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
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
        <Model3D modelPath={sketchfabModelUrl} zoom={zoom} scrollRotation={scrollRotation} animationType={animationType} />
      </Canvas>

      {/* Zoom hint */}
      <div style={{
        position: 'absolute',
        bottom: 12,
        right: 12,
        fontSize: '12px',
        color: 'rgba(255, 255, 255, 0.5)',
        pointerEvents: 'none',
        textAlign: 'right'
      }}>
        <div>Scroll to animate</div>
        <div>Move cursor to rotate</div>
      </div>
    </div>
  );
}
