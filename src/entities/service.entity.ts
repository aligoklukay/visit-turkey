import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    DeleteDateColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm'

import {File} from './file.entity'
import {HealthCategory} from './health-category.entity'

@Entity('service')
export class Service extends BaseEntity {
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

    @ManyToOne(() => HealthCategory, healthCategory => healthCategory.services)
    category: HealthCategory

    @OneToMany(() => File, file => file.file_collection)
    files: File[]
}
