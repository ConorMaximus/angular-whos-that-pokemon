import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Pokemon from '../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  rootPath: string = "https://pokeapi.co/api/v2/";

  constructor(private http: HttpClient) { }

  getPokemonInformationById(id: number) {
    return this.http.get<Pokemon>(`${this.rootPath}pokemon/${id}`);
  }

}
