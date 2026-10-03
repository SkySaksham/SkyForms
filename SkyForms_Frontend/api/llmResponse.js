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
    const errorData = await response.json();

    console.error("LLM API error:", errorData);

    throw new Error(
        errorData.detail || "Failed to generate form"
    );
    }
    const data = await response.json();
    console.log("FULL RESPONSE:", data);
    console.log("QUESTIONS:", data.questions);
    console.log("QUESTIONS IS ARRAY:", Array.isArray(data.questions));

    
    processResponse(data.questions)
    
    return data.questions
  
} 

function processResponse(questions) {
    for (let i in questions) {
        questions[i].id = crypto.randomUUID();
    }
}

