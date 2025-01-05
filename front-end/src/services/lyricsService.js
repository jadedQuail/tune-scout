const BASE_URL = "http://localhost:7981";

export async function fetchLyrics(title) {
    try {
        const response = await fetch(
            `${BASE_URL}/lyrics?song=${encodeURIComponent(title)}`
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                errorData.error || "An error occurred while fetching lyrics."
            );
        }

        const data = await response.json();
        const { lyrics } = data;

        // Format the lyrics into a single string with endlines
        const formattedLyrics = Object.entries(lyrics)
            .map(([language, text]) => `${language}:\n${text}`)
            .join("\n\n");

        return `Lyrics for "${data.song}":\n\n${formattedLyrics}`;
    } catch (error) {
        throw new Error(
            error.message || "An error occurred while fetching lyrics."
        );
    }
}
