import { Column, DeleteDateColumn, Entity } from "typeorm";

@Entity()
export class User {

@Column({ primary: true, generated: true })
    id!: number;

@Column({length:50})
    name:string;

@Column({ nullable:false})
    password:string;

@Column({default:"user"})
    rol:string;
}
