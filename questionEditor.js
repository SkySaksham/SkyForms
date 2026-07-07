function getLabelSpan(content = "") {
    const label = document.createElement("label");
    label.className = "field";

    const span = document.createElement("span");
    span.textContent = content;

    label.appendChild(span);
    return label;
}

function getQuestionTitle(value = "") {
    const label = getLabelSpan("Question Title");

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Enter your question...";
    input.id = "title";
    
    input.value=value;

    label.appendChild(input);
    return label;
}

function getDescription(value = "") {
    const label = getLabelSpan("Description (Optional)");

    const textarea = document.createElement("textarea");
    textarea.rows = 3;
    textarea.placeholder = "Add a description...";
    textarea.id = "description";

    textarea.value= value;

    label.appendChild(textarea);
    return label;
}

function getQuestionType(type = "short") {
    const label = getLabelSpan("Question Type");

    const select = document.createElement("select");
    select.id = "type";

    const options = [
        ["short", "Short Answer"],
        ["paragraph", "Paragraph"],
        ["mcq", "Multiple Choice"],
        ["checkbox", "Checkboxes"],
        ["dropdown", "Dropdown"]
    ];

    options.forEach(([value, text]) => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = text;
        select.appendChild(option);
    });

    select.value = type;

    label.appendChild(select);
    return label;
}

function getRequiredRow(value = false) {
    const label = document.createElement("label");
    label.className = "requiredRow";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "required";

    if (value) checkbox.checked = true;

    const span = document.createElement("span");
    span.textContent = "Required";

    label.append(checkbox, span);
    return label;
}

function getActions() {
    const actions = document.createElement("div");
    actions.className = "actions";

    const cancelBtn = document.createElement("button");
    cancelBtn.className = "cancelBtn";
    cancelBtn.textContent = "Cancel";

    const saveBtn = document.createElement("button");
    saveBtn.className = "saveBtn";
    saveBtn.textContent = "Save Question";

    actions.append(cancelBtn, saveBtn);
    return actions;
}

export function getQuestionEditor(content = {}) {
    const card = document.createElement("div");
    card.className = "questionCard";

    card.append(
        getQuestionTitle(content.title),
        getDescription(content.description),
        getQuestionType(content.type),
        getRequiredRow(content.required),
        getActions()
    );
        
    return card;
}
