import axios from 'axios'
import {API_URL} from "../../../config";

export default {
     async getFiles (dirId, sort, direction, callback) {
        try {
            let query = API_URL + '/api/files'
            if (dirId && sort && direction) query+= '?parent=' + dirId + '&sort=' + sort + '&direction=' + direction
            else if (dirId) query+= '?parent=' + dirId
            else if (sort && direction) query += '?sort=' + sort + '&direction=' + direction


            const response = await axios.get(query,
                {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}})

            callback(response.data)
        } catch (e) {
            console.log(e.response.data.message)
        }
    },

     async createDir (dirId, name, callback)  {
        try {
            const response = await axios.post(API_URL + `/api/files`,
                {
                    name,
                    parent: dirId,
                    type: 'dir'
                },
                {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}})

            callback(response.data)
        } catch (e) {
            console.log(e.response.data.message)
        }
    },

    async removeFile (fileId, callback) {
        try {
            const response = await axios.delete(API_URL + `/api/files?id=${fileId}`,
                {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}})

            callback(response.data.file_id, response.data.user)
        } catch (e) {
            console.log(e.response.data.message)
        }
    },

     async renameFile (fileId, name, callback) {
        try {
            const response = await axios.put(API_URL + `/api/files`, {
                    id: fileId,
                    name
                },
                {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}})

            callback(response.data)
        } catch (e) {
            console.log(e.response.data.message)
        }
    },

    async uploadFile (file, dirId, commit,callback) {
        try {
            const formData = new FormData()
            formData.append('file', file)
            if (dirId) {
                formData.append('parent', dirId)
            }

            const uploadFile = {id: Date.now(),name: file.name, progress: 0}
            commit('addUploadFile', uploadFile)
            const response = await axios.post(API_URL + `/api/files/upload`,
                formData, {
                    headers: {Authorization: 'Bearer ' + localStorage.getItem('token')},
                    onUploadProgress: progressEvent => {
                        const totalLength = progressEvent.event.lengthComputable ? progressEvent.total : progressEvent.event.target.getResponseHeader('content-length') || progressEvent.event.target.getResponseHeader('x-decompressed-content-length');
                        console.log('total', totalLength)
                        if (totalLength) {
                            commit('setProgress', { file_id: uploadFile.id, progress: Math.round((progressEvent.loaded * 100) / totalLength)})
                        }
                    }
                })

            callback(response.data.file, response.data.user)
        } catch (e) {
            console.log(e.response.data.message)
        }
    },

    async downloadFile (file) {
        try {
            const response = await fetch(API_URL + `/api/files/download?id=${file._id}`,
                {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}})

            if (response.status === 200) {
                const blob = await response.blob()
                const downloadUrl = window.URL.createObjectURL(blob)
                const link = document.createElement('a')
                link.href = downloadUrl
                link.download = file.name
                document.body.appendChild(link)
                link.click()
                link.remove()
                if (file.type === 'dir') {
                    await axios.delete(API_URL + `/api/files/removeArchive?id=${file._id}`,
                        {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}})
                }
            }
        } catch (e) {
            console.log(e.response.data.message)
        }
    },

    async getFileByAccessLink (url, callback){
        try {
            const response = await axios.get(API_URL + `/api/files/byaccesslink?url=${url}`)

            callback(response.data)
        } catch (e) {
            console.log(e.response.data.message)
        }
    },

    async getAccessLink (id, callback){
        try {
            const response = await axios.get(API_URL + `/api/files/accesslink?id=${id}`,
                {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}})

            callback(response.data)
        } catch (e) {
            console.log(e.response.data.message)
        }
    },

    async removeAccessLink (id, callback){
        try {
            const response = await axios.delete(API_URL + `/api/files/accesslink?id=${id}`,
                {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}})

            callback(response.data)
        } catch (e) {
            console.log(e.response.data.message)
        }
    },

    async uploadAvatar (file, callback){
        try {
            const formData = new FormData()
            formData.append('file', file)


            const response = await axios.post(API_URL + `/api/files/avatar`, formData,
                {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}})

            callback(response.data)
        } catch (e) {
            console.log(e.response.data.message)
        }
    },

    async removeAvatar (callback){
        try {
            const response = await axios.delete(API_URL + `/api/files/avatar`,
                {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}})

            callback(response.data)
        } catch (e) {
            console.log(e.response.data.message)
        }
    },
}