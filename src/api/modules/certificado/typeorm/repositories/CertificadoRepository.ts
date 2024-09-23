import { Repository } from 'typeorm';
import Certificado from "../entities/Certificado";



export default  class CertificadoRepository extends  Repository<Certificado>{
    public async finById(id:number){
       const certificado = this.findOne({where:{id:id}});
       return certificado;
    }
}