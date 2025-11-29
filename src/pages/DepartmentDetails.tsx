import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { User } from "lucide-react";

const fetchDepartmentDetails = async (departmentId: string) => {
  const { data, error } = await supabase
    .from("departments")
    .select(
      `
    name,
    faculties (*)
  `
    )
    .eq("id", departmentId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const DepartmentDetails = () => {
  const { departmentId } = useParams<{ departmentId: string }>();
  const {
    data: department,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["departmentDetails", departmentId],
    queryFn: () => fetchDepartmentDetails(departmentId!),
    enabled: !!departmentId,
  });

  return (
    <div className="p-4 md:p-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/department">Departments</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{department?.name || "..."}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mt-4">
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error fetching data</p>}
        {department && (
          <div>
            <h1 className="text-3xl font-bold mb-4">{department.name}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {department.faculties.map((faculty) => (
                <Link to={`/faculty/${faculty.id}`} key={faculty.id}>
                  <Card className="p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors h-full">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <User className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold">{faculty.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {faculty.designation}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {faculty.email}
                      </p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentDetails;
