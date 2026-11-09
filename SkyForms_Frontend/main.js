import { initRouter, navigate, render } from "./route.js";
import { verifyAccessToken } from "./api/verifyJwt.js";
import { Sync } from "./logic/syncClass.js";

const app = document.getElementById("app");

initRouter();

export let syncManager = null;

export function setSyncManager(id) {
    syncManager = new Sync(id);
    syncManager.setOnStateChange(render);
}

async function start_up() {
    try {
        const id = await verifyAccessToken();
        setSyncManager(id);
    } catch (e) {
        console.log(e);
        navigate("/");
        return;
    }

    let loadedFromCache = false;
    try {
        syncManager.repopulateMemoryFromLocal();
        loadedFromCache = true;
    } catch (e) {
        console.log(e);
    }

    if (location.pathname === "/") {
        navigate("/home");
    } else {
        render();
    }

    try {
        await syncManager.fetchAppState();
    } catch (e) {
        console.log(e);
        if (!loadedFromCache) return;
    }
}

start_up();
