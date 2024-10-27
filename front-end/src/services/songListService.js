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

export async function getSongLists(userId) {
    console.log("Fetching song lists for user:", userId);

    try {
        const response = await fetch(`${baseUrl}/song-lists/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Song lists fetched successfully:", data);
            return data;
        } else {
            console.log("Failed to fetch song lists.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching song lists:", error);
        return null;
    }
}

export async function deleteSongList(songListId) {
    console.log("Deleting song list with ID:", songListId);

    try {
        const response = await fetch(`${baseUrl}/song-lists/${songListId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            console.log("Song list deleted successfully!");
            return true;
        } else {
            console.log("Failed to delete song list.");
            return false;
        }
    } catch (error) {
        console.error("Error deleting song list:", error);
        return false;
    }
}
