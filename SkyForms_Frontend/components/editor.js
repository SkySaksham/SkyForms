
function getDiv(className,textContent=""){
    const div = document.createElement("div");
    div.className = className;
    div.textContent = textContent; 
    return div;
}

function getQhead(title,serial = "->"){

    const qhead= getDiv("Qhead");
    qhead.appendChild(getDiv("Qsr",serial+"."));
    qhead.appendChild(getDiv("Qtitle",title));

    return qhead;
}

function getQuestionType(selectedType = "short") {
    const select = document.createElement("select");
    select.className = "questionType";

    const types = {
        short: "Short Answer",
        paragraph: "Long Answer",
        date: "Date",
        checkbox: "Checkbox",
        
    };

    for (const [value, text] of Object.entries(types)) {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = text;
        select.appendChild(option);
    }

    select.value = selectedType;

    return select;
}

function getDragHandle(){
    const div = document.createElement("div");
    div.className="dragHandle";
    for (let i = 0; i < 3; i++) {
        div.appendChild(document.createElement("span"));
    }
    return div;
}

function getRequired(required = false) {
    const label = document.createElement("label");
    label.className = "required";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = required;
    checkbox.className = "requiredCheckBox";
    label.appendChild(checkbox);
    label.append("Required");

    return label;
}

function getButton(text, className) {
    const btn = document.createElement("button");
    btn.className = className;
    btn.textContent = text;
    return btn;
}

function getActionBar() {
    const actions = getDiv("Qactions");
  
    actions.appendChild(getButton("Delete", "deleteBtn"));
    actions.appendChild(getButton("Edit", "editBtn"));

    return actions;
}



function getQcard(content,serial="->"){
    
    const card = document.createElement("div");
    card.id=content.id;
    card.className="Qcard";
    card.appendChild(getQhead(content.title,serial));
    card.appendChild(getDiv("Qdescription",content.description));

    const bottom = getDiv("Qbottom",null);

    bottom.appendChild (getQuestionType(content.type));
    bottom.appendChild (getDragHandle());
    bottom.appendChild (getRequired(content.required));
   
    card.appendChild(bottom);
    card.appendChild (getActionBar());

    
    return card;
}

export function updateQuestion(container, index, content) {
    const oldCard = container.children[index];
    if (!oldCard) {
        throw new Error("Invalid question index");
    }
    const serial = index + 1;
    const newCard = getQcard(content, serial);
    oldCard.replaceWith(newCard);
}


export function addQuestion(container,content,serial=container.children.length+1){
    container.appendChild(getQcard(content,serial));
}

export function renderEditor(container,questions) {
    container.innerHTML = "";
    const fragment = document.createDocumentFragment();
    questions.forEach((question, index) => {
        fragment.appendChild(getQcard(question, index + 1));
    });
    container.appendChild(fragment);
}

export function getBottomBar() {
    const bar = getDiv("bottomBar");

    const editName = getButton("Edit Name", "editNameBtn");
    const next = getButton("Next", "nextBtn");

    bar.append(editName, next);

    return bar;
}

function getLabelSpan(content = "") {
    const label = document.createElement("label");
    label.className = "field";

    const span = document.createElement("span");
    span.textContent = content;

    label.appendChild(span);
    return label;
}

function getName(value = "") {
    const label = getLabelSpan("Form Name");

    const input = document.createElement("input");
    input.type = "text";
    input.id = "nameEditOverlay";
    input.placeholder = "Enter form name...";
    input.value = value;

    label.appendChild(input);
    return label;
}

function getActions() {
    const actions = document.createElement("div");
    actions.className = "actions";

    const cancelBtn = document.createElement("button");
    cancelBtn.className = "cancelBtn";
    cancelBtn.id = "updateNameCancel";
    cancelBtn.textContent = "Cancel";

    const saveBtn = document.createElement("button");
    saveBtn.className = "saveBtn";
    saveBtn.id = "updateNameSave";
    saveBtn.textContent = "Save Name";

    actions.append(cancelBtn, saveBtn);
    return actions;
}

export function getNameEditor(name = "") {
    const card = document.createElement("div");
    card.className = "nameCard";

    card.append(
        getName(name),
        getActions()
    );

    return card;
}