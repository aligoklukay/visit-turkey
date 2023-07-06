import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    DeleteDateColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm'

import {File} from './file.entity'
import {Service} from './service.entity'
import {Offer} from "./offer.entity";

@Entity('service')
export class HealthCategory extends BaseEntity {
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

    @OneToMany(() => Service, service => service.category)
    services: Service[]

    @OneToMany(() => File, file => file.file_collection)
    files: File[]

    @OneToMany(() => Offer, offer => offer.category)
    offers: Offer[]
}
