export function routes(){

    const $main = document.getElementById('main');

    page('/', inicio);
    page('/contacto', contacto);
    page('/pwa', pwa);
    page('/promociones', promociones);
    //page.stop('/panerita/ajax/impresion/impresion-comprobante.php', (ctx, next)=>{console.log('salio')})
    /*page('/nosotros/:valor',  nosotros);        page('/comprobante/:numero/detalle', comprobante);        page('/user/:user/album', album)        page('/user/:user/album/sort', sort)*/
    page('*', notFound);
    page();





    //FUNCIONES QUE RENDERIZAN
    function inicio(){
        $main.innerHTML = `Inicio: algo que aclarar, si vamos a refrescar desde una ruta definida por el forontend,
        debemos dejas la ruta principal sin ./, solo con barra / y alli acceder a nuestros recursos/carpetas/manifest, etc, de esta manera evitamos un pantallazo blanco 
        o error 404`;
    }

    function contacto(){
        $main.innerHTML = 'contacto';
    }

    function pwa(){
        $main.innerHTML = 'progressive web app';
    }

    function promociones(){
        $main.innerHTML = 'promociones';
    }

    function notFound(){
        $main.innerHTML = '404 error';
    }
}
