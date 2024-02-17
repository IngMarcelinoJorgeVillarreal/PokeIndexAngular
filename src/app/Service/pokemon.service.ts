import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, map, toArray } from 'rxjs/operators';
import { NamedAPIResource, Pokemon, PokemonClient } from 'pokenode-ts';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private cache: { [key: string]: any } = {};
  api = new PokemonClient();

  constructor(private http: HttpClient) {}

  getAllPokemons(): Observable<any[]> {
    if (Object.keys(this.cache).length > 0) {
      return of(Object.values(this.cache));
    } else {
      return of(...Array.from({ length: 151 }, (_, i) => i + 1)).pipe(
        concatMap((id) => this.getPokemonDetails(id)),
        toArray(),
        map((response) => {
          response.forEach((pokemon) => {
            if (pokemon) {
              this.cache[pokemon.id] = pokemon;
            }
          });
          return Object.values(this.cache);
        }),
        catchError((error) => {
          console.error('Error fetching Pokemon list', error);
          return of([]);
        })
      );
    }
  }

  getPokemonDetails(id: number): Observable<any> {
    if (this.cache[id]) {
      return of(this.cache[id]);
    } else {
      return this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${id}`).pipe(
        catchError((error) => {
          console.error(`Error fetching Pokemon details for ID ${id}`, error);
          return of(null);
        })
      );
    }
  }
}
