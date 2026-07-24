import { getLoader } from "../components/loader.js"
import { getLLMResponse } from "../api/llmResponse.js";
import { Draft } from "../logic/editorClass.js";
import { navigate } from "../route.js"; 

export function getLandingPage(){

    const page = document.createElement("div");


    page.innerHTML = `
    
    <div id="overlay" class = "overlay"> </div>
    <div class="Lcontainer">

    <div class="Lhead">SkyForms</div>
    <div id = "Subtitle" class="Lsubhead"></div>

    <div class="Lshowcase">
        <div class="Lcard Lside Lleft">
            <img src="https://picsum.photos/600/338?random=1" alt="Demo">
        </div>

        <div class="Lcard Lcenter">
            <img src="https://picsum.photos/600/338?random=2" alt="Demo">
        </div>

        <div class="Lcard Lside Lright">
            <img src="https://picsum.photos/600/338?random=3" alt="Demo">
        </div>
    </div>

    <div class = "Ltext">Create your first form in seconds. Start below</div>

    <div class="Lprompt">

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

    </div>

    <div class="Lbottom">
        <span class="LbottomText">Ready to save your forms?</span>
        <a href="/draft" app-route>
            <button class="LgoogleBtn">
                <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.73 1.22 9.24 3.61l6.9-6.9C35.95 2.3 30.42 0 24 0 14.64 0 6.57 5.38 2.63 13.22l8.03 6.24C12.5 13.66 17.8 9.5 24 9.5z"/>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.14-3.08-.39-4.55H24v9.09h12.94c-.56 3-2.25 5.54-4.8 7.25l7.37 5.72C43.86 38.03 46.98 31.87 46.98 24.55z"/>
                    <path fill="#FBBC05" d="M10.66 28.54A14.5 14.5 0 0 1 9.5 24c0-1.58.27-3.11.76-4.54l-8.03-6.24A23.95 23.95 0 0 0 0 24c0 3.87.93 7.53 2.23 10.78l8.43-6.24z"/>
                    <path fill="#34A853" d="M24 48c6.48 0 11.92-2.13 15.89-5.82l-7.37-5.72c-2.05 1.38-4.67 2.2-8.52 2.2-6.2 0-11.5-4.16-13.34-9.96l-8.43 6.24C6.57 42.62 14.64 48 24 48z"/>
                </svg>

                <span>Continue with Google</span>
            </button>
        </a>
    </div>


</div>
   
`

const subtitles = [
    "Create, manage and share forms effortlessly.",
    "From prompt to polished form instantly.",
    "Simple to build. Delightful to use."
];

const subtitle = page.querySelector("#Subtitle");

let sentenceIndex = 0;
let charIndex = 0;
let typingTimeout = null;

function typeSentence() {
    const text = subtitles[sentenceIndex];

    if (charIndex <= text.length) {
        subtitle.textContent = text.slice(0, charIndex);
        charIndex++;

        typingTimeout = setTimeout(typeSentence, 55);
    } else {
        typingTimeout = setTimeout(() => {
            sentenceIndex = (sentenceIndex + 1) % subtitles.length;
            charIndex = 1; 
            subtitle.textContent = subtitles[sentenceIndex].slice(0, charIndex);
            typingTimeout = setTimeout(typeSentence, 45);
        }, 1800);
    }
}

function openLoader(){
    const overlay = page.querySelector("#overlay");
    overlay.classList.add("show");
    overlay.replaceChildren(getLoader());
}

function closeLoader(){
    const overlay = page.querySelector("#overlay");
    overlay.classList.remove("show");
    overlay.innerHTML="";
}

async function promptButton(data) {
    openLoader();
    try {
        const questions = await getLLMResponse(data);
        Draft.updateQuestions(questions);
        navigate("/draft")
    }catch(e){
        alert(e);
        closeLoader();
    }
}



function landingEventListener(e){
    switch (e.target.id) {
        case ("LsendBtn"):
            const prompt = document.querySelector(".LpromptInput").value.trim();
            if (prompt.length < 25) alert("Minimum 25 Characters Required !!");
            else {
                promptButton (prompt)
            }
            break
    }

}




function init() {
    if (typingTimeout) return;

    sentenceIndex = 0;
    charIndex = 0;
    subtitle.textContent = "";

    typeSentence();
    addEventListener("click",landingEventListener)
    
}

function destroy() {
    clearTimeout(typingTimeout);
    typingTimeout = null;
}

return {element: page,init,destroy};
}
