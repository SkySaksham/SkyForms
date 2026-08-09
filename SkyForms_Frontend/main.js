import { initRouter, navigate } from "./route.js";
import { verifyAccessToken } from "./api/verifyJwt.js";
import { Sync } from "./logic/syncClass.js";

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
        syncManager.repopulateMemoryFromLocal();
        navigate("/home");
    } catch (e) {
        console.log(e);
        navigate("/home");
    }  
}

start_up()