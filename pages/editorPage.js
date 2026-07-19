import { getNavbar } from "../components/navBar.js";
import { renderEditor } from "../components/editor.js";
import { Draft } from "../logic/editorClass.js";
import { getQuestionEditor } from "../components/addUpdateQcard.js";



export function getEditorPage(){

    const page = document.createElement("div");

    page.innerHTML = ` 
    <div id = "addUpdate"
    <div id = "nav"></div>
    <div id = "Qcontainer" class = "Qcontainer">
    `


    const questions =  data.draft.questions;
    const container = page.querySelector("#Qcontainer"); 
    const nav = page.querySelector("#nav");
    

    let sortable = null;
    let draft = null;

   
    function updateSerialDom(event){
            let a = Math.min(event.newIndex,event.oldIndex);
            let c = Math.max(event.oldIndex,event.newIndex);

            while (a<=c){
                let b = container.children[a].querySelector(".Qsr");
                b.textContent =a+1+".";
                a++;
            }
    }


    function init (){

        if (sortable) return;


        draft = new Draft();
        
        nav.replaceWith(getNavbar({left : 'back', middle : "Draft" , right:'add'}));


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
    }

    function destroy() {
        
        if (sortable) {
            sortable.destroy();
            sortable = null;
        }
        
    }

    return {element :page , init , destroy};

}