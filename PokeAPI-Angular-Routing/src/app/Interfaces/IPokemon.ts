import { IAbility } from './IAbility';

export interface IPokemon {
    id: number;
    name: string;
    url: string;
    abilities?: IAbility[];
}

//pokemon/?limit=964
