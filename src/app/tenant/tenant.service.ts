import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tenant } from './tenant-interface/default-tenant';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class TenantService {

constructor(private http: HttpClient) { }

public get(): Observable<Array<Tenant>> {
  // get Tenant array from server
  return this.http.get<Array<Tenant>>(environment.serverUrl + '/Tenants');
}

public getById(tenantId: number): Observable<Tenant> {
  // send Tenant id and get back full info about this Tenant
  return this.http.get<Tenant>(environment.serverUrl + '/Tenants/' + tenantId);
}

public getByFlatId(flatId: number): Observable<Array<Tenant>> {
  // returns Tenant which has provided flat id
  return this.http.get<Array<Tenant>>(environment.serverUrl + '/Flat/' + flatId + '/Tenants');
}

public add(tenant: Tenant): Observable<Tenant> {
  // sent created tenant to server and return it back
  return this.http.post<Tenant>(environment.serverUrl + '/Tenants/', tenant);
}
public remove(tenantId: number): Observable<Tenant> {
  // delete tenant from server sending tenant id to it
  // returns back deleted tenant
  return this.http.delete<Tenant>(`${environment.serverUrl}/Tenants/${tenantId}`);
}
public update(tenant: Tenant): Observable<Tenant> {
  // sent existing tenant with existing id to server to update
  // return it back (updated)
  return this.http.put<Tenant>(`${environment.serverUrl}/Tenants/${tenant.id}`, tenant);
}
}
