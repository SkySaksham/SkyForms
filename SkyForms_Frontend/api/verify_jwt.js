const DEV_URL = "http://127.0.0.1:8000/";

export async function verifyAccessToken() {
    const res = await fetch(`${DEV_URL}auth/verify`, {
        method: "GET",
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("JWT verification failed!");
    }

    const data = await res.json();
    return data.userId;
}