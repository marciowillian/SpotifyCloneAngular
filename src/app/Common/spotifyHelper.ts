import { IUsuario } from '../interfaces/IUsuario';
import { IPlaylist } from '../interfaces/IPlaylist';
import { IArtista } from '../interfaces/IArtista';
import { IMusica } from '../interfaces/IMusica';

export function SpotifyUserParaUsuario(user: SpotifyApi.CurrentUsersProfileResponse): IUsuario{
  return {
    id: user.id,
    nome: user.display_name || "",
    imagemUrl: user.images?.pop()?.url || ""
  }
}

export function SpotifyPlaylistParaPlaylist(playlist: SpotifyApi.PlaylistObjectSimplified): IPlaylist{
  return {
    id: playlist.id,
    nome: playlist.name || "",
    imageUrl: playlist.images.pop().url || ""
  }
}

export function SpotfyArtistaParaArtista(spotifyArtista: SpotifyApi.ArtistObjectFull): IArtista {
  return {
    id: spotifyArtista.id,
    imagemUrl: spotifyArtista.images.sort(
      (a,b) => a.width - b.width
    ).pop().url,
    nome: spotifyArtista.name
  }
}

export function SpotifyTrackParaMusica(spotifyTrack: SpotifyApi.TrackObjectFull): IMusica {
  return {
    id: spotifyTrack.id,
    titulo: spotifyTrack.name,
    album: {
      id: spotifyTrack.id,
      imagemUrl: spotifyTrack.album.images.shift().url,
      nome: spotifyTrack.album.name
    },
    artistas: spotifyTrack.artists.map(artista => ({
      id: artista.id,
      nome: artista.name
    })),
    tempo: ''
  }
}
