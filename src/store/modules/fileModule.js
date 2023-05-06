import file from '@/store/actions/fileActions'

export default {
    state: () => {
        return {
            files: [],
            searchedList: [],
            currentDir: {},
            modalDisplay: {
                action: null
            },
            dirStack: [],
            selectedFile: null,
            searchQuery: '',
            sortSelect: 'name',
            sortDirection: 1,
            sharedFile: null
        }
    },
    getters: {
        getCurrentDir: state => {
            return state.currentDir
        },
        getFiles: state => {
            return state.files
        },
        getModalDisplay: state => {
            return state.modalDisplay.action
        },
        getDirStack: state => {
            return state.dirStack
        },
        getSelectedFile: state => {
            return state.selectedFile
        },
        getSearchedList: state => {
            return state.files.filter(file => file.name.toLowerCase().includes(state.searchQuery))
        },
        getSearchQuery: state => {
            return state.searchQuery
        },
        getSortSelect: state => {
            return state.sortSelect
        },
        getSortDirection: state => {
            return state.sortDirection
        },
        getSharedFile: state => {
            return state.sharedFile
        }
    },
    mutations: {
        setFiles(state, files) {
            state.files = files
        },
        setCurrentDir(state, dir){
            state.currentDir = dir
        },
        setModalDisplay(state, action){
            state.modalDisplay.action = action
        },
        addFile(state, file) {
            state.files.push(file)
        },
        setDirStack(state, stack) {
            state.dirStack = stack
        },
        pushDirStack(state, dir) {
            state.dirStack.push(dir)
        },
        setSelectedFile(state, file) {
            state.selectedFile = file
        },
        setIsActive(state, bool) {
            state.selectedFile.isActive = bool
        },
        rmFile(state, fileId) {
            state.files = state.files.filter(file => file._id !== fileId)
        },
        setSearchQuery(state, query) {
            state.searchQuery = query
        },
        setSortSelect(state, select) {
            state.sortSelect = select
        },
        setSortDirection(state, direction) {
            state.sortDirection = direction
        },
        setSharedFile(state, file) {
            state.sharedFile = file
        }
    },
    actions: {
        setPrevDir({commit, state}) {
            commit('setCurrentDir', state.dirStack.pop())
        },

        async getFiles({commit, state}) {
            await file.getFiles(state.currentDir._id, state.sortSelect, state.sortDirection, (files) => {
                commit('setFiles', files)
            })
        },

        async createDir({commit, state}, name) {
            await file.createDir(state.currentDir._id, name, (file) => {
                commit('addFile', file)
            })
        },

        async removeFile({commit}, fileId) {
            await file.removeFile(fileId, (fileId, user) => {
                commit('rmFile', fileId)
                commit('setCurrentUser', user)
            })
        },

        async renameFile({state}, name) {
            await file.renameFile(state.selectedFile._id, name, (renamedFile) => {
                state.files.find(file => file._id === renamedFile._id).name = renamedFile.name
            })
        },

        async uploadFile({commit, state, dispatch}, uploadedFile) {
            dispatch('showUploader')
            await file.uploadFile(uploadedFile, state.currentDir._id, (commitName, commitValue) => {
                commit(commitName, commitValue)
            }, (file, user) => {
                commit('addFile', file)
                commit('setCurrentUser', user)
            })
        },

        async downloadFile(context, downloadedFile) {
            await file.downloadFile(downloadedFile)
        },

        async getFileByAccessLink({commit}, url) {
            await file.getFileByAccessLink(url, (file) => {
                commit('setSharedFile', file)
            })
        },

        async getAccessLink({state}) {
            await file.getAccessLink(state.selectedFile._id, (fileWithLink) => {
                state.files.find(file => file._id === fileWithLink._id).accessLink = fileWithLink.accessLink
            })
        },

        async removeAccessLink({state}) {
            await file.removeAccessLink(state.selectedFile._id, (fileWithoutLink) => {
                state.files.find(file => file._id === fileWithoutLink._id).accessLink = fileWithoutLink.accessLink
            })
        },
        async uploadAvatar({commit}, uploadedFile) {
            await file.uploadAvatar(uploadedFile, (user) => {
                commit('setCurrentUser', user)
            })
        },
        async removeAvatar({commit}) {
            await file.removeAvatar((user) => {
                commit('setCurrentUser', user)
            })
        },

    }
}