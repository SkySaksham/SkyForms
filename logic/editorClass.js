import { data } from "../store.js";


export class Draft {
    constructor(){
        if (!data.draft || Object.keys(data.draft).length==0){
            this.draft = {
                id : crypto.randomUUID(),
                questions : []
            }
            data.draft = this.draft ;
        }
        else{
            this.draft = data.draft;
        }
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

    getId(){
        return this.draft.id;
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

};