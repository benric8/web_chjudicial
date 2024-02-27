//-------------- clase de ayuda ------------
var fs = require('fs');
const { arch } = require('os');
class Architecture {
    createFolder(dir){
        try {
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir, { recursive: true });
                console.log('info: "'+ dir +'" creado')
            }
            else{
                console.log('warning: "'+ dir+ '" ya existe.')
            }
        } catch (error) {
            console.log(error);
        }
    }
    createFolderArray(array){
        array.forEach((dir) => {
            this.createFolder(dir);
        });
    }
    createStructureBasic(){
        this.createFolderArray(
            [
                'src/app/pages/NgRx',
                'src/app/pages/security',
                'src/app/pages/public/components',
                'src/app/pages/public/core/models',
                'src/app/pages/public/core/services',
                'src/app/pages/public/routers',
                'src/app/pages/public/store/actions',
                'src/app/pages/public/store/effects',
                'src/app/pages/public/store/reducers',
                'src/app/pages/public/store/states',
                'src/app/pages/public/store/entity',
            ]
        );
    }
    createStructureWithModules(modules=[]){
        this.createFolderArray(
            [
                'src/app/pages/NgRx',
                'src/app/pages/security'
            ]
        );
        for(let i=0;i<modules.length;i++){
            let val = modules[i].trim();
            this.createFolderArray(
                [
                    'src/app/pages/'+val+'/components',
                    'src/app/pages/'+val+'/core/models',
                    'src/app/pages/'+val+'/core/services',
                    'src/app/pages/'+val+'/routers',
                    'src/app/pages/'+val+'/store/actions',
                    'src/app/pages/'+val+'/store/effects',
                    'src/app/pages/'+val+'/store/reducers',
                    'src/app/pages/'+val+'/store/states',
                    'src/app/pages/'+val+'/store/entity',
                ]
            );
        };
    }
}
//------------- inicializar proyecto ------------
// dir = './tmp/but/then/nested';
function processParams(param){
    /*
    --public                                   //-- genera una estructura con el modulo public, recomendado para aplicacionscon solo una pagina web
    --modulos=public,admin,servicedesk         //-- un modulo es una unidad funcional del sistema, podria considerarse como un entregable
    */
   var arch = new Architecture();
   var param_arr = param.split('=');
   var comand = param_arr[0].trim();
    switch (comand) {
        case '--public':
            arch.createStructureBasic();
            break;
        case '--modulos':
            let modulos_arr = param_arr[1].trim().split(',');
            arch.createStructureWithModules(modulos_arr);
            break;
        default:
            console.log("El parametro "+ comand +" no es valido");
            break;
    }
}

process.argv.forEach(function (val, index, array) {
    //console.log(index + ': ' + val);
    if(index>=2){
        processParams(val)
    }
});

