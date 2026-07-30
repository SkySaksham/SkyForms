import { data } from "../store.js";
import { getProfileCard, getYourForms, getYourDraftForms,getPromptArea } from "../components/homePageComponents.js";

export function getHomePage(){

    const profile = data.userInfo;
    const ownedForms = data.yourForms;
    const draftForms = data.draftForms
    
    const page = document.createElement("div");
    page.className="HomeContainer";
    page.innerHTML = `
        <div id="pcard"></div> 
        <div id="yrform"></div>
        <div id="drform"></div>
        <div id="promptArea" style="padding:2rem"></div> 
    `

    const  pcard = page.querySelector("#pcard");
    const yf = page.querySelector("#yrform");
    const drf = page.querySelector("#drform");
    const pra = page.querySelector("#promptArea")


    function init() {
        pcard.appendChild(getProfileCard(profile));
        yf.appendChild(getYourForms(ownedForms))
        drf.appendChild(getYourDraftForms(draftForms));
        pra.appendChild(getPromptArea());
    }

    function destroy () {}

    return {element:page,init,destroy};
}