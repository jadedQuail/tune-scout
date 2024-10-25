const baseUrl = import.meta.env.VITE_API_URL;

export async function registerUser(username, password) {
    try {
        const response = await fetch(`${baseUrl}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            console.log("User registered successfully!");
            return true;
        } else if (response.status === 409) {
            console.log("Username already exists.");
            return false;
        } else {
            console.log("Registration failed.");
            return false;
        }
    } catch (error) {
        console.log("Error:", error);
        return false;
    }
}
