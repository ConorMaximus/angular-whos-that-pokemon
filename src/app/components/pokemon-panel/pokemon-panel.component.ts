import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import Pokemon from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-panel',
  templateUrl: './pokemon-panel.component.html',
  styleUrls: ['./pokemon-panel.component.scss']
})
export class PokemonPanelComponent implements OnInit {
  selectedPokemon: any;
  randomSetOfPokemon: any[] = [];
  roundOver = false;
  minRange = 1;
  maxRange = 100;
  maxRandomPokemon = 4;
  correctGuess = false;
  resultMessage = '';

  constructor(private pokemonService: PokemonService) {
  }

  ngOnInit(): void {
    this.getRandomPokemon();
  }

  getRandomPokemon(): void {
    this.selectedPokemon = null;
    this.randomSetOfPokemon = [];
    this.correctGuess = false;
    this.resultMessage = '';
    this.roundOver = false;

    let sources = [
      this.pokemonService.getPokemonInformationById(this.generateRandomNumberBetweenRange(this.minRange, this.maxRange)),
      this.pokemonService.getPokemonInformationById(this.generateRandomNumberBetweenRange(this.minRange, this.maxRange)),
      this.pokemonService.getPokemonInformationById(this.generateRandomNumberBetweenRange(this.minRange, this.maxRange)),
      this.pokemonService.getPokemonInformationById(this.generateRandomNumberBetweenRange(this.minRange, this.maxRange))
    ];

    forkJoin(sources)
      .subscribe((response: any) => {
        for(var i = 0; i < response.length; i++) {
          this.randomSetOfPokemon.push(response[i]);
        }
        this.selectedPokemon = this.randomSetOfPokemon[Math.floor(Math.random()*this.randomSetOfPokemon.length)];
      });
  }

  generateRandomNumberBetweenRange(min: number, max: number): number { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  selectedPokemonEvent(id: number) {
    if(id == this.selectedPokemon.id) {
      this.correctGuess = true;
      this.resultMessage = 'Correct!';
      this.roundOver = true;
    } else {
      this.correctGuess = false;
      this.resultMessage = 'Wrong! Try again...';
    }
  }
}
