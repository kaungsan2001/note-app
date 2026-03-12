import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Loading from "@/components/web/Loading";
import { useGetANoteById } from "@/hooks/useNote";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router";

const NoteDetailPage = () => {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetANoteById(parseInt(noteId!));
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="p-5">
      <Button
        className="ms-1 md:ms-5 lg:ms-5"
        variant={"outline"}
        onClick={() => navigate(-1)}
      >
        <ArrowLeft />
        Back
      </Button>
      <Card className="w-full max-w-xl mx-auto">
        <CardTitle className="text-center">{data?.data.title}</CardTitle>
        <CardContent>{data?.data.content}</CardContent>
      </Card>
    </div>
  );
};

export default NoteDetailPage;
