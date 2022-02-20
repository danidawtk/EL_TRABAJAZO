import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Anuncio } from '../clases/anuncio';
import { accesoUsuario, User } from '../clases/user';

const url = 'http://localhost/EL_TRABAJAZO/backend/anuncios/'


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
  listarAnunciosAlim(): Observable<any>{
    return this.http.get(url+'listAlim/')
  }
  listarAnunciosElec(): Observable<any>{
    return this.http.get(url+'listElec/')
  }
  listarAnunciosDeco(): Observable<any>{
    return this.http.get(url+'listDeco/')
  }
  listarAnunciosVehi(): Observable<any>{
    return this.http.get(url+'listVehi/')
  }
  buscarAnuncio(entrada:string): Observable<any>{
    return this.http.get(url +'list/'+'?busqueda='+ entrada)
  }
  subirImagen(entrada): Observable<any>{
    return this.http.post(url+'image/', entrada) 
   }
  
  leerTusAnuncios(): Observable<any>{
    return this.http.get(url+"listTusA/")
  }
  editarAnu(anuncio: Anuncio): Observable<any>{
    return this.http.put(url,anuncio)
  }
  borrarAnuncio(idanu: number): Observable<any>{
    return this.http.delete(url+idanu)
  }
  subirImagenanu(entrada): Observable<any>{
    return this.http.post(url+'imageanu/', entrada) 
   }
}
