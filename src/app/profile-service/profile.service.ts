import { Injectable } from '@angular/core';

export interface IProfile {
  firstName: string;
  lastName : string;
  username : string;
  age      : number;
  email    : string; 
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private emailDomain: string = '@blueface.com';
  public user!: IProfile;

  constructor() { }
  getProfileUser(): Promise<IProfile> {
    return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.round(Math.random())) {
        this.user = {
          firstName : 'Michael',
          lastName : 'Collins',
          username : 'michael.collins',
          age : 30,
          email: ''
        };
        resolve(this.constructEmail(this.user));
      } else {
        reject({ error: 'Profile not found' });
      }
      }, Math.random() * 5000);
    });
  }

  setName(firstName: string, lastName: string) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(firstName);
        console.log(this.user);
          if (Math.round(Math.random())) {
          this.user.firstName = firstName;
          this.user.lastName  = lastName;
          resolve(this.user);
        } else {
         reject({ error: 'Invalid name' });
        }
      }, Math.random() * 5000);
    });
  }

  private constructEmail(user:IProfile): IProfile {
    user.email = user.firstName.replace(/\s+/g, '') + '.' + user.lastName.replace(/\s+/g, '') + this.emailDomain;
    return user;
   }

  //  private validateEmail(user) {

  //  }

  setUserEmail(user: IProfile) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(user);
          if (Math.round(Math.random())) {
          if(user && user.firstName && user.lastName) {
            console.log(this.constructEmail(user));
            resolve(user)
          } 
          resolve(this.user);
        } else {
         reject({ error: 'Error on Email Generation' });
        }
      }, Math.random() * 5000);
    });
  }

}
