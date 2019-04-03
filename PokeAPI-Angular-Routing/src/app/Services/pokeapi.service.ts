import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { IPokemon } from '../Interfaces/IPokemon';
import { Observable } from 'rxjs';
import { IPokeList } from '../Interfaces/IPokeList';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  url = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) { }

  getAll(data): Observable<IPokeList> {
    return this.http.get<IPokeList>(`${this.url}pokemon/?limit=${data.count}`);
  }

  getLimit(): Observable<IPokeList> {
    return this.http.get<IPokeList>(`${this.url}pokemon/`);
  }

  getSingle(data: string): Observable<IPokemon> {
    return this.http.get<IPokemon>(`${this.url}pokemon/${data}`);
  }

}
