import { useEonetEvents } from "./hooks/useEonetEvents";
import EarthScene from "./components/scene/EarthScene";
import CircularProgress from '@mui/material/CircularProgress';
import InfoTooltip from "./components/ui/InfoTooltip";

import './App.css';

export default function App() {
  const { events, loading } = useEonetEvents();

  if (loading) return (
    <div className="App">
      <div className="App-header" style={{ height: "100vh", textAlign: 'center', display: 'flex', alignItems: 'center' }}>
        <div>
        <div style={{padding: 30}}>
          Loading EONET Data …
        </div>
        <CircularProgress size="60px"/>
        </div>
      </div>
    </div>

  );

  return (
    <div className="App">
      <div className="App-header" style={{ height: "100vh" }}>
        <EarthScene events={events} />
      </div>
      <div style={{position: 'absolute', zIndex: 1, right: 10, top: 10}}>
        <InfoTooltip/>
      </div>
    </div>
  );
}
