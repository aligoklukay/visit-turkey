import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    DeleteDateColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity, OneToMany,
} from 'typeorm'
import {Service} from "./service.entity";
import {Offer} from "./offer.entity";
import {User} from "./user.entity";

@Entity('nation')
export class Nation extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @CreateDateColumn({nullable: false})
    created_at?: Date

    @UpdateDateColumn({nullable: true})
    updated_at?: Date

    @DeleteDateColumn({nullable: true})
    deleted_at?: Date

    /**
     * Relations
     */

    @OneToMany(() => Offer, offer => offer.category)
    offers: Offer[]

    @OneToMany(()=> User, user=> user.nationality)
    users: User[]
}
