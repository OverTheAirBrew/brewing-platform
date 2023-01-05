import { Column, Entity, Index, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Project {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  @Index({ unique: true })
  slug: string;

  @Column({
    nullable: true,
  })
  group_id?: string;
}
