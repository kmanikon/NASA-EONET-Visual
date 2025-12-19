import { useEffect, useState } from "react";
import { fetchEvents } from "../api/eonet";

export function useEonetEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents().then((events) => {
      setEvents(events);
      setLoading(false);
    });
  }, []);

  return { events, loading };
}
