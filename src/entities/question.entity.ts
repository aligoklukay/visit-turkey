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

@Entity('question')
export class Question extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    question: string

    @Column()
    response: string

    @Column({name: 'is_toggle_question'})
    isToggleQuestion: boolean

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
}
