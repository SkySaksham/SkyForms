import { getBottomBar} from "../components/editor.js";
import { getNavbar } from "../components/navBar.js";
import { getPublishContainer,getPublishingFormOverlay } from "../components/previewPublish.js";
import { getLoader } from "../components/loader.js";
import { data } from "../store.js";
import { Draft } from "../logic/draftClass.js";
import { navigate } from "../route.js";


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

    async function publishActivity(e){
            const target = e.target.closest("[id]");
            if (target) {
                switch (target.id) {
                    case ("publishCancel") :
                        closeOverlay();
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
    


    function init (){

        const params = new URLSearchParams(location.search);
        draftId = params.get("draft");
        if (! draftId in data.drafts){
            alert("NOT FOUND !!!");
            navigate("home");
            return;
        }
        else {
            const draft = new Draft(draftId);
            console.log(draft.getName);
            navbar.appendChild(getNavbar({middle:draft.getName}));
            btmBar.appendChild(getBottomBar("Back","Publish"));
            pConatiner.appendChild(getPublishContainer(draft.questions));
        }

        page.addEventListener("click",publishActivity);

    }
    function destroy () {
        removeEventListener("click",publishActivity);
    }



    return {element : page,init,destroy};
}