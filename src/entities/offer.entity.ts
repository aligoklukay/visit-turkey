import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    DeleteDateColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne,
} from 'typeorm'

import {File} from './file.entity'
import {Service} from './service.entity'
import {User} from './user.entity'
import {City} from './city.entity'
import {HealthCategory} from './health-category.entity'
import {Question} from './question.entity'

@Entity('offer')
export class Offer extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    price: string

    @CreateDateColumn({nullable: false})
    created_at?: Date

    @UpdateDateColumn({nullable: true})
    updated_at?: Date

    @DeleteDateColumn({nullable: true})
    deleted_at?: Date

    /**
     * Relations
     */

    @ManyToOne(() => User, user => user.offers)
    user: User

    @ManyToOne(() => City, city => city.offers)
    city: City

    @ManyToOne(() => HealthCategory, healthCategory => healthCategory.offers)
    category: HealthCategory

    @OneToMany(() => Service, service => service.category)
    questions: Question[]

    @OneToMany(() => Service, service => service.category)
    services: Service[]

    @OneToMany(() => File, file => file.file_collection)
    files: File[]
}
