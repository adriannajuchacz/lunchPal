import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // TODO: workaround for not storing a user session

  public user = null;
  public pass : string;
  public loginStatus = false
  public token: string;
  public isAdmin: boolean;
  public isBlocked: boolean;

  private username = new BehaviorSubject('');
  currentUsername = this.username.asObservable();

  constructor(private http: HttpClient) {
    let loggedSession = localStorage.getItem("loggedIn")
    if (loggedSession != null) {
      this.loginStatus = true
      this.token = localStorage.getItem("token")
      this.user = JSON.parse(localStorage.getItem("user"))
      this.isAdmin = this.user.email.startsWith('admin')
      this.isBlocked = this.user.blocked
    }
  }

  public async registerUser(user) {
    let userPost = this.http.post("http://localhost:3000/users/new", user)
    return userPost
  }

  public async updateUser(user) { 
    let link = "http://localhost:3000/users/"+user._id;
    
    let userPut = this.http.put(link, user, {headers: new HttpHeaders().set('Authorization', this.token), })
    this.user = user;
    localStorage.setItem("user", JSON.stringify(this.user))
    return userPut
  }

  public async login(email, password): Promise<boolean> {


    this.pass = password;
    const login = { email: email, password: password };

    let loginSuccess: Promise<boolean> = new Promise((resolve, reject) => {

      let userPost = this.http.post("http://localhost:3000/users/login", login)

      userPost.subscribe((info) => {
        console.log(info)
        this.user = info["user"]
        this.token = info["accessToken"]
        this.loginStatus = true
        this.isAdmin = this.user.email.startsWith('admin')
        this.isBlocked = this.user.blocked
        localStorage.setItem("loggedIn", "logged")
        localStorage.setItem("user", JSON.stringify(this.user))
        localStorage.setItem("token", this.token)
        resolve(true)
      },
        (error) => {
          reject("We have an error when you logged in")
        })
    })
    
    return loginSuccess
  }

  public async resetPassword(email) {
    let userPost = this.http.post("http://localhost:3000/users/reset", email)
    return userPost
  }

  public logout() {
    this.loginStatus = false
    this.user = null;
    localStorage.clear()
  }


  public isLogIn() {
    localStorage.getItem("user")
    return this.loginStatus
  }

  public getUserLogged() {
    return this.user;
  }

  public checkIfAdmin() {
    return this.isAdmin;
  }

  public checkIfBlocked() {
    return this.isBlocked;
  }

  public getPass() {
    return this.pass;
  }

  public setPass(pa) {
    this.pass= pa;
  }

}
