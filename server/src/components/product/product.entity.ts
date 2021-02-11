import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, OneToMany } from "typeorm"; 
import { Batch } from "../batch/batch.entity";

@Entity() 
export class Product {   

   @PrimaryGeneratedColumn() 
   id: number; 
   
   @Column() 
   name: string; 
   
   @Column('timestamp') 
   created_at: number;

   @OneToMany(batch => Batch, batch => batch.product)
   batchs: Batch[];
}