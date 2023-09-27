import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { newArtista } from '../../Common/factories';
import { IArtista } from '../../interfaces/IArtista';


@Component({
  selector: 'app-top-artista',
  templateUrl: './top-artista.component.html',
  styleUrls: ['./top-artista.component.scss']
})
export class TopArtistaComponent {

  topArtista: IArtista = newArtista();

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void{
    this.buscarArtista();
  }

  async buscarArtista(){
    const artistas = await this.spotifyService.buscarTopArtistas(1);
    if(!!artistas){
      this.topArtista = artistas.pop();

      console.log(this.topArtista)
    }
  }

}
