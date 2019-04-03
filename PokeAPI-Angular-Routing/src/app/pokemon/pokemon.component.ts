import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPokemon } from '../Interfaces/IPokemon';
import { PokeapiService } from '../Services/pokeapi.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IAbility } from '../Interfaces/iability';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  id = "";
  pokemon: IPokemon;
  pokeAbs: any[] = [];

  constructor(private route: ActivatedRoute, private api: PokeapiService) {
    route.paramMap.subscribe(map => {
      this.id = map.get("id");
    });
  }

  ngOnInit() {
    this.getPokes();
  }

  getPokes() {
    let idn: number = Number(this.id);
    this.api.getSingle(String(idn + 1)).subscribe((data: IPokemon) => {
      this.pokemon = data;
      this.pokeAbs = data.abilities;
    }, (res: HttpErrorResponse) => this.onError(res.message), () => console.log(this.pokeAbs[0].ability.name)
    );
  }

  onError(error: string) {
    console.log(error);
  }

}
