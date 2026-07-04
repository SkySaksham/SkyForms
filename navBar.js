let a = {left:null,middle:"Hello",right:null};


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


function getNavbar(content){
    const nav = document.createElement("nav");

    nav.appendChild(getButton(content.left));
    nav.appendChild(getHeader(content.middle));
    nav.appendChild(getButton(content.right));

    return nav;    
}

