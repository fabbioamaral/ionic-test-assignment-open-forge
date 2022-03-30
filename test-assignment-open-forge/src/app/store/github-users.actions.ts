import { IUserGeneralInfo, IUserSpecificInfo } from "../model/user";

export namespace GithubUsersActions {
    
    export class GetUsers {
        static readonly type = '[Github Users] Get list of users';
        constructor(public fromUserId: number) {}
    }

    export class GetUserSpecificInfo {
        static readonly type = '[Github Users] Get specific info of a user';
        constructor(public loginName: string) {}
    }

    export class GetUser {
        static readonly type = '[Github Users] Get a specific user';
        constructor(public loginName: string) {}
    }

    export class SelectUser {
        static readonly type = '[Github Users] Select a user';
        constructor(public loginName: string) {}
    }

    export class Reset {
        static readonly type = '[Github Users] Reset all data';
    }

    export class ResetSelectedUser {
        static readonly type = '[Github Users] Reset selected user';
    }

}



