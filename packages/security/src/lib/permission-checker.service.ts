import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NdkPermissionsProvider } from './permissions.provider';
import { NdkPermissions } from './typings';

export function isObject(val: any): boolean {
  return val !== null && typeof val === 'object';
}

@Injectable()
export class NdkPermissionCheckerService {

  constructor(
    private permissionProvider: NdkPermissionsProvider
  ) { }

  hasPermission(permission: string, resource: string): Observable<boolean> {
    return this.permissionProvider.getPermissions()
      .pipe(
        map((permissions: NdkPermissions) => isObject(permissions) ? permissions : {}),
        map((permissions: NdkPermissions) => permissions[resource]),
        map((rp: string|string[]) => Array.isArray(rp) ? rp : [rp]),
        map((rp: string[]) => rp.includes('*') || rp.includes(permission))
      );
  }
}
