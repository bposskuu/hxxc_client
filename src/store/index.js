import {createStore} from 'vuex'
import userModule from "@/store/modules/userModule";
import fileModule from "@/store/modules/fileModule";
import uploadModule from "@/store/modules/uploadModule";
export default createStore({
    modules: {
        user: userModule,
        file: fileModule,
        upload: uploadModule
    }
})