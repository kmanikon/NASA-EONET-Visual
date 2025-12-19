import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

export default function Earth() {
  const texture = useLoader(
    TextureLoader,
    "/textures/earth_daymap2.png"
  );

  return (
    <mesh>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}
