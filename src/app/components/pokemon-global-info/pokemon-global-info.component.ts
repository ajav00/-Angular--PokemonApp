import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-global-info',
  templateUrl: './pokemon-global-info.component.html',
  styleUrls: ['./pokemon-global-info.component.scss']
})
export class PokemonGlobalInfoComponent {
  
  public listKeys: string[] = [];
  
  @Input() load: boolean | null = true;

  public _pokemonDictionary: any;
  get pokemonDictionary(): any {
    return this._pokemonDictionary;
  }
  @Input() set pokemonDictionary(dictionary: any) {
    if(dictionary) {
      this._pokemonDictionary = dictionary;
      this.listKeys = Object.keys(dictionary); 
    }
  }


}
