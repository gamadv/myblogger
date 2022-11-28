import { api } from './api'

export type TBlog = {
    userId: number,
    id: number,
    title: string
    body: string
    email: string
}
export type TUser = {
    id: number,
    name: string
    username: string
    email: string
    address: {
        street: string
        suite: string
        city: string
        zipcode: string
        geo: {
            lat: string
            lng: string
        }
    },
    phone: string
    website: string
    company: {
        name: string
        catchPhrase: string
        bs: string
    }
}

const blogEndpointPath = {
    postList: '/posts',
    userList: '/users'

}

async function FetchBlogList(id?: number) {
    const parseUrl = id ? `${blogEndpointPath.postList}/${id}/comments` : blogEndpointPath.postList

    return api.get<TBlog[]>(parseUrl)
}
async function FetchUserInfo(id?: number) {
    const parseUrl = id ? `${blogEndpointPath.userList}/${id}` : blogEndpointPath.userList

    return api.get<TUser>(parseUrl)
}


export { FetchBlogList, FetchUserInfo }