import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  VersionColumn,
} from "typeorm";

@Entity({
  name: "users",
})
export class UserEntity {
  public static get columns(): Array<keyof UserEntity> {
    return ["userId", "name", "email", "userVersion", "deletedAt"];
  }

  @PrimaryGeneratedColumn({
    type: "bigint",
    name: "id",
  })
  public readonly userId!: string;

  @Column({
    type: "text",
    name: "name",
  })
  public readonly name!: string;

  @Column({
    type: "text",
    name: "email",
  })
  public readonly email!: string;

  @VersionColumn({
    type: "integer",
    name: "version",
  })
  public readonly userVersion!: number;

  @DeleteDateColumn({
    type: "timestamptz",
    name: "deleted_at",
    select: false,
  })
  public readonly deletedAt!: Date | null;
}
