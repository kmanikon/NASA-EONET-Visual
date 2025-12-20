import EventMarker from "./EventMarker";

export default function EventMarkers({ events }) {
  return (
    <>
      {events.map((event) => {
        const geom = event?.geometries?.at(-1);
        if (!geom || geom.type !== "Point") return null;

        const [lon, lat] = geom.coordinates;

        return (
          <EventMarker
            key={event.id}
            lat={lat}
            lon={lon}
            category={event.categories[0]?.title}
            event={event}
          />
        );
      })}
    </>
  );
}
