import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from 'pokenode-ts';
import { PokemonService } from 'src/app/Service/pokemon.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  PokemonList: Pokemon[] = [];
  filteredPokemons: Pokemon[] = [];
  searchTerm: string = '';
  constructor(private router: Router, private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.getAllPokemons();
  }

  async getAllPokemons() {
    await this.pokemonService.getAllPokemons().subscribe((data) => {
      this.PokemonList = data;
      this.PokemonList.sort((a, b) => a.id - b.id);
      this.filteredPokemons = this.PokemonList.slice();
    });
  }

  filterPokemons() {
    const term = this.searchTerm.toLowerCase();
    this.filteredPokemons = this.PokemonList.filter(
      (pokemon) =>
        pokemon.name.toLowerCase().includes(term) ||
        pokemon.id.toString().includes(term)
    );
  }
  details(pokemon: Pokemon) {
    this.router.navigate(['/details', pokemon.id]);
  }
}
