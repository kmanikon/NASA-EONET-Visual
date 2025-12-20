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

  const latestGeometry = event?.geometry?.[event.geometry.length - 1];
  const category = event?.categories?.[0];
  const source = event?.sources?.[0];


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
                zIndex: 9999,
                pointerEvents: "auto",
              },
            }}
            title={
              <div style={{ maxWidth: 260 }}>
                {/* Title */}
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 600, mb: 0.25 }}
                >
                  {event.title}
                </Typography>

                {/* Category */}
                {category && (
                  <Typography
                    variant="caption"
                    sx={{ color: "#90caf9", display: "block", mb: 0.5 }}
                  >
                    {category.title}
                  </Typography>
                )}

                {/* Description */}
                <Typography
                  variant="body2"
                  sx={{ color: "#ccc", mb: 0.75 }}
                >
                  {event.description || "No description available."}
                </Typography>

                {/* Magnitude + Date */}
                {latestGeometry && (
                  <Typography
                    variant="caption"
                    sx={{ color: "#aaa", display: "block" }}
                  >
                    {latestGeometry.magnitudeValue && (
                      <>
                        Magnitude:{" "}
                        <strong>
                          {latestGeometry.magnitudeValue}{" "}
                          {latestGeometry.magnitudeUnit}
                        </strong>
                        {" • "}
                      </>
                    )}
                    {new Date(latestGeometry.date).toLocaleDateString()}
                  </Typography>
                )}

                {/* Source link */}
                {source?.url && (
                  <Typography
                    variant="caption"
                    sx={{ mt: 0.5, display: "block" }}
                  >
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#4fc3f7", textDecoration: "none" }}
                    >
                      View source ↗
                    </a>
                  </Typography>
                )}
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
