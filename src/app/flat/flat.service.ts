import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Flat } from './flat-interface/default-flat';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlatService {

constructor(private http: HttpClient) { }

get(): Observable<Array<Flat>> {
  // get flats array from server
  return this.http.get<Array<Flat>>(environment.serverUrl + '/Flats');
}

getById(flatId: number): Observable<Flat> {
  // send flat id and get back full info about this flat
  return this.http.get<Flat>(environment.serverUrl + '/Flats/' + flatId);
}

getByHouseId(houseId: number): Observable<Array<Flat>> {
  // returns flats which has provided house id
  return this.http.get<Array<Flat>>(environment.serverUrl + '/House/' + houseId + '/Flats');
}

add(flat: Flat): Observable<Flat> {
  // sent created flat to server and return it back
  return this.http.post<Flat>(environment.serverUrl + '/Flats/', flat);
}
remove(flatId: number): Observable<Flat> {
  // delete flat from server sending flat id to it
  // returns back deleted flat
  return this.http.delete<Flat>(`${environment.serverUrl}/Flats/${flatId}`);
}
update(flat: Flat): Observable<Flat> {
  // sent existing flat with existing id to server to update
  // return it back (updated)
  return this.http.put<Flat>(`${environment.serverUrl}/Flats/${flat.id}`, flat);
}

}
