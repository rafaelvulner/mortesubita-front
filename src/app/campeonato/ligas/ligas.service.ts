import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Campeonato } from '../domain/icampeonato';
import { Observable } from 'rxjs';
import { Clube } from '../domain/clube';

const API = 'http://localhost:8080/campeonato/';

@Injectable({
  providedIn: 'root'
})
export class LigasService {

  constructor(private http: HttpClient) { }

  public buscarLigas() {
    return this.http.get<Campeonato[]>(API)
    .toPromise()
    .then(res => <Campeonato[]> res['data'])
    .then(data => data);
  }

  public salvar(campeonato: Campeonato) {
    return this.http.post<Campeonato>(API, campeonato)
    .toPromise()
    .then(res => <Campeonato> res)
    .then(data => data);
  }

  public delete(id: number) {
    return this.http.delete(API + id)
    .toPromise();
  }

  public excluirClubes(id: number, clubes: Clube[]){
    return this.http.put<Campeonato>(API + id, clubes)
    .toPromise()
    .then(res => <Campeonato> res)
    .then(data => data);
  }
}
