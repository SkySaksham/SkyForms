import { initRouter, navigate } from "./route.js";
import { verifyAccessToken } from "./api/verify_jwt.js";
import { Sync } from "./logic/syncClass.js";
import { repopulateDataModel } from "./store.js";

const app = document.getElementById("app");

initRouter();



async function start_up(params) {
    try {
    const check = await verifyAccessToken();
    export const syncManager = new Sync(check);
    }catch (e){
        console.log(e);
        navigate("/");
        return
    }

    try {
        syncManager.repopulateMemoryFromLocal();
    } catch (e) {
        navigate("/home");
    }  
}

start_up()