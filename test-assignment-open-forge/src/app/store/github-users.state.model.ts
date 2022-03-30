import { IUserGeneralInfo } from "../model/user";

export interface IGithubUsersStateModel {
    currentUsers: IUserGeneralInfo[],
    selectedUser: IUserGeneralInfo
}