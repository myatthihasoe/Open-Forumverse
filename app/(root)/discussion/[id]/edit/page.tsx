import { GetQuestion } from "@/lib/actions/GetQuestion.action";
import QuestionForm from "../../components/QuestionForm";
import { notFound } from "next/navigation";
import { auth } from "@/auth";

export default async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: question, success } = await GetQuestion(id);
  // console.log(question);
  if (!success) return notFound();

  //Verify user owns the question
  const session = await auth()
  if(!session?.user?.id || String(question?.author) != session?.user?.id) return notFound() //redirect to unauthorized page
  return <QuestionForm question={question} isEdit={true} />;
}
