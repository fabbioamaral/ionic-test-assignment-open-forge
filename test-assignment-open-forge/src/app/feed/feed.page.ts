import { Component, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { IUserGeneralInfo } from '../model/user';
import { GithubUserState } from '../store/github-users.state';
import { cloneDeep } from 'lodash'
import { GithubUsersActions } from '../store/github-users.actions';
import { IonInfiniteScroll, NavController } from '@ionic/angular';

@Component({
  selector: 'app-feed',
  templateUrl: 'feed.page.html',
  styleUrls: ['feed.page.scss']
})
export class FeedPage {
  @Select(GithubUserState.githubUserList) userList$: Observable<IUserGeneralInfo[]>;
  userListSubscription: Subscription;
  userList: any[] = undefined;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(
    private store: Store,
    private navCtrl: NavController
    ) {}

  ionViewWillEnter() {
    this.userListSubscription = this.userList$.subscribe(list => {
      this.userList = cloneDeep(list);
    });

    this.getUsersList();
  }

  ionViewWillLeave() {
    // freeing subscription
    if(typeof this.userListSubscription !== 'undefined') this.userListSubscription.unsubscribe();
  }

  getUsersList(event?) {
    const lastId = this.getLastUserId();
    this.store.dispatch(new GithubUsersActions.GetUsers(lastId)).subscribe(() => {
      const users: IUserGeneralInfo[] = this.store.selectSnapshot(state => state.githubUsersData.currentUsers);
      users.forEach(u => {
        this.store.dispatch(new GithubUsersActions.GetUserSpecificInfo(u.loginName));
      });
      
      if(event) event.target.complete()
    });
  }

  getLastUserId(): number {
    const users = this.store.selectSnapshot(state => state.githubUsersData.currentUsers);
    let lastUserId;
    
    if (users.length > 0) lastUserId = users[users.length - 1].id;
    else lastUserId = 1;
    
    console.log(lastUserId)
    return lastUserId;
  }

  onSelectUser(loginName: string) {
    this.store.dispatch(new GithubUsersActions.SelectUser(loginName));
    this.navCtrl.navigateForward('/tabs/user-search')
  }

}
