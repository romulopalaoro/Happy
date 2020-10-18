import {Entity , Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import orphanage from '../models/Orphanage';
import Orphanage from '../models/Orphanage';
@Entity('images')

export default class Image {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  path: String;

  @ManyToOne( () => Orphanage, orphanage => orphanage.images)
  @JoinColumn({name: 'orphanage_id'})
  orphanage: Orphanage;
}