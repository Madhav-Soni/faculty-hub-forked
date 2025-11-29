import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Users, User } from "lucide-react";
import { Link } from "react-router-dom";

const fetchDepartments = async () => {
  const { data, error } = await supabase.from("departments").select(`
    id,
    name,
    faculties (*)
  `);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const Department = () => {
  const { data: departments, isLoading, error } = useQuery({
    queryKey: ["departments"],
    queryFn: fetchDepartments,
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
            <BreadcrumbPage>Departments</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mt-4">
        <h1 className="text-3xl font-bold mb-4">Departments</h1>
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error fetching data</p>}
        {departments && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((department) => (
              <Link to={`/department/${department.id}`} key={department.id}>
                <Card className="border-border/50 bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle>{department.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-muted-foreground">
                      <User className="w-4 h-4 mr-2" />
                      <span>{department.faculties.length} Faculty Members</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Department;