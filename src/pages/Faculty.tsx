import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Users, Mail, Briefcase, BookOpen } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

interface Faculty {
  id: string;
  name: string;
  email: string;
  designation: string;
  experience_years: number;
  profile_photo_url: string | null;
  department_id: string;
  departments: {
    name: string;
    code: string;
  } | null;
}

const Faculty = () => {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFaculties();
  }, []);

  const fetchFaculties = async () => {
    try {
      const { data, error } = await supabase
        .from("faculties")
        .select(`
          *,
          departments (
            name,
            code
          )
        `)
        .order("name");

      if (error) throw error;
      setFaculties(data || []);
    } catch (error) {
      console.error("Error fetching faculties:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredFaculties = faculties.filter(
    (faculty) =>
      faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faculty.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faculty.departments?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Users className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-foreground">FEIMS</h1>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/faculty" className="text-sm text-foreground font-medium">
              Faculty
            </Link>
            <Link to="/departments" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Departments
            </Link>
            <Link to="/upload" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Upload
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-2">Faculty Directory</h1>
          <p className="text-muted-foreground">Browse and search faculty members across all departments</p>
        </div>

        {/* Search & Filter Bar */}
        <Card className="p-4 mb-8 border-border/50">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>
        </Card>

        {/* Faculty Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-muted-foreground mt-4">Loading faculty...</p>
          </div>
        ) : filteredFaculties.length === 0 ? (
          <Card className="p-12 text-center border-border/50">
            <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-serif font-semibold mb-2">No faculty found</h3>
            <p className="text-muted-foreground">
              {searchQuery ? "Try adjusting your search criteria" : "No faculty members have been added yet"}
            </p>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFaculties.map((faculty) => (
              <Link key={faculty.id} to={`/faculty/${faculty.id}`}>
                <Card className="p-6 border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      {faculty.profile_photo_url ? (
                        <img
                          src={faculty.profile_photo_url}
                          alt={faculty.name}
                          className="w-full h-full rounded-xl object-cover"
                        />
                      ) : (
                        <Users className="w-8 h-8 text-primary" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-serif font-semibold text-foreground mb-1 truncate">
                        {faculty.name}
                      </h3>
                      {faculty.departments && (
                        <Badge variant="secondary" className="text-xs">
                          {faculty.departments.code}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Briefcase className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{faculty.designation || "Not specified"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{faculty.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <BookOpen className="w-4 h-4 flex-shrink-0" />
                      <span>{faculty.experience_years} years experience</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Faculty;