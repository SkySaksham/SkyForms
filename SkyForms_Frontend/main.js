import { initRouter, navigate } from "./route.js";
import { verifyAccessToken } from "./api/verifyJwt.js";
import { Sync } from "./logic/syncClass.js";
import { getUserHomePageData } from "./api/getUserHomePageData.js";
const app = document.getElementById("app");

initRouter();
export let syncManager = null;


async function start_up(params) {
    try {
    const id = await verifyAccessToken();
    syncManager = new Sync(id);
    }catch (e){
        console.log(e);
        navigate("/");
        return
    }

    try {
        await syncManager.repopulateMemoryFromLocal();
        navigate("/home");
    } catch (e) {
        console.log(e);
        await syncManager.fetchAppState()
        navigate("/home");
    }  
}

start_up()