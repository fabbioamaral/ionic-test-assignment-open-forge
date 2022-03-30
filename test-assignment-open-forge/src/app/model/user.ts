export interface IUserGeneralInfo {
    loginName: string,
    id: number,
    avatarUrl: string,
    specifUserInfo?: IUserSpecificInfo
}

export interface IUserSpecificInfo {
    loginName: string,
    id: number,
    fullName?: string,
    bio?: string,
    location?: string,
    company?: string,
    website?: string,
    numberOfRepo: number
}