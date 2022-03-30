import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  public githubApiUrl = 'https://api.github.com/users';
  public array1: any[];

  constructor(private http: HttpClient) { }

  getUsers(fromUserId: number): Observable<any> {
    try {
      let userList = [];
      return this.http.get(`${this.githubApiUrl}?since=${fromUserId}&per_page=10`).pipe(
        map((response: any[]) => {
          if(response.length > 0) {
            response.forEach(u => userList.push(this.formatGetUsers(u)));
            return userList;
          }
        }),
        catchError((error) => {
          console.error('Error receiving github users list: ' + error.error);
          return throwError(error);
        })
      );
    } catch (error) {
        return throwError(error)
    }
  }

  getUser(username: string): Observable<any> {
    try {
      let user: any = {};
      return this.http.get(`${this.githubApiUrl}/${username}`).pipe(
        map((response: any) => {
          if(response.hasOwnProperty('id')) {
            user = this.formatGetUser(response);
            return user;
          }
        }),
        catchError((error) => {
          console.error('Error receiving a github user: ' + error.error);
          return throwError(error);
        })
      );

    } catch (error) {
      return throwError(error)
    }
  }

  formatGetUsers(dataFromApi: any) {
    let responseFormatted: any = {};
    responseFormatted.loginName = dataFromApi.login;
    responseFormatted.id = dataFromApi.id;
    responseFormatted.avatarUrl = dataFromApi.avatar_url;

    return responseFormatted;
  }

  formatGetUser(dataFromApi: any) {
    let responseFormatted: any = {};
    responseFormatted.loginName = dataFromApi.login;
    responseFormatted.id = dataFromApi.id;
    responseFormatted.fullName = dataFromApi.name;
    responseFormatted.bio = dataFromApi.bio;
    responseFormatted.location = dataFromApi.location;
    responseFormatted.company = dataFromApi.company;
    responseFormatted.website = dataFromApi.blog;
    responseFormatted.numberOfRepo = dataFromApi.public_repos;
    responseFormatted.avatarUrl = dataFromApi.avatar_url;
    
    return responseFormatted;

  }

}
