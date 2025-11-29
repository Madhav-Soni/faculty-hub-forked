import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface Department {
  id: string;
  name: string;
}

const AddFaculty = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [experience, setExperience] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    const { data, error } = await supabase.from("departments").select("id, name");
    if (error) {
      console.error("Error fetching departments:", error);
       toast({
        title: "Error",
        description: "Could not fetch departments.",
        variant: "destructive",
      });
    } else {
      setDepartments(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // The 'about' and 'publications' fields are removed from the insert object.
    const { error } = await supabase
      .from("faculties")
      .insert([
        {
          name,
          email,
          designation,
          experience_years: parseInt(experience, 10),
          department_id: departmentId,
        },
      ]);

    if (error) {
      toast({
        title: "Error adding faculty",
        description: error.message,
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    toast({
      title: "Faculty Added",
      description: `${name} has been successfully added.`,
    });

    navigate("/faculty");
    setLoading(false);
  };

  return (
    <div className="p-4 md:p-8">
        <Breadcrumb>
            <BreadcrumbList>
            <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
                <BreadcrumbPage>Add Faculty</BreadcrumbPage>
            </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>

        <Card className="max-w-3xl mx-auto mt-8">
            <CardHeader>
                <CardTitle>Add New Faculty</CardTitle>
                <CardDescription>Enter the details of the new faculty member.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g. Dr. Jane Doe" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="e.g. jane.doe@example.com"/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="designation">Designation</Label>
                        <Input id="designation" value={designation} onChange={(e) => setDesignation(e.target.value)} required placeholder="e.g. Professor"/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="experience">Years of Experience</Label>
                        <Input id="experience" type="number" value={experience} onChange={(e) => setExperience(e.target.value)} required placeholder="e.g. 10"/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Select onValueChange={setDepartmentId} value={departmentId} required>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a department" />
                            </SelectTrigger>
                            <SelectContent>
                                {departments.map(dep => (
                                    <SelectItem key={dep.id} value={dep.id}>{dep.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                     <CardFooter className="md:col-span-2 flex justify-end p-0 pt-6">
                        <Button type="submit" disabled={loading}>
                            {loading ? "Adding..." : "Add Faculty"}
                        </Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>
    </div>
  );
};

export default AddFaculty;
