import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface Faculty {
  id: string;
  name: string;
  email: string;
  designation: string;
  experience_years: number;
  department_id: string;
  departments: { name: string };
}

const FacultyProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [faculty, setFaculty] = useState<Faculty | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFaculty();
  }, [id]);

  const fetchFaculty = async () => {
    if (!id) return;

    setLoading(true);
    const { data, error } = await supabase
      .from("faculties")
      .select("*, departments(name)")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching faculty:", error);
      toast({
        title: "Error",
        description: "Could not fetch faculty details.",
        variant: "destructive",
      });
      setFaculty(null);
    } else {
      setFaculty(data);
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!faculty) return;

    const { error } = await supabase.from("faculties").delete().eq("id", faculty.id);

    if (error) {
      toast({
        title: "Error deleting faculty",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Faculty Deleted",
        description: `${faculty.name} has been successfully deleted.`,
      });
      navigate("/faculty");
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!faculty) {
    return <div className="flex justify-center items-center h-screen">Faculty member not found.</div>;
  }

  return (
    <div className="p-4 md:p-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/faculty">Faculty</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{faculty.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="max-w-4xl mx-auto mt-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-3xl font-bold">{faculty.name}</CardTitle>
            <CardDescription className="text-lg">{faculty.designation}</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => navigate(`/faculty/edit/${faculty.id}`)}>
              Edit
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                    <p className="font-semibold">Email:</p>
                    <p>{faculty.email}</p>
                </div>
                <div>
                    <p className="font-semibold">Department:</p>
                    <p>{faculty.departments.name}</p>
                </div>
                 <div>
                    <p className="font-semibold">Experience:</p>
                    <p>{faculty.experience_years} years</p>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacultyProfile;
