import {Request, Response} from 'express';
import { getRepository} from 'typeorm';
import orphanageView from '../views/orphanages_view';
import * as Yup from 'yup';

import Orphanage from '../models/Orphanage';

export default {
  async index(req: Request, res: Response) {
    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find({
      relations: ['images']
    });

    return res.status(200).json(orphanageView.renderMany(orphanages));
  },
  async show(req: Request, res: Response) {
    const {id} = req.params;

    try {
      const orphanagesRepository = getRepository(Orphanage);
      const orphanage = await orphanagesRepository.findOneOrFail(id, {
        relations: ['images']
      });

      return res.status(200).json(orphanageView.render(orphanage));

    } catch (error) {

      return res.status(400).json({error})
    }
  },

  async create(req: Request, res: Response) {

    console.log(req.files);

    const {
      name,
      latitude, 
      longitude,
      about, 
      instructions,
      opening_hours,
      open_on_weekends,
    } = req.body;
  
    const orphanagesRepository = getRepository(Orphanage);
    
    const requestImages = req.files as Express.Multer.File[];

    const images = requestImages.map(image =>{
      return {path: image.filename} 

    })

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === 'true',
      images
    };

    const schema = Yup.object().shape({
      name: Yup.string().required('nome, obrigatório'),
      latitude: Yup.number().required('latitude, obrigatório'),
      longitude: Yup.number().required('longitude, obrigatório'),
      about: Yup.string().required('sobre o orfanato, obrigatório').max(300),
      instructions: Yup.string().required('instruções, obrigatório'),
      opening_hours: Yup.string().required('horas de trabalho, obrigatório'),
      open_on_weekends: Yup.boolean().required("dias úteis, obrigatório"),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required()
        })
      )
    });

    await schema.validate(data, {
      abortEarly: false,
    })
    const orphanage = orphanagesRepository.create(data);
    
    console.log(orphanage);
    
    await orphanagesRepository.save(orphanage);
  
    return res.status(201).json(orphanage);
  }
}
