import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserLocation } from "./userLocation";

@ObjectType()
@Entity()
export class User extends BaseEntity {

    @Field((type) => ID)
    @PrimaryGeneratedColumn()
    public id: number;

    @Field()
    @Column()
    public firstName: string;

    @Field()
    @Column()
    public lastName: string;

    @Field()
    @Column("text", { unique: true })
    public email: string;

    @Column()
    public password: string;

    @OneToMany((type) => UserLocation, (userLocation) => userLocation.user)
    public locationsConnection: UserLocation[];
}
