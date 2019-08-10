import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { InAppNotifications } from "./inAppNotifications";
import { PasswordReset } from "./passwordReset";
import { UserDevice } from "./userDevice";
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

    @OneToMany(() => InAppNotifications, (inAppNotification) => inAppNotification.user)
    public inAppNotifications: InAppNotifications[];

    @OneToMany((type) => UserGroup, (userGroup) => userGroup.user)
    public locationsConnection: UserGroup[];

    @OneToMany(() => PasswordReset, (passwordReset) => passwordReset.user)
    public passwordResets: PasswordReset[];

    @OneToMany(() => UserDevice, (userDevice) => userDevice.user)
    public userDevices: UserDevice[];
}
