const DEV_URL = "http://127.0.0.1:8000/";

export async function logout() {
    const res = await fetch(`${DEV_URL}auth/logout`, {
        method: "POST",
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("Logout failed!");
    }

    return await res.json();
}