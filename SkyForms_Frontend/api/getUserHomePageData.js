const DEV_URL = "http://127.0.0.1:8000/"



export async function getUserHomePageData(){
    const response = await fetch(`${DEV_URL}userdata`,{
        method : "POST",
        credentials : "include",
        headers : {
            "Content-Type": "application/json"
        }
    })

    if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
    }
    return null;
}