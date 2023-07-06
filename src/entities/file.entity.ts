import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    DeleteDateColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    ManyToOne,
} from 'typeorm'

import {FileCollection} from './file-collection.entity'
import {HealthCategory} from './health-category.entity'

@Entity('file')
export class File extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({default: 'default'})
    type: string

    @Column()
    name: string

    @Column({nullable: true})
    description: string

    @Column()
    path: string

    @Column()
    size: string

    @Column({name: 'mime_type'})
    mimeType: string

    @Column({name: 'is_cover_image', default: false})
    isCoverImage: boolean

    @CreateDateColumn({nullable: false})
    created_at?: Date

    @UpdateDateColumn({nullable: true})
    updated_at?: Date

    @DeleteDateColumn({nullable: true})
    deleted_at?: Date

    /**
     * Relations
     */

    @ManyToOne(() => FileCollection, file_collection => file_collection.files)
    file_collection: FileCollection

    @ManyToOne(() => HealthCategory, health_category => health_category.files)
    health_category: HealthCategory
}
