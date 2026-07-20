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

    function updateSerialDom(event){
            let a = Math.min(event.newIndex,event.oldIndex);
            let c = Math.max(event.oldIndex,event.newIndex);

            while (a<=c){
                let b = container.children[a].querySelector(".Qsr");
                b.textContent =a+1+".";
                a++;
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
                updateSerialDom(evt);
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