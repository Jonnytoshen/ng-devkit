import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NdkPermissionCheckerService } from './permission-checker.service';

@Directive({
  selector: '[ndkPermission]'
})
export class NdkPermissionDirective implements OnDestroy {

  @Input('ndkPermission')
  set permission([permission, resource]: [string, string]) {
    this.permissionChecker.hasPermission(permission, resource)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((hasPermission: boolean) => {
        if (hasPermission && !this.hasView) {
          this.viewContainer.createEmbeddedView(this.templateRef);
          this.hasView = true;
        } else if (!hasPermission && this.hasView) {
          this.viewContainer.clear();
          this.hasView = false;
        }
      });
  }

  private destroy$ = new Subject<void>();
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private permissionChecker: NdkPermissionCheckerService
  ) { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
