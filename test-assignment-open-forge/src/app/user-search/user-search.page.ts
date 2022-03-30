import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { IUserGeneralInfo } from '../model/user';
import { GithubUsersActions } from '../store/github-users.actions';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-user-search',
  templateUrl: 'user-search.page.html',
  styleUrls: ['user-search.page.scss']
})
export class UserSeachPage {
  user: IUserGeneralInfo;
  userSearched: string;

  constructor(
    private store: Store,
    private iab: InAppBrowser
    ) {}

  ionViewWillEnter() {
    this.user = this.store.selectSnapshot(state => state.githubUsersData.selectedUser);
    if (this.user) this.userSearched = this.user.specifUserInfo.fullName;
  }

  ionViewWillLeave() {
    this.store.dispatch(new GithubUsersActions.ResetSelectedUser());
  }

  searchUser(loginName: string) {
    this.store.dispatch(new GithubUsersActions.GetUser(loginName)).subscribe(() => {
      this.user = this.store.selectSnapshot(state => state.githubUsersData.selectedUser);
    });
  }

  clearSearchBar() {
    this.store.dispatch(new GithubUsersActions.ResetSelectedUser());
  }

  openWebsite(url: string) {
    this.iab.create(url);
  }

}
