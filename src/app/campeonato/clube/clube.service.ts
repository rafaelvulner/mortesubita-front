import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Clube } from '../domain/clube';
import { Observable } from 'rxjs';

const API = 'http://localhost:8080/clube/';

@Injectable({
  providedIn: 'root'
})
export class ClubeService {

  constructor(private http: HttpClient) { }

  public buscarClubes() {
    return this.http.get<Clube[]>(API)
    .toPromise()
    .then(res => <Clube[]> res['data'])
    .then(data => data);
  }

  public buscarClubesDeUmCampeonato(id: number) {
    return this.http.get<Clube[]>(API + 'campeonato/' + id)
    .toPromise()
    .then(res => <Clube[]> res['data'])
    .then(data => data);
  }

  public salvar(clube: Clube) {
    return this.http.post<Clube>(API, clube)
    .toPromise()
    .then(res => <Clube> res)
    .then(data => data);
  }

  public delete(id: number) {
    return this.http.delete(API + id)
    .toPromise();
  }
}
