import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { House } from './house-interface/default-house';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HouseServiceService {

  constructor(private http: HttpClient
  ) {

  }

  get(): Observable<Array<House>> {
    // get houses array from server
    return this.http.get<Array<House>>(environment.serverUrl + '/Houses');
  }

  getById(houseId: number): Observable<House> {
    // send house id and get back full info about this house
    return this.http.get<House>(environment.serverUrl + '/Houses/' + houseId);
  }

  add(house: House): Observable<House> {
    // sent created house to server and return it back
    return this.http.post<House>(environment.serverUrl + '/Houses/', house);
  }
  remove(houseId: number): Observable<House> {
    // delete house from server sending house id to it
    // returns back deleted house
    return this.http.delete<House>(`${environment.serverUrl}/Houses/${houseId}`);
  }
  update(house: House): Observable<House> {
    // sent existing house with existing id to server to update
    // return it back (updated)
    return this.http.put<House>(`${environment.serverUrl}/Houses/${house.id}`, house);
  }

}
