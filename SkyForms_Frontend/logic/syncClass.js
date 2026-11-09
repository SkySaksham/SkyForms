import {data} from "../store.js";
import { userInfoSchema,dataSchema } from "../schema/dataSchema.js";
import { updateDraftServer,submitDraftServer } from "../api/updateDraftServer.js";
import { draftFormSchema } from "../schema/dataSchema.js";
import { navigate } from "../route.js";
import { getUserHomePageData } from "../api/getUserHomePageData.js";


export class Sync{
    constructor (id) {
        this.data = data;
        this.userId = id;
        this.onStateChange = null;
    }

    setOnStateChange(callback) {
        this.onStateChange = callback;
    }


    repopulateMemoryFromLocal(){
        const raw = localStorage.getItem(`SkyForms__${this.userId}`);
       
        if (!raw) {
            throw Error("NO Data Locally");
        }
        const cached = JSON.parse(raw);
        const parsed = dataSchema.parse({
            ...cached,
            userInfo: {
                ...cached.userInfo,
                id: cached.userInfo?.id || this.userId,
            },
        });
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
        console.log (this.data);
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

            if (response["publish"]){
                this.data.yourForms = response["publish"];
            }
            
            console.log("drafts SYnced !!");
           
            console.log(this.data.yourForms);
            console.log(this.data.drafts);
            this.onStateChange?.(this.data);
        }
    }

    async refreshDraftFromServer(draftID) {
        const response = await getUserHomePageData();
        if (!response) return false;

        const serverDraft = response.draft?.[draftID];
        if (serverDraft) {
            const validate = draftFormSchema.safeParse(serverDraft);
            if (!validate.success) {
                console.error("Invalid draft received from server:", validate.error);
                return false;
            }
            this.data.drafts[draftID] = validate.data;
            this.cacheLocally();
        }

        return true;
    }

    syncUserInfo(data){
        let a = userInfoSchema.safeParse({
            ...data,
            id: data?.id || this.userId,
        });
        if (a.success) {
            this.data.userInfo = a.data;
            console.log(this.data.userInfo);
            return true;
        }
        console.error(a.error);
        return false;
    }


   async submitDraft(draftID) {
    let postBody = {
        owner_id: this.userId,
        ...data.drafts[draftID]
    };

    let res = await submitDraftServer(postBody);

    if (!res) {
        return false;
    }

    if (res.status === "latest") {
        console.log("Successfully submitted !!");

        const submittedDraft = data.drafts[draftID];

        delete data.drafts[draftID];

        data.yourForms.push(res);

        this.cacheLocally();

        return true;
    }

    else if (res.status === "stale") {
        console.log("Local form is stale");
        console.log(res);

        delete res.owner_id;

        const validate = draftFormSchema.safeParse(res);

        if (validate.success) {
            data.drafts[draftID] = validate.data;

            alert("Updated Form Found !! Synced With Latest Version !!");
            navigate(`\\draft?draft=${draftID}`);

            return true;
        }
        else {
            console.log(validate.error);
            return false;
        }
    }

    else if (res.status === "stale_publish") {
        console.log("Form was already published elsewhere");

        const submittedDraft = data.drafts[draftID];

        delete data.drafts[draftID];
        delete res.status;
        data.yourForms.push(res);

        this.cacheLocally();

        alert("This form was already published from another device.");

        navigate("/home");

        return true;
    }

    return false;
}

    } 



