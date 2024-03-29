// imports
importScripts('public/js/Sw/sw-utils.js');


const STATIC_CACHE    = 'static-v1';//a medida que agregamos cambios versionamos
const DYNAMIC_CACHE   = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';


const APP_SHELL = [
    './',
    './index.html',
    './public/css/style.css',
    './public/js/index.js',
    './public/js/Sw/sw-utils.js',
    './public/img/svg/bus-stop-bg.svg',
    './public/img/svg/dev-icon.svg',
    './public/libraries/pouchdb-find.js'

    /*'./public/css/style.css',
    './public/js/index.js',
    './public/js/helpers/Sw/sw-utils.js'
    'public/img/svg/dev-icon.svg',
    'public/img/avatars/hulk.jpg',
    'public/img/avatars/ironman.jpg',
    'public/img/avatars/spiderman.jpg',
    'public/img/avatars/thor.jpg',
    'public/img/avatars/wolverine.jpg',*/
];

const APP_SHELL_INMUTABLE = [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js',
    'https://cdn.jsdelivr.net/npm/pouchdb@7.2.1/dist/pouchdb.min.js'
];



self.addEventListener('install', e => {
    const cacheStatic = caches.open( STATIC_CACHE ).then(cache => 
        cache.addAll( APP_SHELL ));

    const cacheInmutable = caches.open( INMUTABLE_CACHE ).then(cache => 
        cache.addAll( APP_SHELL_INMUTABLE ));
    e.waitUntil( Promise.all([ cacheStatic, cacheInmutable ])  );
});


self.addEventListener('activate', e => {

    const respuesta = caches.keys().then( keys => {

        keys.forEach( key => {

            if (  key !== STATIC_CACHE && key.includes('static') ) {
                return caches.delete(key);
            }

            if (  key !== DYNAMIC_CACHE && key.includes('dynamic') ) {
                return caches.delete(key);
            }

        });

    });

    e.waitUntil( respuesta );

});




self.addEventListener( 'fetch', e => {


    const respuesta = caches.match( e.request ).then( res => {

        if ( res ) {
            return res;
        } else {

            return fetch( e.request ).then( newRes => {

                return actualizaCacheDinamico( DYNAMIC_CACHE, e.request, newRes );

            });

        }

    });



    e.respondWith( respuesta );

});


