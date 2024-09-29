
import statusEvento from "../typeorm/entities/enums/EventoStatus";
import AppError from "../../../shared/errors/AppError";
import {EventoModelRepository} from "../../../shared/typeorm/data-source";


interface IRequest{
   id?: number,
   titulo:string,
   img:string,
   status: statusEvento,
   descricao:string,
   dataFim: Date,
   dataInicio: Date
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

    public async updateEvento ({id,titulo, img, status, descricao, dataFim,dataInicio}: IRequest){

        const eventoRepository = EventoModelRepository;

        const eventExits = await eventoRepository.findOne({ where:{ titulo:titulo } });


        if(!eventExits){
            throw new AppError("Evento não existente", "Bad request", 400);
        }

        const evento =  eventoRepository.create({
            id,titulo, img, status, descricao, dataFim,dataInicio
        })
        // @ts-ignore
        evento.id = id | null;
        evento.titulo = titulo;
        evento.img = img;
        evento.status = status;
        evento.descricao = descricao;
        evento.dataFim = dataFim;
        evento.dataInicio = dataInicio;

        return  await eventoRepository.save(evento);
    }

    public async findById({id}: IRequest){
        const eventoRepository = EventoModelRepository

        const evento = await eventoRepository.findOne({where:{id:id}});

        if(!evento){
            throw  new AppError("Event not foud", "Bad request", 400);
        }

        return evento;


    }
}