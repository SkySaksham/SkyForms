function getPublishQ(Qno,id,Question,description,Type,Required=false){
    const div = document.createElement("div");
    div.className = "Publish-question";
    div.id = id;
    div.innerHTML = `
            <div class="Publish-questionNumber"> </div>
            <div class="Publish-questionArea">
                <div class="Publish-questionTitle"></div>
            </div>
    `
    const questionNumber = div.querySelector(".Publish-questionNumber");
    questionNumber.textContent = "Question "+Qno;
    const q = div.querySelector(".Publish-questionTitle");
    q.textContent = Question;

    const questionArea = div.querySelector(".Publish-questionArea");
    
    if (Required){
        const req = document.createElement("span");
        req.className = "Publish-required";
        req.textContent = "*";
        q.appendChild(req);
    }

    if (description){
        const desc = document.createElement("div");
        desc.className = "Publish-questionDescription";
        desc.textContent = description;
        questionArea.appendChild(desc);
    }

    if (Type ==="short"){
        const short = document.createElement("div");
        short.innerHTML = `
                <input
                    class="Publish-questionInput ID"
                    type="text"
                    placeholder="Your answer"
                >
        `;
        questionArea.appendChild(short);
    }
    else if (Type==="paragraph"){
        const paragraph = document.createElement("div");
        paragraph.innerHTML = `
                <textarea
                    class="Publish-questionInput ID"
                    rows="3"
                    placeholder="Your answer"
                ></textarea>
        `;
        questionArea.appendChild(paragraph);

    }

    else if (Type==="date"){
        const date = document.createElement("div");
        date.innerHTML = `
                <input
                    class="Publish-questionInput ID"
                    type="date"
                >
        `;
        questionArea.appendChild(date);
    }

    else if (Type === "checkbox"){
        const checkbox = document.createElement("div");
        checkbox.innerHTML = `
                <input
                    class="Publish-questionCheckbox ID"
                    type="checkbox"
                >
        `;
        questionArea.appendChild(checkbox);
    }

    return div;
     
}

export function getPublishContainer(QuestionArray) {
    const div = document.createElement("div");
    div.className = "PublishContainer";

    for (let i =0 ; i<QuestionArray.length ; i++) {
        div.appendChild(getPublishQ(
            i+1,QuestionArray[i]["id"],QuestionArray[i]["title"],QuestionArray[i]["description"],
            QuestionArray[i]["type"],QuestionArray[i]["required"]));
    }

    return div;
}
