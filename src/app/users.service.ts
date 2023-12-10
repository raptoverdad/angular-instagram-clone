import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './models/userInterface';
import { post } from './models/postInterface';


@Injectable({
  providedIn: 'root'
})
//crear funcion que cree automaticamente usuarios
export class UserService{
  usuarios: Usuario[] = [];
  feedPosts: post[] =[]
  profileSelected: Usuario
  textoBusqueda: string = '';
  usuariosDeLaBusqueda: Usuario[] = [];
  router:Router
  constructor(Router:Router) {
     this.crearUsuarios();
     this.profileSelected=this.usuarios[0]
     this.router=Router
   }
   private obtenerElementoUnico<T>(array: T[]): T {
    const indice = Math.floor(Math.random() * array.length);
    const elemento = array.splice(indice, 1)[0];
    return elemento;
  }

 async filtrarUsuarios(): Promise<void> {
  if(this.textoBusqueda != ''){
    console.log(this.textoBusqueda);
    this.usuariosDeLaBusqueda=[]
    let usuariosEncontrados: any[] =await this.usuarios.filter(usuario =>
      usuario.nombre.toLowerCase().includes(this.textoBusqueda.toLowerCase())
    );
  
    if (usuariosEncontrados.length === 0) {
      this.usuariosDeLaBusqueda = [];
    }else if(usuariosEncontrados.length > 0){
      this.usuariosDeLaBusqueda = usuariosEncontrados;
    }
  }else{
    this.usuariosDeLaBusqueda = [];
  }
    
  }

  private crearUsuarios(): void {
    let pictures: string[] = [
      "https://res.cloudinary.com/debvhmcid/image/upload/v1691696017/serviciosocial_cdw2nz.png",
      "https://res.cloudinary.com/debvhmcid/image/upload/v1692592508/templario/Captura8_bdr8yw.jpg",
      "https://res.cloudinary.com/debvhmcid/image/upload/v1698132363/angular-dotnet-green_llcxfz.jpg"
    ];
  
    let postsImages: string[] = [
      "https://res.cloudinary.com/debvhmcid/image/upload/v1702097049/rm_lgz3zn.jpg",
      "https://res.cloudinary.com/debvhmcid/image/upload/v1702097158/happy-friends-love-hug_nlygqn.jpg",
      "https://res.cloudinary.com/debvhmcid/image/upload/v1702097394/empire-state-building_ecb995bd_800x800_hh0ysu.jpg"
    ];
  
    let postText: string[] = [
      "feliz de estar aquí",
      "someone noticed this day is the most shiny day ever?",
      "no quiero decir se los dije, pero se los dije."
    ];
  
    let users: string[] = ["rodrigoa44", "felipex777", "joserodriguez"];
    let finalUsersCreated: Usuario[] = [];
  
    for (let i = 0; i < Math.max(users.length, pictures.length, postsImages.length, postText.length); i++) {
      // Seleccionar un nombre aleatorio de la lista de nombres
      let randomUser = this.obtenerElementoUnico(users);
      let randomPic = this.obtenerElementoUnico(pictures);
      let newUser: Usuario = {
        id: (i + 1),
        nombre:randomUser,
        profilePicture: randomPic,
        posts: [{
          usuario:randomUser,
          profilePicture:randomPic,
          description: postText[i],
          picture: postsImages[i]
        }]
      };
      // Agregar el nuevo usuario al array final
      finalUsersCreated.push(newUser);
      
    } 
    finalUsersCreated.forEach(element => {
        element.posts.forEach(element=>{
          this.feedPosts.push(element)
        })
    });
    this.usuarios = finalUsersCreated; // Asigna la lista de usuarios creados al array del servicio
    console.log(finalUsersCreated);
  }
  redirectToProfileSelected(usuario:string){
  const usuarioEncontrado = this.usuarios.find((user) => user.nombre === usuario);

  if (usuarioEncontrado) {
    this.profileSelected = usuarioEncontrado; 
    this.router.navigate(['/profile'])
  } else {
    alert("El usuario ya no se encuentra en instagram o no se ha registrado")
  }
  }

 } 