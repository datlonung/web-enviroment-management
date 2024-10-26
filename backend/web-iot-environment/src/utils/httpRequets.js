import axios from "axios"

const baseURL = process.env.REACT_APP_API_URL

const httpRequets = axios.create({
    baseURL: baseURL,
    withCredentials: true,
})

export const get = async (path, option = []) => {
    const res = await httpRequets.get(path, option)
    return res.data
}

export const post = async (path, data, option = []) => {
    const res = await httpRequets.post(path, data, option)
    return res.data
}

export const put = async (path, data, option = []) => {
    const res = await httpRequets.put(path, data, option)
    return res.data
}

export const patch = async (path, data, option = []) => {
    const res = await httpRequets.patch(path, data, option)
    return res.data
}

export const del = async (path, option = []) => {
    const res = await httpRequets.delete(path, option)
    return res.data
}


export default httpRequets