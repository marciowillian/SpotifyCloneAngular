import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from '../environments/environments';
import  Spotify from 'spotify-web-api-js';
import { SpotfyArtistaParaArtista, SpotifyPlaylistParaPlaylist, SpotifyTrackParaMusica, SpotifyUserParaUsuario } from '../Common/spotifyHelper';

import { IUsuario } from '../interfaces/IUsuario';
import { IPlaylist } from '../interfaces/IPlaylist';
import { IArtista } from '../interfaces/IArtista';
import { IMusica } from '../interfaces/IMusica';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  spotifyApi: Spotify.SpotifyWebApiJs = null;
  usuario: IUsuario;

  constructor(private router: Router) {
    this.spotifyApi = new Spotify();
  }

  // Inicializar usuário
  async inicializarUsuario() {
    if(!!this.usuario)
      return true;

    const token = localStorage.getItem('token');

    if(!token)
      return false;

    try {

      this.definirAccessToken(token);
      await this.obterSpotifyUsuario();
      return !!this.usuario;

    }catch(ex){
      return false;
    }
  }

  async obterSpotifyUsuario() {
    const userInfo = await this.spotifyApi.getMe();
    this.usuario = SpotifyUserParaUsuario(userInfo);
  }

  obterUrlLogin(){
    const authEndpoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;

    return authEndpoint + clientId + redirectUrl + scopes + responseType;
  }

  obterTokenUrlCallback(){
    if(!window.location.hash){
      return '';
    }

    const params = window.location.hash.substring(1).split('&');

    return params[0].split('=')[1];
  }

  definirAccessToken(token: string) {
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('token', token);
  }

  async buscarPlaylistUsuario(offset = 0, limit = 50): Promise<IPlaylist[]>{
    const playlist = await this.spotifyApi.getUserPlaylists(this.usuario.id, { offset, limit });
    return playlist.items.map(SpotifyPlaylistParaPlaylist);
  }

  async buscarTopArtistas(limit = 10):Promise<IArtista[]>{
    const artistas = await this.spotifyApi.getMyTopArtists({ limit });
    return artistas.items.map(SpotfyArtistaParaArtista);
  }

  async buscarMusicas(offset = 0, limit = 50): Promise<IMusica[]>{
    const musicas = await this.spotifyApi.getMySavedTracks({ offset, limit });
    return musicas.items.map(x => SpotifyTrackParaMusica(x.track));
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }
}
