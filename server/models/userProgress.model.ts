import mongoose, { Schema } from "mongoose";

export type userProgressModelProps = {
  user_progress_id?: any;
  quiz_order: any[];
  selected_answer: any[];
  last_quiz_index: number;
  score_total: number;
  isFinished: boolean;
  user?: Schema.Types.ObjectId;
  package?: Schema.Types.ObjectId;
};

const database = mongoose.connection.useDb(process.env.NEXT_PUBLIC_MONGODB_DATABASE!);
const userProgressSchema = new mongoose.Schema<userProgressModelProps>(
  {
    user_progress_id: {
      type: Schema.Types.ObjectId,
      auto: true,
    },
    quiz_order: Schema.Types.Array,
    selected_answer: Schema.Types.Array,
    last_quiz_index: Schema.Types.Number,
    score_total: Schema.Types.Number,
    isFinished: Schema.Types.Boolean,
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    package: {
      type: Schema.Types.ObjectId,
      ref: "package",
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform(doc: any, ret: any) {
        ret.user_progress_id = ret._id;
        delete ret._id;
        delete ret.id;
      },
    },
  }
);
const userProgressModel = database.model<userProgressModelProps>(
  "userProgress",
  userProgressSchema
);

export { userProgressModel };
