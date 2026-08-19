import {data} from "../store.js";
import { userInfoSchema,dataSchema } from "../schema/dataSchema.js";
import { updateDraftServer } from "../api/updateDraftServer.js";
import { draftFormSchema } from "../schema/dataSchema.js";
import { navigate } from "../route.js";
import { getUserHomePageData } from "../api/getUserHomePageData.js";


export class Sync{
    constructor (id) {
        this.data = data;
        this.userId = id;
    }


    repopulateMemoryFromLocal(){
        const raw = localStorage.getItem(`SkyForms__${this.userId}`);
       
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
        localStorage.setItem(`SkyForms__${this.userId}`,JSON.stringify(this.data));
        console.log("updated Locally !!");
    }

    clearLocalCache() {
        localStorage.removeItem(`SkyForms__${this.userId}`);
        console.log("DELETED CACHE !!");
    }
    
    async updateDraftServer(draftID){
        let postBody = {"owner_id" :this.userId, ...data.drafts[draftID]}
        let res = await updateDraftServer(postBody); 

        if (!res) {
            return false
        }
        if (res.status === "success"){
            console.log("Successfully synced !!");
            return true;
        }
        else if (res.status==="stale") {
            console.log(res);
            delete res.owner_id;
            // res.questions=JSON.parse(res.questions);
            const validate = draftFormSchema.safeParse(res);
            if (validate.success) {
                data.drafts[draftID] = validate.data;
                alert("Stale Draft Form !! Synced With Latest Version !!")
                // this.cacheLocally();
                navigate(`\draft?draft=${draftID}`);
                return true;
            }
            else {
                console.log(validate.error);
                return false;
            }
        }
        
    }



    async fetchAppState(){
        const response = await getUserHomePageData();

        if (!response){
            console.log(response);
            alert ("Cant Reach Servers !!!");
            navigate("/");
        }
        else {
            for (const key in response["draft"]) {
                this.data.drafts[key] = response["draft"][key]
            }
            console.log("drafts SYnced !!");
            console.log("only syncing drafts rn");
            console.log(this.data.drafts);
        }
    }

    syncUserInfo(data){
        let a = userInfoSchema.safeParse(data);
        if (a.success) {
            this.data.userInfo = a.data;
            console.log(this.data.userInfo);
            return true;
        }
        console.error(result.error);
        return false;
    }
    } 



