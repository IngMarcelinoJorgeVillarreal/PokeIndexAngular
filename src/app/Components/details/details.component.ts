import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon, PokemonClient } from 'pokenode-ts';
import { PokemonService } from 'src/app/Service/pokemon.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  pokemonId: number = 0;
  api = new PokemonClient();
  pokemon!: Pokemon;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.pokemonId = +params['id'];
      this.getPokemonData();
    });
  }

  async getPokemonData() {
    await this.pokemonService
      .getPokemonDetails(this.pokemonId)
      .subscribe((data) => {
        this.pokemon = data;
      });
  }

  goBack() {
    this.router.navigate(['/']);
  }

  watchPokemon() {
    const html = `
    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="${this.pokemon.sprites.back_default}" class="d-block w-100" alt="...">
        </div>
      </div>
    </div>
  `;

  const icono = ""
    Swal.fire({
      title: this.pokemon.name,
      html: html,
      iconHtml: `  <img src="../../../assets/egg.png" class="d-block w-100" alt="...">`,
      showCloseButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Felicidades, encontraste el easterEgg'
    });
  }
}

