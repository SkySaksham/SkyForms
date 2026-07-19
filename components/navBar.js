const testData = {left:null,middle:"Hello",right:null};


function getButton(content){
    const div = document.createElement("div");
    const element = document.createElement("h4");

    if (content) {
        element.textContent = content;
        div.appendChild(element);
        div.className = 'navbtn';
    }
    return div;
}

function getHeader(content) {
    const div = document.createElement("div");
    const element = document.createElement("h1");

    if (content) {
        element.textContent = content;
        div.appendChild(element);
    }

    return div;
}


export function getNavbar(content){
    const nav = document.createElement("nav");
    const left = getButton(content.left);
    left.id = "lNavBtn";

    const right = getButton(content.right);
    right.id = "rNavBtn";
    nav.appendChild(left);
    nav.appendChild(getHeader(content.middle));
    nav.appendChild(right);

    return nav;    
}

