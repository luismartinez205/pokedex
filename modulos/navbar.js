class Navbar extends HTMLElement{
    constructor() {
      super(); 
      
    }

    connectedCallback(){
      
        this.render();
       
    }

    render(){
      
        this.setHTMLUnsafe(`
            <nav class="navbar">
        <img src="./pokedex-hero-logo-BVhXkOZZ.png" alt="" class="nav-logo">
        <form action="">
            <input type="search" name="buscador" id="buscador" placeholder="Id, nombre o habilidad" autocomplete="off">
        </form>
        <ul style="gap: 40px;">
            <li><a href="index.html" class="nav-link">Inicio</a></li>
            <li><a href="" class="nav-link">Nosotros</a></li>
            <li class="submenu"><a href="" class="nav-link">Ver</a><span><img src="arrow.svg" alt=""
                        class="icon"></span>
                <ul class="submenus">
                    <a href="#">Su Historia</a>
                    <a href="pokemones.html">Pokedex</a>
                    <a href="#">Otro</a>
                </ul>
            </li>
            </li>
            <li><a href="contacto.html" class="nav-link">Contacto</a></li>
        </ul>
    </nav>
            
            `
         
        );
             const buscar=document.querySelector('#buscador');
             const iconos=document.querySelector('.icon');            
      if (window.location=='http://127.0.0.1:5500/index.html') {
        buscar.style.display='none';
      } else {
        buscar.style.display='block';
      }
      
    }
}

customElements.define("nav-component",Navbar);