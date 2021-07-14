import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Anuncio } from '../clases/anuncio';

const url = 'http://localhost/proyfin/anuncios/'
@Injectable({
  providedIn: 'root'
})
export class AnuncioService {

  constructor(private http:HttpClient) { }

  anunciar(anuncio: Anuncio): Observable<any>{
    return this.http.post(url, anuncio)
  }
  listarAnuncios(): Observable<any>{
    return this.http.get(url+'list/')
  }
  buscarAnuncio(entrada:string): Observable<any>{
    return this.http.get(url +'list/'+'?busqueda='+ entrada)
  }
}
