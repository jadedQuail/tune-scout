const BASE_URL = "http://localhost:38710";

export async function fetchChartRankings(title) {
    try {
        const response = await fetch(`${BASE_URL}/get-chart-rankings?title=${encodeURIComponent(title)}`);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "An error occurred while fetching chart rankings.");
        }

        const data = await response.json();

        return `Chart Rankings for "${data.title}":\nBillboard: ${data.billboard}\nARIA: ${data.aria}\nOCC: ${data.occ}`;
    } catch (error) {
        throw new Error(error.message || "An error occurred while fetching chart rankings.");
    }
}

export async function fetchCountryRankings(title) {
    try {
        const response = await fetch(`${BASE_URL}/get-country-rankings?title=${encodeURIComponent(title)}`);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "An error occurred while fetching country rankings.");
        }

        const data = await response.json();
        const countries = data.countries;

        const rankings = Object.entries(countries)
            .map(([country, rank]) => `${country}: ${rank ?? "Not ranked"}`)
            .join("\n");

        return `Country Rankings for "${data.title}":\n${rankings}`;
    } catch (error) {
        throw new Error(error.message || "An error occurred while fetching country rankings.");
    }
}