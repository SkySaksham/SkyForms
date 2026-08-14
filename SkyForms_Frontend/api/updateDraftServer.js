const DEV_URL = "http://127.0.0.1:8000/"


export async function updateDraftServer(data){
    const res = await fetch(`${DEV_URL}updatedraft`, {
        method: "POST",
        credentials: "include",
        body : JSON.stringify(data)
    });

    if (!res.ok) {
        console.log(res)
        alert("Unable to Update Draft");
    }

    const data2 = await res.json();
    return data2;
}