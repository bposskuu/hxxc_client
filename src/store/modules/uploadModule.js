
export default {
    state: () => {
        return {
            uploadFiles: [],
            isVisible: false
        }
    },
    getters: {
        getIsVisible: state => {
            return state.isVisible
        },
        getUploadFiles: state => {
            return state.uploadFiles
        },

    },
    mutations: {
        setIsVisible(state, isVisible) {
            state.isVisible = isVisible
        },
        addUploadFile(state, file) {
            state.uploadFiles.push(file)
        },
        setProgress(state, payload) {
            state.uploadFiles = state.uploadFiles.map(file => file.id === payload.file_id ? {...file, progress: payload.progress} : {...file})
        }
    },
    actions: {
        showUploader({commit}) {
            commit('setIsVisible', true)
        },
        hideUploader({commit}) {
            commit('setIsVisible', false)
        },
    }
}