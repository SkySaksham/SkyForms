import { initRouter, navigate, render } from "./route.js";
import { verifyAccessToken } from "./api/verifyJwt.js";
import { Sync } from "./logic/syncClass.js";

const app = document.getElementById("app");

initRouter();

export let syncManager = null;

export function setSyncManager(id) {
    syncManager = new Sync(id);
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

    try {
        await syncManager.repopulateMemoryFromLocal();
    } catch (e) {
        console.log(e);
        await syncManager.fetchAppState();
    }

    if (location.pathname === "/") {
        navigate("/home");
    } else {
        render();
    }
}

start_up();