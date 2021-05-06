import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NdkPermissionCheckerService } from './permission-checker.service';
import { NdkPermissionDirective } from './permission.directive';



@NgModule({
  declarations: [
    NdkPermissionDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NdkPermissionDirective
  ]
})
export class NdkSecurityModule {
  static forRoot(): ModuleWithProviders<NdkSecurityModule> {
    return {
      ngModule: NdkSecurityModule,
      providers: [
        NdkPermissionCheckerService
      ]
    };
  }
}
