import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// RXJS
import { map, Observable } from 'rxjs';
// OTHERS
import { environment } from 'src/enviroments/enviroment';
import { PokemonItem } from '../interfaces/pokemon.interface';
import { PokemonResponseInterface } from '../interfaces/response.interface';

const baseUrl = environment.apiUrl;

@Injectable({ providedIn: 'root' })

export class PokemonService {

  constructor(private http: HttpClient) { }

  getAllPokemon(limit: number, page: number): Observable<PokemonResponseInterface[]>{
    return this.http.get(`${baseUrl}pokemon?offset=${limit * (page - 1)}&limit=${limit * page}`).pipe(map(resp => <PokemonResponseInterface[]>resp));
  }

  getPokemonByName(name: string): Observable<PokemonItem>{
    return this.http.get(`${baseUrl}pokemon/${name}`).pipe(map(resp => <PokemonItem>resp));
  }

}
