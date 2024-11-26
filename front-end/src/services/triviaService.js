export const fetchFunFact = async (title, artist) => {
    try {
        const apiUrl = `/api/song/?title=${encodeURIComponent(
            title
        )}&artist=${encodeURIComponent(artist)}`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Failed to fetch song data.");
        }

        const data = await response.json();

        return `${data.fun_fact}\n\nYear Released: ${data.year_released}\nRecord Label: ${data.record_label}\nGenre: ${data.genre}`;
    } catch (error) {
        console.error("Error fetching fun fact:", error);
        throw error;
    }
};
