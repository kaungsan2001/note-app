import { useState } from "react";
import {
  useAdminStats,
  useAdminUsers,
  useAdminDeleteUser,
} from "@/hooks/useAdmin";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Users, FileText, Trash2Icon } from "lucide-react";
import Loading from "@/components/web/Loading";
import { useNavigate } from "react-router";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { data: statsData, isLoading: statsLoading } = useAdminStats();
  const { data: usersData, isLoading: usersLoading } = useAdminUsers(page);
  const { mutate: deleteUser, isPending: deletingUser } = useAdminDeleteUser();

  const totalPages = usersData?.meta?.totalPages ?? 1;

  if (statsLoading || usersLoading) return <Loading />;

  const stats = statsData?.data;
  const users = usersData?.data ?? [];

  return (
    <div className="px-3 md:px-10 lg:px-20 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Total Users
            </span>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats?.totalUsers ?? 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Total Notes
            </span>
            <FileText className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats?.totalNotes ?? 0}</p>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">User Accounts</h2>
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-muted-foreground">
                  <th className="text-left px-4 py-3 font-medium">ID</th>
                  <th className="text-left px-4 py-3 font-medium">Name</th>
                  <th className="text-left px-4 py-3 font-medium">Email</th>
                  <th className="text-left px-4 py-3 font-medium">Role</th>
                  <th className="text-left px-4 py-3 font-medium">Notes</th>
                  <th className="text-right px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b last:border-0 hover:bg-muted/40 transition-colors"
                  >
                    <td className="px-4 py-3 text-muted-foreground">
                      {user.id}
                    </td>
                    <td className="px-4 py-3 font-medium">{user.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {user.email}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                          user.role === "admin"
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {(user as unknown as { _count: { notes: number } })._count
                        ?.notes ?? 0}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        variant="destructive"
                        size="sm"
                        disabled={deletingUser || user.role === "admin"}
                        onClick={() => deleteUser(user.id)}
                      >
                        <Trash2Icon className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-8 text-center text-muted-foreground"
                    >
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

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
    </div>
  );
};

export default DashboardPage;
