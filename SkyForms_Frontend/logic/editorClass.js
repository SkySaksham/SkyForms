import { data } from "../store.js";


const QUESTION_TYPES = {
    short: "Short Answer",
    paragraph: "Long Answer",
    date: "Date",
    checkbox: "Checkbox",
};


export class Draft {
    constructor(id=null){

        if (id === null){
            id = crypto.randomUUID();
            data.draftForms.push(
                {
                    "id" : id,
                    "name": "Untitled"
                }
            );

            data.drafts[id] = {
                version :0,
                name: "Untitled",
                questions: []
            }
        }

        if (id in data.drafts){
            this.draft = data.drafts[id]
        }
        
        else throw new Error("Draft not found");
    }
    

    isValidQuestion(question) {
        return (
            question &&
            typeof question === "object" &&
            "id" in question &&
            typeof question.title === "string" &&
            "description" in question &&
            typeof question.type === "string" &&
            typeof question.required === "boolean"
        );
    }

    get questions() {
        return this.draft.questions;
    }

    
    addQuestion(Question){
        if (!this.isValidQuestion(Question)){
            throw new Error("Invalid question");
        }
        this.draft.questions.push(Question)
    }

    updateOrder(event){
            const [a] = this.draft.questions.splice(event.oldIndex,1);
            this.draft.questions.splice(event.newIndex,0,a);
            console.log(this.draft.questions);
    }

    getQuestion(index) { 
        if (index < 0 || index >= this.draft.questions.length) {
            return null; 
        }
        return this.draft.questions[index];
    }
    
    deleteQuestionIndex(index){
        this.draft.questions.splice(index,1);
    }

    updateQuestionIndex(question, index) {
        if (index < 0 || index >= this.draft.questions.length) {
            return false;
        }

        this.draft.questions[index] = question;
        return true;
    }

    updateCheckedIndex(index, checked) {
        if (index < 0 || index >= this.draft.questions.length) {
            return false;
        }
        if (typeof checked !== "boolean") {
            return false;
        }
        this.draft.questions[index].required = checked;
        return true;
    }

    updateTypeIndex(index, type) {
        if (index < 0 || index >= this.draft.questions.length) {
            return false;
        }
        if (!(type in QUESTION_TYPES)) {
            return false;
        }
        this.draft.questions[index].type = type;
        return true;
    }
    static updateQuestions(id, questions) {
        if (!(id in data.drafts)) {
            data.drafts[id] = {
                version: 0,
                name: "Untitled",
                questions: []
            };

            data.draftForms.push({
                id,
                name: "Untitled"
            });
        }

    data.drafts[id].questions = questions;
    }

    get getName(){
        return this.draft.name;
    }

};