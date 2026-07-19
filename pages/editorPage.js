import { getNavbar } from "../components/navBar.js";
import { renderEditor } from "../components/editor.js";
import { Draft } from "../logic/editorClass.js";
import { getQuestionEditor } from "../components/addUpdateQcard.js";



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


    function editorActivity(e){
        if (e.target.id === "rNavBtn"){
            openQuestionEditor();
            console.log("BUTTON CLICKED BRUH");
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