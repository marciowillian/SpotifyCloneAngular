import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faGuitar, faHome, faMusic, faSearch } from '@fortawesome/free-solid-svg-icons';
import { IPlaylist } from 'src/app/interfaces/IPlaylist';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-painel-esquerdo',
  templateUrl: './painel-esquerdo.component.html',
  styleUrls: ['./painel-esquerdo.component.scss']
})
export class PainelEsquerdoComponent {
  menuSelecionado = 'Home'

  playlists: IPlaylist[] = [];

  // Icones
  homeIcone = faHome;
  pesquisarIcone = faSearch;
  artistaIcone = faGuitar;
  playlistIcon = faMusic;

  constructor(
    private router: Router,
    private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.buscarPlaylist();
  }

  botaoClick(botao: string){
    this.menuSelecionado = botao;
    this.router.navigateByUrl('player/home')
  }

  async buscarPlaylist(){
    this.playlists = await this.spotifyService.buscarPlaylistUsuario();
  }

}
