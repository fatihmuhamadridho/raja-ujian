import mongoose, { Schema } from "mongoose";

export type packageModelProps = {
  package_id?: Schema.Types.ObjectId;
  name: string;
  group: string;
  quizs?: Schema.Types.ObjectId;
};

const database = mongoose.connection.useDb(process.env.NEXT_PUBLIC_MONGODB_DATABASE!);
const packageSchema = new mongoose.Schema<packageModelProps>(
  {
    package_id: {
      type: Schema.Types.ObjectId,
      auto: true,
    },
    name: Schema.Types.String,
    group: Schema.Types.String,
    quizs: [{ type: Schema.Types.ObjectId, ref: "quiz" }],
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform(doc: any, ret: any) {
        ret.package_id = ret._id;
        delete ret._id;
        delete ret.id;
      },
    },
  }
);
const packageModel = database.model<packageModelProps>("package", packageSchema);

export { packageModel };
