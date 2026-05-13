import { dashboardFallback } from "../data/dashboardData";

const DATA_GOV_BASE =
  import.meta.env.VITE_DATA_GOV_BASE || "https://api.data.gov.in/resource";
const DATA_GOV_RESOURCE_ID = import.meta.env.VITE_DATA_GOV_RESOURCE_ID;
const DATA_GOV_API_KEY = import.meta.env.VITE_DATA_GOV_API_KEY;

async function fetchLiveDataset() {
  if (!DATA_GOV_RESOURCE_ID || !DATA_GOV_API_KEY) {
    return null;
  }

  const url =
    `${DATA_GOV_BASE}/${DATA_GOV_RESOURCE_ID}` +
    `?api-key=${DATA_GOV_API_KEY}&format=json&limit=25`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Live dataset request failed: ${response.status}`);
  }

  return response.json();
}

export async function getDashboardData() {
  try {
    const liveResponse = await fetchLiveDataset();

    if (!liveResponse?.records?.length) {
      return {
        ...dashboardFallback,
        meta: {
          source: "स्थिर नमूना आंकड़े",
          live: false,
        },
      };
    }

    return {
      ...dashboardFallback,
      stats: [
        { label: "लाइव रिकॉर्ड", value: String(liveResponse.records.length) },
        ...dashboardFallback.stats.slice(1),
      ],
      meta: {
        source: "Data.gov.in API",
        live: true,
      },
    };
  } catch (error) {
    return {
      ...dashboardFallback,
      meta: {
        source: "स्थिर नमूना आंकड़े",
        live: false,
        error: error.message,
      },
    };
  }
}
