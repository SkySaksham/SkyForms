/*

Filled WIth TEst DATa During Development !!

*/
import { dataSchema } from "./schema/dataSchema.js";


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

export function updateDataModelLocally(){
    const id = data.userInfo.id;
    localStorage.setItem(`SkyForms__${id}`,JSON.stringify(data));
}

function getDataModelLocally() {
  const id = data.userInfo.id;

  const raw = localStorage.getItem(`SkyForms__${id}`);

  if (!raw) {
    throw Error("NO Data Locally");
  }
  const parsed = JSON.parse(raw);
  return dataSchema.parse(parsed);
}

export function repopulateDataModel(){
    try {
        const d = getDataModelLocally();
        data.userInfo = d.userInfo ;
        data.yourForms = d.yourForms;

        for (const key in d.drafts){
            if (key in data.drafts){
                data.drafts[key] =d.drafts[key].version >= data.drafts[key].version ? d.drafts[key] : data.drafts[key];
            }
            else {
                let present = false;
                for (const i of data.yourForms){
                    if (key in i) {
                        present = true;
                        break;
                    }
                }
                if (!present) data.drafts[key] = d.drafts[key];
            }
        }
    } catch(e) {
        console.log({"Some Error Ocurred Validating" : e});
    }

}
repopulateDataModel();


 


