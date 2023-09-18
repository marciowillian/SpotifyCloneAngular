// Remover o refix_ do inicio do arqui e adicione o token o clientId

export const environment = {
  production: false
};

export const SpotifyConfiguration = {
  clientId: '',
  authEndpoint: 'https://accounts.spotify.com/authorize',
  redirectUrl: 'http://localhost:4200/login/',
  scopes: [
    "user-read-currently-playing", //Música tocando agora.
    "user-read-recently-playing", //Ler músicas tocadas recentemente
    "user-read-playback-state", //Ler estado do playback do usuário
    "user-top-read", //Top artistas e músicas do usuário
    "user-modify-playback-state", //Alterar o player do usuário
    "user-library-read", //Ler biblioteca dos usuários
    "playlist-read-private", //Ler playlists privadas
    "playlist-read-collaborative", //Ler playlist colaborativa
  ]
}
