import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import Earth from "./Earth";
import EventMarkers from "./EventMarkers";

export default function EarthScene({ events }) {
  return (
    <Canvas camera={{ position: [0, 0, 4] }}>
      <ambientLight intensity={5} />
      <directionalLight position={[5, 5, 5]} intensity={2.5} />

      <Stars radius={100} depth={50} count={4000} />

      <Earth />
      <EventMarkers events={events} />

      <OrbitControls enablePan={false} />
    </Canvas>
  );
}
