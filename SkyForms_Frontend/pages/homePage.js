import { data, getDraftsMetaData} from "../store.js";
import { getProfileCard, getYourForms, 
    getYourDraftForms,getPromptArea, getLogOutConfirmation
 } from "../components/homePageComponents.js";
import { navigate } from "../route.js";
import { getLoader } from "../components/loader.js";
import { logout } from "../api/logout.js";
import { syncManager } from "../main.js";
import { getLLMResponse } from "../api/llmResponse.js";
import { Draft } from "../logic/draftClass.js";

export function getHomePage(){

    const profile = data.userInfo;
    const ownedForms = data.yourForms;
    const draftForms = getDraftsMetaData();
    
    const page = document.createElement("div");
    page.classList.add("HomeContainer");
    page.innerHTML = `
        <div id = "overlay" class = "overlay"></div>
        <div id="pcard"></div> 
        <div id="yrform"></div>
        <div id="drform"></div>
        <div id="promptArea" style="padding:2rem"></div> 
    `


    const  pcard = page.querySelector("#pcard");
    const yf = page.querySelector("#yrform");
    const drf = page.querySelector("#drform");
    const pra = page.querySelector("#promptArea")
    const overlay = page.querySelector("#overlay");

    function overlayShow(){ overlay.classList.add("show");}
    function overlayClose() {overlay.classList.remove("show");overlay.innerHTML="";}

    async function homeActivity(e) {
        const target = e.target.closest("[id]"); 
        if (target) {
            switch (target.id) {
            case "createNewDraft":
                navigate("/draft");
                return;
            case ("logOutButton") :
                overlayShow();
                overlay.appendChild(getLogOutConfirmation());
                return;
            case ("logoutCancelBtn"):
                overlayClose();
                return;
            case ("logoutConfirmBtn") :
                overlay.innerHTML=``;
                getLoader("Loggin Out !!");
                const res = await logout();
                if (res){
                    navigate("/");
                    syncManager.clearLocalCache();
                }
                else overlayClose();
                return;
            case ("LsendBtn"):
                const prompt = page.querySelector(".LpromptInput").value.trim();
                if (prompt.length < 25) {
                    alert("Minimum 25 Characters Required !!");
                    return;
                }
                overlayShow();
                overlay.replaceChildren(getLoader());
                try {
                    const questions = await getLLMResponse(prompt);
                    const id = crypto.randomUUID();
                    Draft.updateQuestions(id, questions);
                    navigate(`/draft?draft=${id}`);
                } catch(e) {
                    alert(e);
                    overlayClose();
                }
                return;
        }
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