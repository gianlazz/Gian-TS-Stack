import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserGroup } from "./userGroup";

@ObjectType()
@Entity()
export class Group extends BaseEntity {

    @Field((type) => ID)
    @PrimaryGeneratedColumn()
    public id: number;

    @Field()
    @Column({ nullable: true })
    public name: string;

    @Field()
    @Column({ nullable: true })
    public description: string;

    @OneToMany((type) => UserGroup, (userGroup) => userGroup.group)
    public usersConnection: UserGroup[];

}
