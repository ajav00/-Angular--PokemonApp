import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonItemComponent } from './pokemon-item/pokemon-item.component';
import { PokemonGlobalInfoComponent } from './pokemon-global-info/pokemon-global-info.component';



@NgModule({
  declarations: [
    PokemonListComponent,
    PokemonItemComponent,
    PokemonGlobalInfoComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PokemonListComponent,
    PokemonItemComponent,
    PokemonGlobalInfoComponent
  ]
})
export class ComponentsModule { }
