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
import { useCreateNote } from "@/hooks/useNote";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";

const NoteCreatePage = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NoteCreatePayLoad>({
    defaultValues: {
      title: "",
      content: "",
      publish: checked,
    },
    resolver: zodResolver(NoteCreateSchema),
  });
  const { mutate, isPending } = useCreateNote();
  const onSubmit = (data: NoteCreatePayLoad) => {
    const attachPublish = { ...data, publish: checked };
    mutate(attachPublish);
    reset();
  };

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
            {isPending ? "Loading" : "Submit"}
          </Button>
        </Card>
      </form>
    </div>
  );
};

export default NoteCreatePage;
