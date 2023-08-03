import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pokemon-options',
  templateUrl: './pokemon-options.component.html',
  styleUrls: ['./pokemon-options.component.scss']
})
export class PokemonOptionsComponent {
  @Input() roundOver: boolean = false;
  @Input() pokemonOptions: any[] = [];
  @Output() selectPokemonEvent: EventEmitter<number> = new EventEmitter<number>();

  selectPokemon(id: number) {
    this.selectPokemonEvent.emit(id);
  }
  
}
