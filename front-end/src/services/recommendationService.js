const BASE_URL = "http://localhost:21219";

export async function fetchRecommendations(song) {
    try {
        const response = await fetch(`${BASE_URL}/recommendations?song=${encodeURIComponent(song)}`);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Error: ${response.statusText}`);
        }

        const data = await response.json();
        const recommendationsString = `Song Recommendations:\n\n${data.recommendations.join('\n')}\n\nExplanation:\n\n${data.explanation}`;
        return recommendationsString;
    } catch (error) {
        throw new Error(`An error occurred: ${error.message}`);
    }
}