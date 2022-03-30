import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { IUserGeneralInfo } from "../model/user";
import { GithubService } from "../services/github.service";
import { GithubUsersActions } from "./github-users.actions";
import { IGithubUsersStateModel } from "./github-users.state.model";
import { cloneDeep } from 'lodash';
import { patch, updateItem } from '@ngxs/store/operators';

@State<IGithubUsersStateModel>({
	name: 'githubUsersData',
	defaults: {
        currentUsers: [],
        selectedUser: null
	}
})
@Injectable()
export class GithubUserState {
	constructor(
        private readonly githubService: GithubService,
        private readonly store: Store) {}


    @Selector()
	static githubUserList(state: IGithubUsersStateModel): IUserGeneralInfo[] {
		return state.currentUsers;
	}

    @Action(GithubUsersActions.GetUsers)
    async getGithubUsersList(ctx: StateContext<IGithubUsersStateModel>, action: GithubUsersActions.GetUsers) {
        try {
            const state = ctx.getState();
            let currentUsers = cloneDeep(state.currentUsers);
            
            // call end-point
            const userList = await this.githubService.getUsers(action.fromUserId).toPromise();
            
            // update state
            ctx.patchState({
                currentUsers: currentUsers.concat(userList)
            });

        } catch (error) {
            // reset state
            ctx.patchState({
                currentUsers: []
            });
            throw error;
        }
    }

    @Action(GithubUsersActions.GetUserSpecificInfo)
    async getGithubUserInfo(ctx: StateContext<IGithubUsersStateModel>, action: GithubUsersActions.GetUserSpecificInfo) {
        try {
            const state = ctx.getState();
            let currentUsersList = cloneDeep(state.currentUsers);
            let user = currentUsersList.find(u => u.loginName === action.loginName);
                        
            // call end-point
            let userInfo = await this.githubService.getUser(action.loginName).toPromise();
            user.specifUserInfo = userInfo;

            // update state
            ctx.setState(
                patch({
                    currentUsers: updateItem<IUserGeneralInfo>(user => user.loginName === action.loginName, user)
                })
            );

        } catch (error) {
            throw error;
        }
    }

    @Action(GithubUsersActions.GetUser)
    async getUser(ctx: StateContext<IGithubUsersStateModel>, action: GithubUsersActions.GetUser) {
        try {
            let user: any = {};
            // call end-point
            let userData = await this.githubService.getUser(action.loginName).toPromise();
            
            user.loginName = userData.loginName;
            user.id = userData.id;
            user.avatarUrl = userData.avatarUrl;
            user.specifUserInfo = {
                loginName: userData.loginName,
                id: userData.id,
                fullName: userData.fullName,
                bio: userData.bio,
                location: userData.location,
                company: userData.company,
                website: userData.blog,
                numberOfRepo: userData.numberOfRepo
            }

            // update state
            ctx.setState(
                patch({
                    selectedUser: user
                })
            );

        } catch (error) {
            throw error;
        }
    }

    @Action(GithubUsersActions.SelectUser)
    selectUser(ctx: StateContext<IGithubUsersStateModel>, action: GithubUsersActions.SelectUser) {
        const state = ctx.getState();
        let currentUsersList = cloneDeep(state.currentUsers);
        let user = currentUsersList.find(u => u.loginName === action.loginName);

        // update state
        ctx.patchState({
            selectedUser: user
        });
    }

    @Action(GithubUsersActions.Reset)
    resetData(ctx: StateContext<IGithubUsersStateModel>) {
        ctx.patchState({
            currentUsers: [],
            selectedUser: null
        });
    }

    @Action(GithubUsersActions.ResetSelectedUser)
    resetSelectedUserData(ctx: StateContext<IGithubUsersStateModel>) {
        ctx.patchState({
            selectedUser: null
        });
    }
}