


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
        mcq: "Multiple Choice",
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

let Questions = [
{
    id: 1,
    title: "What is your full name?",
    description: null,
    type: "short",
    required: true,
},
{
    id: 2,
    title: "What is your email address?",
    description: "We'll use this to contact you.",
    type: "short",
    required: true,
},
{
    id: 3,
    title: "Tell us about yourself.",
    description: "A brief introduction is enough.",
    type: "paragraph",
    required: false,
},
{
    id: 4,
    title: "What is your highest level of education?",
    description: null,
    type: "dropdown",
    required: true,
},
{
    id: 5,
    title: "Which programming language do you use the most?",
    description: "Select one option.",
    type: "mcq",
    required: true,
},
{
    id: 6,
    title: "Which technologies have you worked with?",
    description: "Select all that apply.",
    type: "checkbox",
    required: false,
},
{
    id: 7,
    title: "How many years of programming experience do you have?",
    description: null,
    type: "short",
    required: true,
},
{
    id: 8,
    title: "Why do you want to join our team?",
    description: "Share your motivation.",
    type: "paragraph",
    required: true,
},
{
    id: 9,
    title: "Preferred mode of work",
    description: "Remote, Hybrid, or On-site",
    type: "dropdown",
    required: true,
},
{
    id: 10,
    title: "Would you recommend our service to others?",
    description: null,
    type: "mcq",
    required: false,
}
];
