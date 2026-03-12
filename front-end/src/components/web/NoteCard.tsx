import type { NoteType } from "@/types/types";
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Eye, Edit2Icon, Trash2Icon } from "lucide-react";
import { useAppContext } from "@/App";
import { useNavigate } from "react-router";
import { useDeleteANoteById } from "@/hooks/useNote";

const NoteCard = ({ note }: { note: NoteType }) => {
  const { user } = useAppContext();
  const navigate = useNavigate();
  const { mutate, isPending } = useDeleteANoteById();

  return (
    <Card>
      <CardTitle className="line-clamp-1 px-3">{note.title}</CardTitle>
      <CardContent className="line-clamp-2">{note.content}</CardContent>
      <CardFooter className="flex gap-4 justify-end">
        <div className="flex-1">
          {note.publish ? (
            <small className="text-xs text-muted-foreground ">
              Published by{" "}
              <span className="font-semibold text-primary">
                {note.user.name}
              </span>
            </small>
          ) : (
            <small className="text-xs text-muted-foreground">
              Your Private Note
            </small>
          )}
        </div>
        <Button
          variant={"secondary"}
          onClick={() => navigate(`/note/${note.id}`)}
        >
          <Eye />
        </Button>

        {note.userId === user?.id && (
          <>
            <Button
              variant={"default"}
              onClick={() => navigate(`/note/edit/${note.id}`)}
            >
              <Edit2Icon />
            </Button>
            <Button
              variant={"destructive"}
              onClick={() => mutate(note.id)}
              disabled={isPending}
            >
              <Trash2Icon />
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default NoteCard;
