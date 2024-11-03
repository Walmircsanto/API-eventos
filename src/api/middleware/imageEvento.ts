//Importaremos para realizar o Upload
import multer from "multer";

//Ajudará no caminho para guardar nossa imagem
import path from "path";

//Criara nossa pasta para armazenar nossos arquivos caso não exista
import fs from "fs";
import mime from "mime";

class UploadEventImage {

    //Pasta para onde será feito o Upload
    private URL: string = path.dirname('src/api/bucket/images');


    constructor() {
    }

    //Metodo onde armazenaremos nossos arquivos
    private storage(): multer.StorageEngine {

        /*
          Essa configuração irá nos ajudar
          1 - O destino do arquivo
          2 - E o nome do arquivo
        */
        return multer.diskStorage({
            destination: (req, file, cb) => {
                if(!fs.existsSync(this.URL) ){
                   fs.mkdirSync(this.URL)
                }
                cb(null, "src/api/bucket/images")
            },
            // esse metodo serve para mudar o nome do arquivo assim que chega aqui no servidor
            // pois imagine,  se duas pessoas fazer o uploud de arquivos com nome iguais como
            // teste.txt ficaria dois arquivos por esse nome no meu banco de dados


            filename: (req, file, cb) => {
                const type = mime.extension(file.mimetype);
                cb(null, `${new Date().getTime()}.${type}`);
            }
        })
    }

    //Methodo onde iremos efetuar o filtro de arquivos
    //Se é valido ou não
    private fileFilter() {

    }

    //Configuração que usaremos em nossas rotas como Middleware
    get getConfig(): multer.Options {

        return {
            //Storage serve para compor a config do multer destination e filename
            storage: this.storage(),
            //FileFilter serve para validar o filtro de arquivos
            //fileFilter: this.fileFilter(),

        };
    }
}

export const uploadImgEvento = new UploadEventImage();