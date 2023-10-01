import { Component } from '@angular/core';
import { IMusica } from 'src/app/interfaces/IMusica';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  musicas: IMusica[] = []

  constructor(private spotifyService: SpotifyService){}

  ngOnInit(): void {
    this.obterMusicas();

  }

  async obterMusicas(){
    this.musicas = await this.spotifyService.buscarMusicas();
    console.log(this.musicas)
  }
}
