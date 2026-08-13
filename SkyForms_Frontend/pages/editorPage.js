import { getNavbar } from "../components/navBar.js";
import { renderEditor,addQuestion,updateQuestion,getBottomBar, getNameEditor } from "../components/editor.js";
import { Draft } from "../logic/draftClass.js";
import { getQuestionEditor } from "../components/addUpdateQcard.js";
import { navigate } from "../route.js";


export function getEditorPage(){

    const page = document.createElement("div");
    page.className = "EditorPage"
    page.innerHTML = ` 
    <div id = "overlay" class = "overlay"></div>
    <div id = "nav"></div>
    <div id = "Qcontainer" class = "Qcontainer"></div>
    <div id= "Btmbar"></div>
    `


    
    const container = page.querySelector("#Qcontainer"); 
    const nav = page.querySelector("#nav");
    const overlay = page.querySelector("#overlay");
    const btmbar = page.querySelector("#Btmbar");

    
    let sortable = null;
    let draft = null;
    let updateQIndex = -1;
    function openQuestionEditor(question = {}) {

        overlay.classList.add("show");
        overlay.replaceChildren(
            getQuestionEditor(question)
        );
    }

    function closeQuestionEditor() {

        overlay.classList.remove("show");
        overlay.innerHTML="";
    }

    function openNameEditor(){
        overlay.classList.add("show");
        overlay.replaceChildren(
            getNameEditor(draft.getName)
        );
    }

    function updateSerialDom(){
            
            for (let i=0;i<container.children.length;i++){
                let b = container.children[i].querySelector(".Qsr");
                b.textContent =i+1+".";
            }
           
    }

    function checkMandatoryFields(i="qedit"){
        switch(i){
            case "qedit":
                if (page.querySelector("#title").value.trim() ==""){
                    alert("Title IS Mandatory !!");
                    return false;
                }
                return true;
            case "nedit":
                const a = page.querySelector("#nameEditOverlay").value.trim().length;
                if (a===0){
                    alert("Name is Mandatory !!");
                    return false;
                }
                if (a>20){
                    alert("Name Should be less than 20 Characters");
                    return false;
                }
                return true;
        }
        return false;
    }

    function getAddUpdateInfo() {
        const question = {

            id : crypto.randomUUID(),
            title: page.querySelector("#title").value.trim(),
            description: page.querySelector("#description").value.trim(),
            type: page.querySelector("#type").value,
            required: page.querySelector("#required").checked
        };

        return question;
    }

    function appendDraftAndDom(question){
        try {
            draft.addQuestion(question);
            addQuestion(container,question);
        }  catch (err) {
            alert(err.message);
            console.error(err);
        }
    }


    function getParentQcardIndex(event) {
        const qCard = event.target.closest(".Qcard");
        if (!qCard) return null;

        const qsr = qCard.querySelector(".Qsr");
        return parseInt(qsr.textContent, 10) - 1; 
    }

    function removeQcardIndex(index){
        container.children[index].remove();
    }

    function editorActivity(e){
        const target = e.target.closest("[id]");
        if (target){
            switch (target.id) {
                case "lNavBtn":
                    history.back();
                    break;
                
                case "rNavBtn":
                    openQuestionEditor();
                    break;

                case "addUpdateCancel":
                    closeQuestionEditor();
                    updateQIndex=-1;
                    break;
                
                case "addUpdateSave":
                    if(checkMandatoryFields()){
                        if (updateQIndex>=0){
                            const info = getAddUpdateInfo();
                            info.id = draft.getQuestion(updateQIndex).id;
                            draft.updateQuestionIndex(info, updateQIndex);
                            updateQuestion(container, updateQIndex, info);
                            updateQIndex=-1;
                            closeQuestionEditor();
                        }

                        else {
                            appendDraftAndDom(getAddUpdateInfo());
                            closeQuestionEditor();
                        }
                    }
                    break;

                case "updateNameCancel":
                    closeQuestionEditor();
                    break;

                case "updateNameSave":
                    if(checkMandatoryFields("nedit")){
                        const name = page.querySelector("#nameEditOverlay").value;
                        draft.updateFormName(name);
                        console.log(draft.getName);
                        renderNavbar();
                        closeQuestionEditor();
                        
                    }
                    break;

            }
        }
        

        switch (true) {
            case e.target.classList.contains("editBtn"):
                updateQIndex = getParentQcardIndex(e);
                openQuestionEditor(draft.getQuestion(updateQIndex));
                break;

            case e.target.classList.contains("deleteBtn"):
                const index = getParentQcardIndex(e);
                draft.deleteQuestionIndex(index);
                removeQcardIndex(index);
                updateSerialDom();
                break;

            case e.target.classList.contains("editNameBtn"):
                openNameEditor();
                break;
        break;
        }

    };


    function editorChangeActivity(e) {
        switch (true) {
            case e.target.classList.contains("questionType"):
                draft.updateTypeIndex(
                    getParentQcardIndex(e),
                    e.target.value
                );
                console.log(draft.getQuestion(getParentQcardIndex(e)));
                break;

            case e.target.classList.contains("requiredCheckBox"):
                draft.updateCheckedIndex(
                    getParentQcardIndex(e),
                    e.target.checked
                );
                console.log(draft.getQuestion(getParentQcardIndex(e)));
                break;    
        }
    }

    function renderNavbar(){
            nav.replaceChildren(getNavbar({left : 'back', middle : draft.getName , right:'add'}));
    }
    function init (){

        if (sortable) return;

        const params = new URLSearchParams(location.search);
        let draftId = params.get("draft");
        if (draftId) {
                try{
                    draft = new Draft(draftId);
                }catch (er) {
                    alert("Draft DoesntExist !!");
                    navigate("/");
                    return;
                }
            
            } else {
                
                draft = new Draft();
                draftId=draft.draftID;
                
                history.replaceState(
                    {},
                    "",
                    `/draft?draft=${draftId}`
                );
        }
        

        const questions = draft.questions;
        
        renderEditor(container,questions);
        sortable = new Sortable(container, {
    
            handle: ".dragHandle",
            animation: 150,
            chosenClass:"chosen",
            ghostClass: "dragging",

            onEnd(evt) {   
                draft.updateOrder(evt);
                updateSerialDom();
            }
        });

        btmbar.appendChild(getBottomBar());
        renderNavbar();

        page.addEventListener("click",editorActivity);
        page.addEventListener("change", editorChangeActivity);
    }

    function destroy() {
        
        if (sortable) {
            sortable.destroy();
            sortable = null;
        }
        page.removeEventListener("click", editorActivity);
        page.removeEventListener("change", editorChangeActivity);
    }

    return {element :page , init , destroy};

}