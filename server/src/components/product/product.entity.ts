import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, OneToMany, CreateDateColumn } from "typeorm"; 
import { Batch } from "../batch/batch.entity";

@Entity() 
export class Product {   

   @PrimaryGeneratedColumn() 
   id: number; 
   
   @Column() 
   name: string; 
   
   @CreateDateColumn() 
   created_at: Date;

   @OneToMany(batch => Batch, batch => batch.product)
   batchs: Batch[];
}