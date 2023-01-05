import { Column, Entity, Index, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Group {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  @Index({ unique: true })
  name: string;
}
