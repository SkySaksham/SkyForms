import { getLandingPage } from "./pages/landingPage.js"
import { getEditorPage } from "./pages/editorPage.js";

const routes = {
    "/" : getLandingPage,
    "/home" : getLandingPage,
    "/draft" : getEditorPage,
}

const app = document.querySelector("#app");
let currentPage = null;


export function navigate(path) {
    history.pushState({}, "", path);
    render();
}

export function render(){
        currentPage?.destroy?.();
        let pathPage = routes[location.pathname];
        if (!pathPage){
            app.innerHTML="<h1> Not Found <h1>";
            return;
        }
        currentPage = pathPage();
        app.replaceChildren(currentPage.element ?? currentPage);
        currentPage.init?.();
}


export function initRouter(){

    navigate("/home");

    window.addEventListener("popstate", () => {
        render();
    });

    document.addEventListener("click", (e) => {
        const link = e.target.closest("a[app-route]");
        if (!link) return;
        e.preventDefault();
        navigate(link.pathname);
    });
}



