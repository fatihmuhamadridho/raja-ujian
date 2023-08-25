import mongoose, { Schema } from "mongoose";

export type quizModelProps = {
  quiz_id?: Schema.Types.ObjectId;
  number: number;
  question: string;
  multiple_choice: string[];
  correct_answer: string;
  score?: number;
  package: Schema.Types.ObjectId;
};

const database = mongoose.connection.useDb(process.env.NEXT_PUBLIC_MONGODB_DATABASE!);
const quizSchema = new mongoose.Schema<quizModelProps>(
  {
    quiz_id: {
      type: Schema.Types.ObjectId,
      auto: true,
    },
    number: Schema.Types.Number,
    question: Schema.Types.String,
    multiple_choice: [{ type: Schema.Types.String }],
    correct_answer: Schema.Types.String,
    score: Schema.Types.Number,
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
        ret.quiz_id = ret._id;
        delete ret._id;
        delete ret.id;
      },
    },
  }
);
const quizModel = database.model<quizModelProps>("quiz", quizSchema);

export { quizModel };
