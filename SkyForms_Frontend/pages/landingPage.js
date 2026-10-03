import { getLoader } from "../components/loader.js"
import { getLLMResponse } from "../api/llmResponse.js";
import { Draft } from "../logic/draftClass.js";
import { navigate } from "../route.js";
import { googleAuth } from "../api/googleAuth.js"; 

export function getLandingPage(){

    const page = document.createElement("div");
   

    page.innerHTML = `
    
    <div id="overlay" class = "overlay"> </div>
    <div class="Lcontainer">

    <div class="Lhead">SkyForms</div>
    <div id = "Subtitle" class="Lsubhead"></div>

    <div class="Lshowcase">
        <div class="Lcard" data-position="left">
            <img src="/assets/1.png" alt="Build forms in seconds">
        </div>

        <div class="Lcard" data-position="center">
            <img src="/assets/2.png" alt="Preview your forms easily">
        </div>

        <div class="Lcard" data-position="right">
            <img src="/assets/3.png" alt="Manage all your forms">
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
        <div id="google-signin-btn"></div>
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
        const id = crypto.randomUUID();
        Draft.updateQuestions(id,questions);
        navigate(`/draft?draft=${id}`)
    }catch(e){
        alert(e);
        closeLoader();
    }
}



function landingEventListener(e){
    const target = e.target.closest("[id]");
    if (!target) return;
    switch (target.id) {
        case ("LsendBtn"):
            const prompt = document.querySelector(".LpromptInput").value.trim();
            if (prompt.length < 25) alert("Minimum 25 Characters Required !!");
            else {
                promptButton (prompt)
            }
            break     
    }
}

const cards = page.querySelectorAll(".Lcard");
const positions = ["left", "center", "right"];
let rotationInterval = null;

function rotateCards() {
    cards.forEach(card => {
        const current = card.dataset.position;
        const idx = positions.indexOf(current);
        card.dataset.position = positions[(idx + 1) % 3];
    });
}

function init() {
    if (typingTimeout) return;
    googleAuth.renderButton("google-signin-btn");
    
    sentenceIndex = 0;
    charIndex = 0;
    subtitle.textContent = "";

    typeSentence();
    addEventListener("click",landingEventListener)
    rotationInterval = setInterval(rotateCards, 5000);
    
}

function destroy() {
    clearTimeout(typingTimeout);
    typingTimeout = null;
    clearInterval(rotationInterval);
    rotationInterval = null;
    removeEventListener("click",landingEventListener)
}

return {element: page,init,destroy};
}
