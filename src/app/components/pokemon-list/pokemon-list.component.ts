import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PokemonResponseInterface } from 'src/app/interfaces/response.interface';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent {
  
  public listItems: {name: string, url: string}[] = [];
  public pages: number[];  
  public total: number = 0;
  
  public _response: PokemonResponseInterface;
  get response(): PokemonResponseInterface {
    return this._response;
  }
  @Input() set response(value: PokemonResponseInterface) {
    this._response = value;
    if(value){
      this.total = value.count;
      this.listItems = value.results;
      this.pages = [...new Array(Math.ceil(this.total / this.currentStep))];
    }
  }
  
  @Input() load: boolean | null = true;
  @Input() currentPage: number = 0;
  @Input() currentStep: number = 0;

  @Output() stepEvent: EventEmitter<number> = new EventEmitter<number>();
  @Output() pageEvent: EventEmitter<number> = new EventEmitter<number>();
  @Output() pokemonEvent: EventEmitter<string> = new EventEmitter<string>();

  
  changeStep(step: number){
    this.stepEvent.emit(step);
  }

  
  changePage(page: number){
    this.pageEvent.emit(page);
  }


  selectPokemon(name: string){
    this.pokemonEvent.emit(name);
  }

}
