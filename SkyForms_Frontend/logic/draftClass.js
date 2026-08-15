import { data} from "../store.js";
import { syncManager } from "../main.js";

const QUESTION_TYPES = {
    short: "Short Answer",
    paragraph: "Long Answer",
    date: "Date",
    checkbox: "Checkbox",
};

const ACTION_WEIGHT = {
    "add" : 5,
    "updateOrder": 5,
    "delete" : 5,
    "updateQ" : 4,
    "minor" : 2,
    "updateN": 5
}

const THRESHOLD = 15;




export class Draft {
    constructor(id=null){
        if (id === null){
            id = crypto.randomUUID();
            
            data.drafts[id] = {
                version :0,
                name: "Untitled",
                id:id,
                questions: [] 
            }
        }

        if (id in data.drafts){
            this.draft = data.drafts[id]
            syncManager.cacheLocally();
            this.staleCount = 0;
        }
        else throw new Error("Draft not found");
    }



    async accomodateStaleData(action){
        try{
            this.staleCount += ACTION_WEIGHT[action];
            if (this.staleCount>=THRESHOLD) {
                this.incrementVersion();
                const res = await syncManager.updateDraftServer(this.draft.id);
                if (!res) this.decrementVersion();
                syncManager.cacheLocally();
            }
        }catch (e){
            console.log(e);
            alert("Syncing Error");
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

    incrementVersion(){
        this.draft.version+=1;
    }
    decrementVersion() {
        this.draft.version -=1;
    }
    get questions() {
        return this.draft.questions;
    }

    get draftID(){
        return this.draft.id;
    }

    get entireDraft() {
        return this.draft;
    }
    
    async addQuestion(Question){
        if (!this.isValidQuestion(Question)){
            throw new Error("Invalid question");
        }
        this.draft.questions.push(Question);
        console.log("Question added !!");
        
        this.accomodateStaleData("add");
    }

    async updateOrder(event){
            const [a] = this.draft.questions.splice(event.oldIndex,1);
            this.draft.questions.splice(event.newIndex,0,a);
            console.log("Order Updated !!");
            
            this.accomodateStaleData("updateOrder");
    }

    getQuestion(index) { 
        if (index < 0 || index >= this.draft.questions.length) {
            return null; 
        }
        return this.draft.questions[index];
    }
    
    async deleteQuestionIndex(index){
        this.draft.questions.splice(index,1);
        this.accomodateStaleData("delete");
    }

    async updateQuestionIndex(question, index) {
        if (index < 0 || index >= this.draft.questions.length) {
            return false;
        }

        this.draft.questions[index] = question;
        this.accomodateStaleData("updateQ");
        return true;
    }

    async updateCheckedIndex(index, checked) {
        if (index < 0 || index >= this.draft.questions.length) {
            return false;
        }
        if (typeof checked !== "boolean") {
            return false;
        }

        this.draft.questions[index].required = checked;

        this.accomodateStaleData("minor");
        return true;
    }

    async updateTypeIndex(index, type) {
        if (index < 0 || index >= this.draft.questions.length) {
            return false;
        }
        if (!(type in QUESTION_TYPES)) {
            return false;
        }
        this.draft.questions[index].type = type;

        this.accomodateStaleData("minor");
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

    async updateFormName(name){
        this.draft.name = name;
        this.accomodateStaleData("updateN");
    }
};