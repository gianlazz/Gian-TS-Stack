import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Group } from "./group";
import { User } from "./user";

@ObjectType()
@Entity()
export class UserGroup extends BaseEntity {

    @Field((type) => ID)
    @PrimaryColumn()
    public userId: number;

    @Field((type) => ID)
    @PrimaryColumn()
    public locationId: number;

    @Field((type) => User)
    @ManyToOne(() => User, (user) => user.locationsConnection, { primary: true })
    @JoinColumn()
    public user: User;

    @Field((type) => Group)
    @ManyToOne(() => Group, (group) => group.usersConnection, { primary: true })
    @JoinColumn()
    public group: Group;

}