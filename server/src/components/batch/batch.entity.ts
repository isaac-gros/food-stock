import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, ManyToOne } from "typeorm"; 
import { Category } from "../category/category.entity";
import { Product } from "../product/product.entity";
import { User } from "../user/user.entity";

@Entity() 
export class Batch {   

   @PrimaryGeneratedColumn() 
   id: number; 
   
   @Column() 
   quantity: number; 
   
   @Column('timestamp') 
   expired_at: number; 

   @ManyToOne(product => Product, product => product.batchs)
   @JoinColumn()
   product: Product;
   
   @OneToOne(() => User)
   @JoinColumn()
   user: User;

   @OneToOne(() => Category)
   @JoinColumn()
   category: Category;
}