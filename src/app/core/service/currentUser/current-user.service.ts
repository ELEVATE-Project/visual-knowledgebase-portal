import { Injectable } from '@angular/core';
import { LocalStorageService } from '../localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  token : any;
  constructor(private storage: LocalStorageService) {
  }

  setUser(data:any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.setLocalStorage('userDetails', JSON.stringify(data)).then(success => {
        this.token = data;
        resolve(data);
      }).catch(error => {
        reject(error)
      })
    })
  }

  getUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.getLocalStorage('userDetails').then((data:any) => {
        this.token = JSON.parse(data);
        resolve(JSON.parse(data));
      }).catch(error => {
        reject()
      })
    })
  }

  deleteUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.deleteAllStorage().then(data => {
        resolve(data);
      }).catch(error => {
        reject()
      })
    })
  }
  
  getAccessToken(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.getLocalStorage('userDetails').then(data => {
        data ? resolve(data) : resolve('');
      }).catch(error => {
        resolve('')
      })
    })
  }
}
