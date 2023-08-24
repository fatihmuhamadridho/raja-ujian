import mongoose, { Schema } from "mongoose";

export type baseModelProps = {
  base_id?: any;
  name: string;
};

const database = mongoose.connection.useDb(process.env.NEXT_PUBLIC_MONGODB_DATABASE!);
const baseSchema = new mongoose.Schema<baseModelProps>(
  {
    base_id: {
      type: Schema.Types.ObjectId,
      auto: true,
    },
    name: String,
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform(doc: any, ret: any) {
        ret.base_id = ret._id;
        delete ret._id;
        delete ret.id;
      },
    },
  }
);
const baseModel = database.model<baseModelProps>("base", baseSchema);

export { baseModel };
