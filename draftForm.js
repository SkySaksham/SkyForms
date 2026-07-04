import { getNavbar } from "./navBar.js";


const testData = {nav:{left:"<- BACK",middle:"DRAFT FORM",right:"ADD"}}

export function getDraftForm(content){
    if (content == "test"){
        content = testData;
    }
    const draftForm = document.createElement("div");

    draftForm.appendChild(getNavbar(content.nav));

    return draftForm;

}