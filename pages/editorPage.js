import { getNavbar } from "../components/navBar";
import { renderEditor } from "../components/editor";



export function getEditorPage(){

    const page = document.createElement("div");

    page.appendChild(

        getNavbar({left:null,middle:"Draft Form",right:"add"})


    )

}