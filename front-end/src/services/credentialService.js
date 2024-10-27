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
            const user = await response.json();
            console.log("User registered successfully!");
            return { success: true, user };
        } else if (response.status === 409) {
            console.log("Username already exists.");
            return { success: false };
        } else {
            console.log("Registration failed.");
            return { success: false };
        }
    } catch (error) {
        console.log("Error:", error);
        return false;
    }
}

export async function loginUser(username, password) {
    try {
        const response = await fetch(`${baseUrl}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const user = await response.json();
            console.log("User logged in successfully!");
            return { success: true, user };
        } else if (response.status === 401) {
            console.log("Invalid username or password.");
            return { success: false };
        } else if (response.status === 404) {
            console.log("User not found.");
            return { success: false };
        } else {
            console.log("Login failed.");
            return { success: false };
        }
    } catch (error) {
        console.log("Error:", error);
        return { success: false };
    }
}
