import { SpotifyService } from 'src/app/services/spotify.service';
import { Component } from '@angular/core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { IUsuario } from 'src/app/interfaces/IUsuario';

@Component({
  selector: 'app-rodape-usuario',
  templateUrl: './rodape-usuario.component.html',
  styleUrls: ['./rodape-usuario.component.scss']
})
export class RodapeUsuarioComponent {

  sairIcone = faSignOutAlt;
  usuario: IUsuario = null;

  constructor(
    private spotifyService: SpotifyService
  ) {}

  ngOnInit(): void {
    this.usuario = this.spotifyService.usuario;
  }

  logout(){
    this.spotifyService.logout();
  }

}
