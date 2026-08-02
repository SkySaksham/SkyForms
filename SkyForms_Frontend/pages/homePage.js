import { data } from "../store.js";
import { getProfileCard, getYourForms, getYourDraftForms,getPromptArea } from "../components/homePageComponents.js";
import { navigate } from "../route.js";

export function getHomePage(){

    const profile = data.userInfo;
    const ownedForms = data.yourForms;
    const draftForms = data.draftForms;
    
    const page = document.createElement("div");
    page.classList.add("HomeContainer");
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


    function homeActivity(e) {
   
        switch (e.target.id) {
            case "createNewDraft":
                navigate("/draft");
                return;
        }

        const draftCard = e.target.closest(".draftForm");
        if (draftCard) {
            const draftId = draftCard.id;
            navigate(`/draft?draft=${draftId}`);
            return;
        }
        return;
    }

    function init() {
        pcard.appendChild(getProfileCard(profile));
        yf.appendChild(getYourForms(ownedForms))
        drf.appendChild(getYourDraftForms(draftForms));
        pra.appendChild(getPromptArea());

        page.addEventListener('click',homeActivity);
    }

    function destroy () {
        page.removeEventListener("click", homeActivity);
    }

    return {element:page,init,destroy};
}