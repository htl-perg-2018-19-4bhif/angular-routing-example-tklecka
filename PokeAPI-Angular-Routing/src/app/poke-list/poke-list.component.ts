import { Component, OnInit } from '@angular/core';
import { PokeapiService } from '../Services/pokeapi.service';
import { appInitializerFactory } from '@angular/platform-browser/src/browser/server-transition';
import { IPokemon } from '../Interfaces/IPokemon';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { IPokeList } from '../Interfaces/IPokeList';

@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit {

  pokemons: IPokemon[] = [];
  pokemonsFiltered: IPokemon[] = [];
  limit: IPokeList;
  input: string = '';

  constructor(private api: PokeapiService) { }

  ngOnInit() {
    this.getLimit();
  }

  getLimit() {
    this.api.getLimit().subscribe((data: IPokeList) => {
      this.limit = data;
    }, (res: HttpErrorResponse) => this.onError(res.message), () => this.getPokes()
    );
  }

  getPokes() {
    this.api.getAll(this.limit).subscribe((data: IPokeList) => {
      this.pokemons = data.results;
    }, (res: HttpErrorResponse) => this.onError(res.message), () => {this.addID(); this.filterPokes();}
    );
  }

  addID() {
    for (let i = 0; i < this.pokemons.length; i++) {
      this.pokemons[i].id = i;
    }
  }

  filterPokes() {
    this.pokemonsFiltered = this.pokemons.filter(this.pokeFilter, this.input);
  }

  pokeFilter(value) {
    const fstr = String(this);
    if (value.name.toUpperCase().indexOf(fstr.toUpperCase()) > -1) {
      return value;
    }
  }

  onError(error: string) {
    console.log(error);
  }

}
