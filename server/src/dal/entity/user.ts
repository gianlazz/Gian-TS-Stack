import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PasswordReset } from "./passwordReset";
import { UserGroup } from "./userGroup";

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

    @OneToMany((type) => UserGroup, (userGroup) => userGroup.user)
    public locationsConnection: UserGroup[];

    @OneToMany(() => PasswordReset, (passwordReset) => passwordReset.user)
    public passwordResets: PasswordReset[];
}
