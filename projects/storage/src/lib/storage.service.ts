import { Injectable, Inject } from '@angular/core';
import { STORAG_TYPE } from './storage.token';
import { StorageType } from './storage.types';

@Injectable()
export class StorageService {

  private storage: Storage;

  constructor(
    @Inject(STORAG_TYPE) storageType: StorageType
  ) {
    this.storage = storageType === 'local' ? localStorage : sessionStorage;
  }
  
  public clear() {
    this.storage.clear();
  }
  
  public getItem(key: string): string {
    return this.storage.getItem(key);
  }
  
  public key(index: number): string {
    return this.storage.key(index);
  }
  
  public length(): number {
    return this.storage.length;
  }
  
  public removeItem(key: string) {
    this.storage.removeItem(key);
  }
  
  public setItem(key: string, value: string) {
    this.storage.setItem(key, value);
  }

}
