import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from "typeorm"; 

@Entity() 
export class User {   

    @PrimaryGeneratedColumn() 
    id: number; 
    
    @Column() 
    name: string; 
    
    @Column() 
    password: string;
 
    @Column() 
    average_expiry: number;
 
    @Column('timestamp') 
    created_at: number;
}