const BASE_URL = process.env.REACT_APP_EONET_URL;

export async function fetchEvents({
  days = 1,
  limit = 200,
  status = "open",
} = {}) {
try {
    if (sessionStorage.getItem("eonet_data") != null) {
        const eonet_json = JSON.parse(sessionStorage.getItem("eonet_data"))
        if (eonet_json?.events && eonet_json?.events?.length > 0) {
            return eonet_json?.events
        }
    }
    const res = await fetch(
        `${BASE_URL}/events?days=${days}&limit=${limit}&status=${status}`
    );
    const data = await res.json();
    sessionStorage.setItem("eonet_data", JSON.stringify(data))
    return data?.events;
} catch (e) {
    console.log("error fetching nasa eonet api...")
    return []
}
}
