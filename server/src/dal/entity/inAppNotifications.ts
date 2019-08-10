import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";

@ObjectType()
@Entity()
export class InAppNotifications extends BaseEntity {

    @Field((type) => ID)
    @PrimaryGeneratedColumn()
    public id: number;

    @Field()
    @Column()
    public userId: number;

    @ManyToOne(() => User, (user) => user.inAppNotifications, { primary: true, onDelete: "CASCADE" }, )
    public user: User;

    @Field()
    @Column()
    public text: string;

    @Field()
    @Column()
    public date: string;

    @Field()
    @Column()
    public thumbnail: string;

    @Field()
    @Column()
    public actionLink: string;

}
