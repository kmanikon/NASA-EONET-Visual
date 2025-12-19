import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { latLonToVector3 } from "../../utils/geo";
import { Html } from "@react-three/drei";
import { Tooltip } from "@mui/material";
import ModeStandbyIcon from '@mui/icons-material/ModeStandby';
import RoomIcon from '@mui/icons-material/Room';

export default function EventMarker({ lat, lon, event }) {
  const ref = useRef();
  const position = latLonToVector3(lat, lon);
  const [visible, setVisible] = useState(true);

  useFrame(({ camera }) => {
    const distance = camera.position.length();
    if (distance > 5) {
        setVisible(false)
    }
    else if (ref.current) {
      // Get the marker's world position
      const markerPos = ref.current.getWorldPosition(ref.current.position.clone());
      
      // Get direction from camera to marker
      const dirToMarker = markerPos.clone().sub(camera.position).normalize();
      
      // Get direction from sphere center to marker (the normal at this point)
      const normal = markerPos.clone().normalize();
      
      // If the dot product is positive, the marker is facing away from camera
      const dotProduct = normal.dot(dirToMarker);
      
      setVisible(dotProduct < 0);
    }
  });

  return (
    <mesh ref={ref} position={position}>
      {visible && (
        <Html>
          <Tooltip
            title={
                <div style={{ maxWidth: 400, fontSize: 14, zIndex: 1 }}>
                <strong>{event.title}</strong>
                <p style={{ margin: 0}}>
                    {event.description ? event.description.slice(0, 100) + "…" : "No description"}
                </p>
                </div>
            }
            arrow
            >
          <RoomIcon style={{color: 'red', zIndex: -1, fontSize: 48}}/>
        </Tooltip>
        </Html>
      )}
    </mesh>
  );
}