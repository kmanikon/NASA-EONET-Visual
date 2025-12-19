import { useEonetEvents } from "./hooks/useEonetEvents";
import EarthScene from "./components/scene/EarthScene";

import './App.css';

export default function App() {
  const { events, loading } = useEonetEvents();

  if (loading) return <div>Loading events…</div>;

  return (
    <div className="App">
      <div className="App-header" style={{ height: "100vh" }}>
        <EarthScene events={events} />
      </div>
    </div>
  );
}
