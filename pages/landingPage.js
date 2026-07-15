export function getLandingPage(){

    const page = document.createElement("div");


    page.innerHTML = `
    
    
<div class="back">
    
    <div class="card animate__animated animate__zoomInUp animate__slow">
        <div>
            <div class="top animate__animated animate__fadeIn animate__slow animate__delay-1s">
                <div class="loader"></div>
                <div class="header animate__animated animate__fadeInUp animate__delay-2s">Sky Forms</div>
                <div class="loader"></div>
            </div>
            <div id = "Subtitle" class="subtitle animate__animated animate__fadeIn animate__slow animate__delay-1s"></div>
        </div>

        <div class="inputwrap">
            <input id="prompt" placeholder="Describe the form you'd like to create...">
            <button class="generate">Generate →</button>
        </div>

        <div class="mid animate__animated animate__fadeIn animate__slow animate__delay-1s">
            <!-- From Uiverse.io by elijahgummer --> 
            <button class="styled-button">
             Register Now
            </button>
            <div> Login To Get Started</div>
        </div>
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
let wordIndex = 0;
let typingTimeout;


function typeSentence() {
    const words = subtitles[sentenceIndex].split(" ");
    subtitle.textContent += words[wordIndex] + " ";
    wordIndex++;
    if (wordIndex < words.length) {
        typingTimeout= setTimeout(typeSentence, 250);
    } else {
        typingTimeout= setTimeout(deleteSentence, 2000);
    }
    }

    function deleteSentence() {
        const words = subtitle.textContent.trim().split(" ");

        words.pop();
        subtitle.textContent = words.join(" ");

        if (words.length > 0) {
            subtitle.textContent += " ";
            typingTimeout= setTimeout(deleteSentence, 150);
        } else {
            sentenceIndex = (sentenceIndex + 1) % subtitles.length;
            wordIndex = 0;
            typingTimeout=setTimeout(typeSentence, 250);
        }
    }

function mount () {
    typeSentence();
}

function destroy (){
    clearTimeout(typingTimeout);
}

return {element: page,mount,destroy};
}
