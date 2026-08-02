export function getProfileCard(profileData){
    const div = document.createElement("div");
    div.className = "ProfileCard"
    div.innerHTML= `
        <div class="ProfileHeader">
            <div>Welcome ,</div>
            <div class="Name"></div>

            <div class="GAccount">
                <div class="googlesvg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
                            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5z"/>
                            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 18.9 12 24 12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
                            <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.6-5.3l-6.3-5.3C29.3 34.8 26.8 36 24 36c-5.2 0-9.6-3.3-11.2-8l-6.5 5C9.6 39.5 16.2 44 24 44z"/>
                            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.3 5.6-6 7.3l6.3 5.3C39.2 37.3 44 31.2 44 24c0-1.2-.1-2.4-.4-3.5z"/>
                    </svg>
                </div>
                <span>Logged in as <span id="email">abc@gmail.com</span></span>
            </div>
        </div>

    <div class="LogoutSection">
        <button class="LogoutBtn">
            <svg xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round">
                <path d="M5 3h10v18H5z"/>
                <path d="M11 12h.01"/>
                <path d="M15 12h6"/>
                <path d="m18 9 3 3-3 3"/>
            </svg>
        Log out
        </button>
        </div>
    `


    const name = div.querySelector(".Name");
    name.textContent = profileData.name;
    const email = div.querySelector("#email");
    email.textContent=profileData.email;
    return div;
}



export function getFormCard(id,name="",status=false,type="published"){
    const div = document.createElement("div");
    div.classList.add("formcards",type);
    div.id= id;

    if (status){
        div.innerHTML = `
                    <div class="label">Name</div>
                    <div class="value fname"></div>
                    <div class="label">Status</div>
                    <div class="value status active">Active</div>
        `
    }else {
        div.innerHTML = `
                <div class="label">Name</div>
                    <div class="value fname">Registration</div>
                    <div class="label">Status</div>
                <div class="value status inactive">Inactive</div>
        `
    }
    const nm = div.querySelector(".fname");
    nm.textContent = name;

    return div;

}

export function getYourForms(data=[]){
    const elmt = document.createElement("div");
    elmt.className = "yourForms"
    elmt.innerHTML = "<div>Your Forms</div>"

    const formContainer = document.createElement("div");
    formContainer.className = "formContainer"
    if (data.length===0){
        const dd = document.createElement("div");
        dd.innerHTML = `
            <div class="formcards emptyCard">
                <svg xmlns="http://www.w3.org/2000/svg"
                    width="42"
                    height="42"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <path d="M14 2v6h6"/>
                    <path d="M9 13h6"/>
                    <path d="M9 17h4"/>
                </svg>
                <div class="emptyTitle">No Forms</div>
                <div class="emptySub">Publish a draft to see it here</div>
            </div>
        `
        elmt.append(dd);
    }else {
        for (let i of data) formContainer.appendChild(getFormCard(i.id,i.name,i.status));
        elmt.appendChild(formContainer);
    }
        
    return elmt;

}

export function getYourDraftForms(data=[]){

    const area = document.createElement("div");
    area.className = "yourForms";
    area.innerHTML= "<div>Draft Forms</div>";

    const formContainer = document.createElement("div");
    formContainer.className = "formContainer";

    formContainer.innerHTML = `
            <div class="formcards addCard">
                <svg xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="M12 5v14"/>
                    <path d="M5 12h14"/>
                </svg>
            </div>
    `

    for (let i of data) formContainer.appendChild(getFormCard(i.id,i.name,false,"draftForm"))
    area.appendChild(formContainer);
    return area;
}

export function getPromptArea(){
    const area = document.createElement("div");
    area.className = "Lprompt";
    area.innerHTML = `
            <textarea
                class="LpromptInput"
                placeholder="Describe the form you want to create..."
            ></textarea>

            <button id="LsendBtn" class="LsendBtn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 2L11 13"></path>
                    <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
                </svg>
            </button>
    `;

    return area;
}

