import { App } from "./app.js";

const app = document.getElementById("app");

app.replaceChildren(App().element);