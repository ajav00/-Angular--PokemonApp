import { Component, Input } from '@angular/core';
import { PokemonClass } from 'src/app/classes/pokemon.class';
import { PokemonItem } from 'src/app/interfaces/pokemon.interface';

@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.scss']
})
export class PokemonItemComponent {

  public _pokemonData: PokemonClass;
  get pokemonData(): PokemonClass {
    return this._pokemonData;
  }
  @Input() set pokemonData(pokemonResponse: PokemonClass) {
    if(pokemonResponse) this._pokemonData = pokemonResponse;
  }

  @Input() load: boolean | null = true;
}
