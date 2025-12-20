import { Tooltip, styled, Typography, IconButton } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

// Styled Tooltip
const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip
    {...props}
    arrow
    placement="bottom"
    classes={{ popper: className }}
  />
))(() => ({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: "rgba(30,30,30,0.95)",
    color: "#fff",
    fontSize: 14,
    padding: "12px 16px",
    borderRadius: 10,
    boxShadow: "0px 4px 15px rgba(0,0,0,0.3)",
    maxWidth: 320,
    lineHeight: 1.5,
  },
  [`& .MuiTooltip-arrow`]: {
    color: "rgba(30,30,30,0.95)",
  },
}));

export default function InfoTooltip() {
  return (
    <StyledTooltip
      title={
        <div>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 600, mb: 0.5 }}
          >
            Global Natural Events Visualization
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: "#ccc", mb: 0.75 }}
          >
            This interactive 3D globe displays real-time natural events
            sourced from NASA’s EONET (Earth Observatory Natural Event
            Tracker) API.
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: "#ccc", mb: 0.75 }}
          >
            Markers represent active events such as wildfires and severe
            storms. Selecting a marker reveals detailed information such as 
            magnitude, category, date, and official data sources.
          </Typography>

          <Typography
            variant="caption"
            sx={{ color: "#aaa" }}
          >
            Rotate, zoom, and explore the Earth to find where
            significant natural activity is occurring globally.
          </Typography>
        </div>
      }
    >
      <IconButton
        size="small"
        sx={{
          color: "#bbb",
          "&:hover": { color: "#fff" },
        }}
      >
        <InfoOutlinedIcon fontSize="medium" />
      </IconButton>
    </StyledTooltip>
  );
}
