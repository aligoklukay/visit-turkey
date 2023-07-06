import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    DeleteDateColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    OneToMany,
} from 'typeorm'

import {File} from './file.entity'

@Entity('file_collection')
export class FileCollection extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    collection_order: number

    @CreateDateColumn({nullable: false})
    created_at?: Date

    @UpdateDateColumn({nullable: true})
    updated_at?: Date

    @DeleteDateColumn({nullable: true})
    deleted_at?: Date

    /**
     * Relations
     */

    @OneToMany(() => File, file => file.file_collection)
    files: File[]
}
