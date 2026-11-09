const DEV_URL = "http://127.0.0.1:8000/"
import { llmQuestionSchema, questionSchema } from "../schema/dataSchema.js";



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
    return processResponse(data.questions);
  
} 

function processResponse(questions) {
    if (!Array.isArray(questions)) {
        throw new Error("The form generator returned an invalid questions list.");
    }

    const normalizedQuestions = questions.map((question, index) => {
        const parsed = llmQuestionSchema.safeParse(question);
        if (!parsed.success) {
            throw new Error(`The generated question ${index + 1} is missing a valid title.`);
        }

        const source = parsed.data;
        const type = normalizeType(source.type);
        const required = normalizeRequired(source.required);
        return questionSchema.parse({
            id: crypto.randomUUID(),
            title: source.title,
            description: source.description ?? null,
            type,
            required,
        });
    });

    return normalizedQuestions;
}

function normalizeType(type) {
    const normalized = type?.trim().toLowerCase();
    if (["paragraph", "long answer", "textarea", "long text"].includes(normalized)) return "paragraph";
    if (["date", "date picker"].includes(normalized)) return "date";
    if (["checkbox", "checkboxes", "boolean"].includes(normalized)) return "checkbox";
    // Unknown or missing LLM types become a supported short-answer field.
    return "short";
}

function normalizeRequired(required) {
    if (typeof required === "boolean") return required;
    if (typeof required === "string") return required.trim().toLowerCase() !== "false";
    return true;
}

