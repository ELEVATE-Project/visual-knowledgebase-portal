import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() {
  }

  setLocalStorage(key:any, value:any): Promise<any> {
    return new Promise((resolve, reject) => {
    let data =  localStorage.setItem(key, value)
     resolve(data);
    });
  }

  getLocalStorage(key:any): Promise<any> {
    return new Promise((resolve, reject) => {
        let data =  localStorage.getItem(key)
        resolve(data);
    });
  }

  deleteAllStorage(): Promise<any> {
    return new Promise((resolve, reject) => {
        let data =  localStorage.clear();
        resolve(data);
    });
  }
}