import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPokemons(limit = 20, offset = 0): Observable<any> {
    return this.http.get(`${this.baseUrl}pokemon?limit=${limit}&offset=${offset}`);
  }

  getPokemonDetail(name?: string): Observable<any> {
    return this.http.get(`${this.baseUrl}pokemon/${name}`);
  }
}
