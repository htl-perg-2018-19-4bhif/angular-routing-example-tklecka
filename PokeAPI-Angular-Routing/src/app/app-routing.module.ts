import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PokeListComponent } from './poke-list/poke-list.component';
import { PokemonComponent } from './pokemon/pokemon.component';

const routes: Routes = [
  { path: 'home', component: PokeListComponent },
  { path: 'pokemon/:id', component: PokemonComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
