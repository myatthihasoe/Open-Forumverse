import { GetQuestion } from "@/lib/actions/GetQuestion.action";
import QuestionForm from "../../components/QuestionForm";
import { notFound } from "next/navigation";

export default async function page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const { data: question, success } = await GetQuestion({ questionId: id });
    console.log(success);
  if (!success) return notFound();
  return <QuestionForm question={question} isEdit={true} />;
}
