import { getNavbar } from "../components/navBar.js";
import { renderEditor,addQuestion } from "../components/editor.js";
import { Draft } from "../logic/editorClass.js";
import { getQuestionEditor } from "../components/addUpdateQcard.js";
import { navigate } from "../route.js";


export function getEditorPage(){

    const page = document.createElement("div");

    page.innerHTML = ` 
    <div id = "addUpdate" class = "addUpdate hidden"></div>
    <div id = "nav"></div>
    <div id = "Qcontainer" class = "Qcontainer"></div>
    `


    
    const container = page.querySelector("#Qcontainer"); 
    const nav = page.querySelector("#nav");
    const addUpdate = page.querySelector("#addUpdate");

    
    let sortable = null;
    let draft = null;

    function openQuestionEditor(question = null) {

        addUpdate.classList.remove("hidden");
        addUpdate.replaceChildren(
            getQuestionEditor()
        );
    }

    function closeQuestionEditor() {

        addUpdate.classList.add("hidden");
        addUpdate.innerHTML="";
    }

    function updateSerialDom(){
            
            for (let i=0;i<container.children.length;i++){
                let b = container.children[i].querySelector(".Qsr");
                b.textContent =i+1+".";
            }
           
    }

    function checkMandatoryFields(){
        if (page.querySelector("#title").value.trim() ==""){
            alert("Title IS Mandatory !!");
            return false;
        }
        return true;
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

        switch (e.target.id) {
            case "lNavBtn":
                history.back();
                break;
            
            case "rNavBtn":
                openQuestionEditor();
                break;

            case "addUpdateCancel":
                closeQuestionEditor();
                console.log("Button Clicked");
                break;
            
            case "addUpdateSave":
                if(checkMandatoryFields()){
                    appendDraftAndDom(getAddUpdateInfo());
                    closeQuestionEditor();
                }
                break; 
        }

        switch (true) {
            case e.target.classList.contains("editBtn"):
                console.log(getParentQcardIndex(e));
                break;

            case e.target.classList.contains("deleteBtn"):
                const index = getParentQcardIndex(e);
                draft.deleteQuestionIndex(index);
                removeQcardIndex(index);
                updateSerialDom();

                break;
        }

    };


    function init (){

        if (sortable) return;
        draft = new Draft();
        

        const questions = draft.questions;
        nav.replaceChildren(getNavbar({left : 'back', middle : "Draft" , right:'add'}));
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


        page.addEventListener("click",editorActivity);
    }

    function destroy() {
        
        if (sortable) {
            sortable.destroy();
            sortable = null;
        }
        page.removeEventListener("click", editorActivity);
    }

    return {element :page , init , destroy};

}