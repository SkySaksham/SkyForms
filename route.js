import { getLandingPage } from "./pages/landingPage"


routes = {
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
        }

        currentPage = pathPage();

        


}


