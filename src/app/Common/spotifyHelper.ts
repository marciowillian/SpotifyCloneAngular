import { IUsuario } from '../interfaces/IUsuario';
import { IPlaylist } from '../interfaces/IPlaylist';

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
