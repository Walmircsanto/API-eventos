
import statusEvento from "../typeorm/entities/enums/EventoStatus";
import AppError from "../../../shared/errors/AppError";
import {EventoModelRepository} from "../../../shared/typeorm/data-source";

interface IRequest{
   titulo:string,
   img:string,
   status: statusEvento,
   descricao:string,
   dataFim: Date,
   dataInicio: Date
}

interface IdRequest{
    id: number
}




class EventoService{


    public async createEvento({titulo, img, status, descricao, dataFim, dataInicio}: IRequest){
        const eventoRepository = EventoModelRepository
       const eventExits = await eventoRepository.findOne({ where:{ titulo:titulo } });

       if(eventExits){
            throw new AppError("Evento ja existe com esse nome", "Bad request", 400);
       }

       const evento =  eventoRepository.create({
           titulo,
           img,
           status,
           descricao,
           dataFim,
           dataInicio
       });

       await eventoRepository.save(evento);
       return evento;
    }

    public async updateEvento ({titulo, img, status, descricao, dataFim,dataInicio }: IRequest,  {id}: IdRequest){

        const eventoRepository = EventoModelRepository;

        const eventExits = await eventoRepository.findOne({ where:{ titulo:titulo } });


        if(!eventExits){
            throw new AppError("Evento não existente", "Bad request", 400);
        }

        const evento =  eventoRepository.create({
            id,titulo, img, status, descricao, dataFim,dataInicio
        })
        evento.id = id;
        evento.titulo = titulo;
        evento.img = img;
        evento.status = status;
        evento.descricao = descricao;
        evento.dataFim = dataFim;
        evento.dataInicio = dataInicio;

        return  await eventoRepository.save(evento);
    }

    public async findById({id}: IdRequest){
        const eventoRepository = EventoModelRepository

        const evento = await eventoRepository.findOne({where:{id:id}});

        if(!evento){
            throw  new AppError("Event not foud", "Bad request", 400);
        }

        return evento;


    }

}

export  default  EventoService;