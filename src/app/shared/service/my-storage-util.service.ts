import { Injectable } from '@angular/core';
import { inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser, isPlatformServer } from "@angular/common";
@Injectable({
  providedIn: 'root'
})
export class MyStorageUtilService {
  private readonly platform = inject(PLATFORM_ID);
  public setItemInLocalStorage(key: string, value: string | null | undefined) {
    if (isPlatformBrowser(this.platform)) {
      localStorage.setItem(key, value ?? "");
    }
  }
  public setItemInSessionStorage(key: string, value: string | null | undefined) {
    if (isPlatformBrowser(this.platform)) {
      sessionStorage.setItem(key, value ?? "");
    }
  }
  public getItemInLocalStorage(key: string): string | null {
    return isPlatformBrowser(this.platform) ? localStorage.getItem(key) : null
  }
  public getItemInSessionStorage(key: string): string | null {
    return isPlatformBrowser(this.platform) ? sessionStorage.getItem(key) : null
  }
  constructor() { }
}
