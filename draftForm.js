import { getNavbar } from "./navBar.js";


const testData = {nav:{left:null,middle:"hii",right:null}}

export function getDraftForm(content){
    
    const draftForm = document.createElement("div");

    draftForm.appendChild(getNavbar(content.nav));

    return draftForm;

}