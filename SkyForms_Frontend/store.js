/*

Filled WIth TEst DATa During Development !!

*/
import { dataSchema } from "./schema/dataSchema.js";

export let data = {
    userInfo : {},
    yourForms : [],
    drafts : {},
    

}

 
/*
export let data = {
    userInfo : {
        id: "550e8460-e29b-41d4-a716-446655440900",
        name:"Saksham Yadav",
        email: "skysaksham2@gmail.com"
    },

    yourForms : [{
        name : "Resigstration",
        id : "500e8460-e29b-49d4-a716-446655440900",
        status : true
    }],


    drafts : { 
        "550e8400-e29b-41d4-a716-446655440000" : {
            version : 0,
            name: "hii",
            id:"550e8400-e29b-41d4-a716-446655440000",
            questions:
            [
                {
                    id: "7f3a9c21-5d84-4e67-a912-3b8f6c2d1e45",
                    title: "What is your full name?",
                    description: "",
                    type: "short",
                    required: true,
                },
                {
                    id: "b2e8d741-9f35-4a16-c728-5d3b0e91f624",
                    title: "What is your email address?",
                    description: "We'll use this to contact you.",
                    type: "short",
                    required: true,
                },
                {
                    id: "c6a1f839-2b47-4d05-e913-8f6c7a2e5140",
                    title: "Tell us about yourself.",
                    description: "A brief introduction is enough.",
                    type: "paragraph",
                    required: false,
                },
                {
                    id: "e4d7b192-6c53-48af-a821-9b0f3d75c624",
                    title: "Tell us about yourself.",
                    description: "A brief introduction is enough.",
                    type: "paragraph",
                    required: false,
                },
                {
                    id: "a9c5e318-7f62-4b04-d836-2e1a9c57f840",
                    title: "Tell us about yourself.",
                    description: "A brief introduction is enough.",
                    type: "paragraph",
                    required: false,
                },
            ], 
        }
    }
}

*/

export function getDraftsMetaData(){
    const meta = [];
    for (const i of Object.values(data.drafts)) meta.push({id:i.id,name:i.name});
    return meta;
}









 


