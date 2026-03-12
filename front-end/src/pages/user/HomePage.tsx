import { useGetNoteList } from "@/hooks/useNote";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import NoteCard from "@/components/web/NoteCard";
import Loading from "@/components/web/Loading";

const HomePage = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetNoteList(page);
  const totalPages = data?.meta?.totalPages ?? 1;

  if (isLoading && !data) {
    return <Loading />;
  }

  return (
    <div className="px-3 md:px-10 lg:px-20 py-5">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
        {data?.data.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setPage(Math.max(page - 1, 1))}
            />
          </PaginationItem>
          <PaginationItem>
            <span className="px-3 py-2 text-sm">
              Page {page} / {totalPages}
            </span>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() => setPage(Math.min(page + 1, totalPages))}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default HomePage;
