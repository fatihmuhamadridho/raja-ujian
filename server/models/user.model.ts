import mongoose, { Schema } from "mongoose";

export interface userModelProps {
  user_id?: string;
  username?: string;
  password?: string;
  access_token?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const database = mongoose.connection.useDb(
  process.env.NEXT_PUBLIC_FATIHMUHAMADRIDHO_ADMIN_MONGODB_DATABASE!
);
const userSchema = new mongoose.Schema<userModelProps>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      auto: true,
    },
    username: {
      type: Schema.Types.String,
      unique: true,
      required: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
    },
    access_token: String,
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform(doc: any, ret: any) {
        ret.user_id = ret._id;
        delete ret._id;
        delete ret.id;
      },
    },
  }
);
const userModel = database.model<userModelProps>("user", userSchema);

export { userModel };
