const baseUrl = import.meta.env.VITE_API_URL;

export async function createSongList(name, userId) {
    console.log("Creating song list with:", { name, user_id: userId });

    try {
        const response = await fetch(`${baseUrl}/create-song-list`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, user_id: userId }),
        });

        if (response.ok) {
            console.log("Song list created successfully!");
            return true;
        } else {
            console.log("Failed to create song list.");
            return false;
        }
    } catch (error) {
        console.error("Error creating song list:", error);
        return false;
    }
}
