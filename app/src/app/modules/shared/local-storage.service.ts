import { Injectable } from '@angular/core';
import { SupportedLanguages } from 'src/app/_helpers/constant';
import { User } from 'src/app/model/user';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  public reset() {
    localStorage.clear();
  }
  public getAuthToken(): any {
    return localStorage.getItem('bp-erp.token');
  }

  public setAuthToken(authToken: string) {
    localStorage.setItem('bp-erp.token', authToken);
  }

  public getUserObject(): User | undefined {
    const etudiantStringified = localStorage.getItem('bp-erp.user');

  

    return undefined;
  }

  public setUserObject(etudiantObject: User) {
    localStorage.setItem('bp-erp.user', JSON.stringify(etudiantObject));
  }

  public getItem(key: string) {
    return localStorage.getItem(key);
  }
  public setLocalStorageValue(key: string, newValue: any) {
    return localStorage.setItem(key, JSON.stringify(newValue));
  }

  public getLang(): SupportedLanguages {
    return localStorage.getItem('bp-erp.lang') as SupportedLanguages;
  }

  public setLang(lng: SupportedLanguages) {
    localStorage.setItem('bp-erp.lang', lng);
  }
}