import { Observable } from "rxjs";
import { NdkPermissions } from "./typings";

export abstract class NdkPermissionsProvider {
  abstract getPermissions(): Observable<NdkPermissions>
}
