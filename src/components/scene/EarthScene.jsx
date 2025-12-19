import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Earth from "./Earth";
import EventMarkers from "./EventMarkers";

function CameraIntro({ targetDistance = 5 }) {
  const { camera } = useThree();
  const startZ = 2000; // max distance 
  const speed = 0.025; // transition speed
  const doneRef = useRef(false);

  useEffect(() => {
    camera.position.set(0, 0, startZ);
  }, [camera]);

  useFrame(() => {
    if (doneRef.current) return;

    camera.position.z = THREE.MathUtils.lerp(
      camera.position.z,
      targetDistance,
      speed
    );

    if (Math.abs(camera.position.z - targetDistance) < 0.01) {
      camera.position.z = targetDistance;
      doneRef.current = true;
    }
  });

  return null;
}

export default function EarthScene({ events }) {
  return (
    <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
      {/* Intro zoom animation */}
      <CameraIntro targetDistance={4} />

      <ambientLight intensity={5} />
      <directionalLight position={[5, 5, 5]} intensity={2.5} />

      <Stars radius={100} depth={50} count={4000} />

      <Earth />
      <EventMarkers events={events} />

      <OrbitControls
        enablePan={false}
        minDistance={1.1}
        maxDistance={2000}
        rotateSpeed={1}
        dampingFactor={0.075}
        enableDamping
      />
    </Canvas>
  );
}
