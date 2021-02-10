import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from "typeorm"; 

@Entity() 
export class Product {   

   @PrimaryGeneratedColumn() 
   id: number; 
   
   @Column() 
   name: string; 
   
   @Column('timestamp') 
   created_at: number;
}