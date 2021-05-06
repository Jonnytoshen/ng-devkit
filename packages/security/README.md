# Security

Security is an important part of any adult web application. It is a common task to manage user access to particular resources. ```@ng-devkit/security``` helps you to authorize a user to access some of the application resources.

## Installation

First, install ```@ng-devkit/security``` module:
```
npm i @ng-devkit/security --save
```

Import the module:
```
import { NdkSecurityModule } from '@ng-devkit/security';
```

Now, let's register the module in the root module:
```
@NgModule({
  imports: [
   // ...

   NdkSecurityModule.forRoot(),
```

## Permission configuration & Usage

### Permissions Provider

In the real world app, permissions would be dynamic and depend on the current user.

Create a ```permissions.provider.ts``` service and implements ```getPermissions``` method on ```NdkPermissionsProvider```, returns the permissions(depend on the current user) as ```Observable<NdkPermissions>```.

```
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

import { NdkPermissionsProvider, NdkPermissions } from '@ng-devkit/security';


@Injectable()
export class PermissionsProvider implements NdkPermissionsProvider {

  constructor(private http: HttpClient) {
  }

  getPermissions(): Observable<NdkPermissions> {
    // ...
    return of({
      news: ['visit', 'create'],
      comments: ['*'] 
      // We can also specify a * permission, which means that we have all permission of the resource
    })
  }
}
```

Provide the service in the app module:
```
// ...
import { NdkSecurityModule, NdkPermissionsProvider } from '@ng-devkit/security';
import { PermissionsProvider } from './permissions.provider';


@NgModule({
  imports: [
   // ...

   NdkSecurityModule.forRoot(),

 ],
  providers: [
    // ...
    { provide: NdkPermissionsProvider, useClass: PermissionsProvider }, // provide the class
  ],
```

### Usage

Let's assume that we have that ```Post News``` button, that should only be shown to the user which has that permission. 

This package provides us with a simple *ndkPermission conditional directive, which under the hood works as *ngIf, showing or hiding a template block based on a user permissions:

```
@Component({
  // ...
  template: `
      <button *nbIsGranted="['create', 'news']" >Post news</button>
    `,
})
export class NewsComponent {
// ...
```

We just need to pass a permission and resource in order to control the button visibility.

## NdkPermissionCheckerService

Permissions check service. 

Checks resource permission with provided permissions(depend on the current user).

### Methods

| Name | Description |
| --- | --- |
| hasPermission | parameters: permission: string, resource: stringreturns:Observable<boolean>. Checks whether have permission or haven't |
