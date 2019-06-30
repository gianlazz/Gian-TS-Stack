import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./user";

@Entity()
export class PasswordReset extends BaseEntity {

    @PrimaryColumn()
    public userId: number;

    @PrimaryColumn()
    public pin: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    public timestamp: string;

    @ManyToOne(() => User, (user) => user.passwordResets, { primary: true, onDelete: "CASCADE" }, )
    public user: User;

}
