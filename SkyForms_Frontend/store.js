/*

Filled WIth TEst DATa During Development !!

*/


export let data = {
    userInfo : {
        name:"Saksham Yadav",
        email: "skysaksham2@gmail.com"
    },

    yourForms : [{
        name : "Resigstration",
        id : 121212,
        status : true
    }],


    drafts : { 
        "jsajks" : {
            version : 0,
            name: "hii",
            id:"jsajks",
            questions:
            [{
                id: 1,
                title: "What is your full name?",
                description: null,
                type: "short",
                required: true,
            },{
                id: 2,
                title: "What is your email address?",
                description: "We'll use this to contact you.",
                type: "short",
                required: true,
            },{
                id: 3,
                title: "Tell us about yourself.",
                description: "A brief introduction is enough.",
                type: "paragraph",
                required: false,
            },
            {
                id: 4,
                title: "Tell us about yourself.",
                description: "A brief introduction is enough.",
                type: "paragraph",
                required: false,
            },
            {
                id: 5,
                title: "Tell us about yourself.",
                description: "A brief introduction is enough.",
                type: "paragraph",
                required: false,
            }], 
        }
    }
}


export function getDraftsMetaData(){
    const meta = [];
    for (const i of Object.values(data.drafts)) meta.push({id:i.id,name:i.name});
    return meta;
}
 


