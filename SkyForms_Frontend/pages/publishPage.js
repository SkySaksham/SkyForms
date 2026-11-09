import { getBottomBar} from "../components/editor.js";
import { getNavbar } from "../components/navBar.js";
import { getPublishContainer,getPublishingFormOverlay } from "../components/previewPublish.js";
import { getLoader } from "../components/loader.js";
import { data } from "../store.js";
import { Draft } from "../logic/draftClass.js";
import { navigate } from "../route.js";
import { syncManager } from "../main.js";

export function getPublishPage(){
    const page = document.createElement("div");
    page.className = "PublishPage";
    page.innerHTML = `
            <div id="overlay" class = "overlay"> </div>
            <div id = "navBar"></div>
            <div id = "PublishContainer"></div>
            <div id = "bottomBar"></div>
    `;
    const navbar = page.querySelector("#navBar");
    const pConatiner = page.querySelector("#PublishContainer");
    const btmBar = page.querySelector("#bottomBar");
    const overlay = page.querySelector("#overlay");
    let draftId = null;

    function openPublishOverlay(){
        overlay.classList.add("show");
        overlay.appendChild(getPublishingFormOverlay());
    }

    function closeOverlay(){
        overlay.classList.remove("show");
        overlay.innerHTML = "";
    }

    async function publishForm(){
        overlay.replaceChildren(getLoader());
        let res = await syncManager.submitDraft(draftId);
        if (res){
            alert("Form SuccessFully Created !!")
        }
        navigate("\home");
    }

    async function publishActivity(e){
            const target = e.target.closest("[id]");
            if (target) {
                switch (target.id) {
                    case ("publishCancel") :
                        closeOverlay();
                        break;

                    case ("publishSubmit") :
                        publishForm();
                        break;
                break;
                }
            }
            switch (true) {
                case e.target.classList.contains("nextBtn") :
                        openPublishOverlay();
                        break;
    
                case e.target.classList.contains("editNameBtn"):
                    navigate(`/draft?draft=${draftId}`);
                    break;
            break;
            }
    };
    


    async function init (){

        const params = new URLSearchParams(location.search);
        draftId = params.get("draft");
        if (!draftId || !Object.hasOwn(data.drafts, draftId)){
            alert("NOT FOUND !!!");
            navigate("/home");
            return;
        }

        pConatiner.appendChild(getLoader("Refreshing draft..."));
        const refreshed = await syncManager.refreshDraftFromServer(draftId);
        if (!refreshed) {
            alert("Could not refresh this draft from the server. Please try again.");
            navigate("/home");
            return;
        }

       
        if (!page.isConnected || location.pathname !== "/publish" ||
            new URLSearchParams(location.search).get("draft") !== draftId) return;

        const draft = new Draft(draftId);
        navbar.appendChild(getNavbar({middle:draft.getName}));
        btmBar.appendChild(getBottomBar("Back","Publish"));
        pConatiner.replaceChildren(getPublishContainer(draft.questions));

        page.addEventListener("click",publishActivity);

    }
    function destroy () {
        removeEventListener("click",publishActivity);
    }



    return {element : page,init,destroy};
}
