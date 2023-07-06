import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    DeleteDateColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
    BeforeUpdate,
    OneToMany, ManyToOne,
} from 'typeorm'
import * as bcrypt from 'bcrypt'

import {Offer} from './offer.entity'
import {Nation} from "./nation.entity";

@Entity('user')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    email: string

    @Column()
    password: string

    @Column({name: 'first_name'})
    firstName: string

    @Column({name: 'last_name'})
    lastName: string

    @Column({name: 'date_of_birth'})
    dateOfBirth: string

    @CreateDateColumn({nullable: false})
    created_at?: Date

    @UpdateDateColumn({nullable: true})
    updated_at?: Date

    @DeleteDateColumn({nullable: true})
    deleted_at?: Date

    /**
     * Relations
     */

    @OneToMany(() => Offer, offer => offer.user)
    offers: Offer[]

    @ManyToOne(() => Nation, nation => nation.users)
    nationality: Nation

    /**
     * Lifecycle
     */

    @BeforeInsert()
    async encryptPassword() {
        this.password = await bcrypt.hash(this.password, 10)
    }

    @BeforeInsert()
    @BeforeUpdate()
    transformEmailBeforeInsertOrUpdate() {
        this.email = this.email.trim().toLowerCase()
    }
}
