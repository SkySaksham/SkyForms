import { getLandingPage } from "./pages/landingPage.js"


const routes = {
    "/" : getLandingPage, 
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
        currentPage.mount?.();
}


export function initRouter(){

    render();

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



