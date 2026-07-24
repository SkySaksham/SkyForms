const DEV_URL = "http://127.0.0.1:8000/"


let a = "generate me form for IEEE uni club's registration"




export async function getLLMResponse(userPrompt){
    const response = await fetch(`${DEV_URL}llm_form`,{
        method : "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body : JSON.stringify({
            prompt : userPrompt
        })
    })
    if (!response.ok) {
        throw new Error("Please try again later.");
    }
    const data = await response.json();
    processResponse(data.questions)
    return data.questions
  
} 

function processResponse(questions) {
    for (let i in questions) {
        questions[i].id = crypto.randomUUID();
    }
}

