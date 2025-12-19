import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { latLonToVector3 } from "../../utils/geo";
import { Html } from "@react-three/drei";
import { Tooltip, styled, Typography } from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";

// Styled Tooltip
const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip
    {...props}
    arrow
    placement="top"
    classes={{ popper: className }}
  />
))(() => ({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: "rgba(30,30,30,0.95)",
    color: "#fff",
    fontSize: 14,
    padding: "10px 14px",
    borderRadius: 10,
    boxShadow: "0px 4px 15px rgba(0,0,0,0.3)",
    maxWidth: 350,
    lineHeight: 1.4,
  },
  [`& .MuiTooltip-arrow`]: {
    color: "rgba(30,30,30,0.95)",
  },
}));

export default function EventMarker({ lat, lon, event }) {
  const ref = useRef();
  const popperRef = useRef(null);

  const position = latLonToVector3(lat, lon);
  const [visible, setVisible] = useState(true);
  const [open, setOpen] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame(({ camera }) => {
    const distance = camera.position.length();
    if (distance > 5) {
      setVisible(false);
    } else if (ref.current) {
      const markerPos = ref.current.getWorldPosition(
        ref.current.position.clone()
      );
      const dirToMarker = markerPos.clone().sub(camera.position).normalize();
      const normal = markerPos.clone().normalize();
      const dotProduct = normal.dot(dirToMarker);
      setVisible(dotProduct < 0);
    }

    // keep tooltip locked to marker while open
    if ((open || clicked) && popperRef.current) {
      popperRef.current.update();
    }
  });

  return (
    <mesh ref={ref} position={position}>
      {visible && (
        <Html
          style={{ pointerEvents: "auto" }}
          zIndexRange={[100, 0]}
        >
          <StyledTooltip
            open={open || clicked}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            onMouseDown={() => setClicked((v) => !v)}
            PopperProps={{
              popperRef,
              sx: {
                zIndex: 9999, // 🔝 always above other markers
                pointerEvents: "auto",
              },
            }}
            title={
              <div style={{ overflow: "hidden" }}>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 600, mb: 0.5 }}
                >
                  {event.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "#ccc", m: 0 }}>
                  {event.description
                    ? event.description.slice(0, 100)
                    : "No description"}
                </Typography>
              </div>
            }
          >
            <RoomIcon
              className="marker-icon"
              style={{
                cursor: "pointer",
                filter: "drop-shadow(0 0 1px black)",
              }}
            />
          </StyledTooltip>
        </Html>
      )}
    </mesh>
  );
}
