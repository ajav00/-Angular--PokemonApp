import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonItemComponent } from './pokemon-item/pokemon-item.component';
import { PokemonGlobalInfoComponent } from './pokemon-global-info/pokemon-global-info.component';
import { HeaderComponent } from './header/header.component';
import { LoaderComponent } from './loader/loader.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PokemonListComponent,
    PokemonItemComponent,
    PokemonGlobalInfoComponent,
    HeaderComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    PokemonListComponent,
    PokemonItemComponent,
    PokemonGlobalInfoComponent,
    HeaderComponent
  ]
})
export class ComponentsModule { }
