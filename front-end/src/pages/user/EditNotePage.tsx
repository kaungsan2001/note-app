import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { NoteCreateSchema, type NoteCreatePayLoad } from "@/zod/noteSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldTitle,
} from "@/components/ui/field";
import { useUpdateANoteById, useGetANoteById } from "@/hooks/useNote";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import Loading from "@/components/web/Loading";

const EditNotePage = () => {
  const { noteId } = useParams();
  const id = Number(noteId);
  const navigate = useNavigate();
  const { data: noteData, isLoading: isNoteLoading } = useGetANoteById(id);
  const [checked, setChecked] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NoteCreatePayLoad>({
    resolver: zodResolver(NoteCreateSchema),
  });

  useEffect(() => {
    if (noteData?.data) {
      reset({
        title: noteData.data.title,
        content: noteData.data.content,
        publish: noteData.data.publish,
      });
      setChecked(noteData.data.publish);
    }
  }, [noteData, reset]);

  const { mutate, isPending } = useUpdateANoteById();

  const onSubmit = (data: NoteCreatePayLoad) => {
    const attachPublic = { ...data, publish: checked };
    mutate({ noteId: id, data: attachPublic });
  };

  if (isNoteLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Button
        variant="outline"
        onClick={() => navigate(-1)}
        className="ms-2 md:ms-7 lg:ms-10 mt-3"
      >
        <ArrowLeft className="mr-2" />
        Back
      </Button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="mx-auto p-5 w-full max-w-xl mt-5">
          <Field>
            <FieldContent>
              <Label>Title</Label>
              <Input type="text" {...register("title", { required: true })} />
            </FieldContent>
            {errors.title && <FieldError>{errors.title.message}</FieldError>}
          </Field>

          <Field>
            <FieldContent>
              <Label>Content</Label>
              <Textarea {...register("content", { required: true })} />
            </FieldContent>
            {errors.content && (
              <FieldError>{errors.content.message}</FieldError>
            )}
          </Field>

          <Field orientation="horizontal">
            <Checkbox
              checked={checked}
              onCheckedChange={(state) => setChecked(state === true)}
            />
            <FieldContent>
              <FieldTitle>Enable Publish</FieldTitle>
              <FieldDescription>
                If enable everyone can see your note.
              </FieldDescription>
            </FieldContent>
          </Field>

          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save"}
          </Button>
        </Card>
      </form>
    </div>
  );
};

export default EditNotePage;
