import {data} from "../store.js";
import { userInfoSchema,dataSchema } from "../schema/dataSchema.js";

export class Sync{
    constructor (id) {
        this.data = data;
        this.userId = id;
    }


    repopulateMemoryFromLocal(){
        const raw = localStorage.getItem(`SkyForms__${this.userId}`);
        console.log(raw);
        if (!raw) {
            throw Error("NO Data Locally");
        }
        const parsed = dataSchema.parse(JSON.parse(raw));
        this.data.userInfo = parsed.userInfo;

        console.log (parsed);
        
        this.data.yourForms = parsed.yourForms;
        if (Object.keys(this.data.drafts).length === 0) {
            this.data.drafts = parsed.drafts;
        }
        else {
            for (const [id, value] of Object.entries(parsed.drafts)) {
                if (Object.hasOwn(this.data.drafts,id)) {
                    this.data.drafts[id] = this.data.drafts[id].version >= value.version ? this.data.drafts[id] : value;
                }
                else this.data.drafts[id] = value;
            }
        }
    }

    cacheLocally(){
        console.log("updated !!")
        console.log(this.data);
        console.log(data);
        localStorage.setItem(`SkyForms__${this.userId}`,JSON.stringify(this.data))
    }

    


    } 



