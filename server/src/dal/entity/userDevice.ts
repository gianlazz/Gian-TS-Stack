import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";

@Entity()
export class UserDevice extends BaseEntity {

    @Field((type) => ID)
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public fcmPushUserToken: string;

    @ManyToOne(() => User, (user) => user.userDevices, { primary: true, onDelete: "CASCADE" }, )
    public user: User;
}
