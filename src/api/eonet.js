import backup_data from './backup_data.json';

const BASE_URL = process.env.REACT_APP_EONET_URL;

export async function fetchEvents({
  days = 7,
  limit = 200,
  status = "open",
} = {}) {
try {
    if (sessionStorage.getItem("eonet_data") != null) {
        const eonet_json = JSON.parse(sessionStorage.getItem("eonet_data"))
        if (eonet_json?.events && eonet_json?.events?.length > 0) {
            if (eonet_json?.events?.length == 0) {
                return backup_data?.events || [];
            } 
            return eonet_json?.events || [];
            
        } else {
            sessionStorage.removeItem("eonet_data");
        }
    }
    const res = await fetch(
        `${BASE_URL}/events?days=${days}&limit=${limit}&status=${status}`
    );
    const data = await res.json();
    sessionStorage.setItem("eonet_data", JSON.stringify(data))
    if (data?.events?.length == 0) {
        return backup_data?.events || []
    }
    return data?.events || [];
} catch (e) {
    console.log("error fetching nasa eonet api...")
    console.log(e)
    return backup_data?.events || [];
}
}
