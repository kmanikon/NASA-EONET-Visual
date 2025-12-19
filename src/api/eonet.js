const BASE_URL = process.env.REACT_APP_EONET_URL;

export async function fetchEvents({
  days = 1,
  limit = 200,
  status = "open",
} = {}) {
try {
    const res = await fetch(
        `${BASE_URL}/events?days=${days}&limit=${limit}&status=${status}`
    );
    const data = await res.json();
    return data.events;
} catch (e) {
    console.log("error fetching nasa eonet api...")
    return []
}
}
