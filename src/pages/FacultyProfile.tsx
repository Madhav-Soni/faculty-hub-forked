import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Users, Mail, Phone, Briefcase, Award, BookOpen, 
  FileText, ArrowLeft, Calendar, ExternalLink 
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";

interface FacultyData {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  designation: string;
  experience_years: number;
  profile_photo_url: string | null;
  bio: string | null;
  departments: {
    name: string;
    code: string;
  } | null;
}

interface Qualification {
  id: string;
  degree_type: string;
  institution: string;
  year: number;
  field_of_study: string | null;
}

interface Publication {
  id: string;
  title: string;
  venue: string | null;
  year: number;
  doi: string | null;
  url: string | null;
}

const FacultyProfile = () => {
  const { id } = useParams();
  const [faculty, setFaculty] = useState<FacultyData | null>(null);
  const [qualifications, setQualifications] = useState<Qualification[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchFacultyData();
    }
  }, [id]);

  const fetchFacultyData = async () => {
    try {
      // Fetch faculty info
      const { data: facultyData, error: facultyError } = await supabase
        .from("faculties")
        .select(`
          *,
          departments (name, code)
        `)
        .eq("id", id)
        .single();

      if (facultyError) throw facultyError;
      setFaculty(facultyData);

      // Fetch qualifications
      const { data: qualData } = await supabase
        .from("qualifications")
        .select("*")
        .eq("faculty_id", id)
        .order("year", { ascending: false });

      setQualifications(qualData || []);

      // Fetch publications
      const { data: pubData } = await supabase
        .from("publications")
        .select("*")
        .eq("faculty_id", id)
        .order("year", { ascending: false });

      setPublications(pubData || []);
    } catch (error) {
      console.error("Error fetching faculty data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground mt-4">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!faculty) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center">
        <Card className="p-12 text-center max-w-md">
          <h3 className="text-xl font-serif font-semibold mb-2">Faculty not found</h3>
          <p className="text-muted-foreground mb-6">The requested faculty profile could not be found.</p>
          <Link to="/faculty">
            <Button>Back to Directory</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <Header showNav={false} />

      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <Link to="/faculty">
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Directory
          </Button>
        </Link>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6 border-border/50">
              <div className="text-center mb-6">
                <div className="w-32 h-32 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  {faculty.profile_photo_url ? (
                    <img
                      src={faculty.profile_photo_url}
                      alt={faculty.name}
                      className="w-full h-full rounded-2xl object-cover"
                    />
                  ) : (
                    <Users className="w-16 h-16 text-primary" />
                  )}
                </div>
                <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
                  {faculty.name}
                </h2>
                <p className="text-muted-foreground mb-4">{faculty.designation}</p>
                {faculty.departments && (
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    {faculty.departments.name}
                  </Badge>
                )}
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="text-sm font-medium">{faculty.email}</p>
                  </div>
                </div>

                {faculty.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="text-sm font-medium">{faculty.phone}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <Briefcase className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Experience</p>
                    <p className="text-sm font-medium">{faculty.experience_years} years</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-border/50">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-accent" />
                <h3 className="font-serif font-semibold">Quick Stats</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Publications</span>
                  <span className="text-lg font-semibold text-primary">{publications.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Qualifications</span>
                  <span className="text-lg font-semibold text-accent">{qualifications.length}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Detailed Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio */}
            {faculty.bio && (
              <Card className="p-6 border-border/50">
                <h3 className="text-xl font-serif font-semibold mb-4">About</h3>
                <p className="text-muted-foreground leading-relaxed">{faculty.bio}</p>
              </Card>
            )}

            {/* Qualifications */}
            <Card className="p-6 border-border/50">
              <div className="flex items-center gap-2 mb-6">
                <Award className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-serif font-semibold">Qualifications</h3>
              </div>
              {qualifications.length === 0 ? (
                <p className="text-muted-foreground">No qualifications added yet.</p>
              ) : (
                <div className="space-y-4">
                  {qualifications.map((qual) => (
                    <div key={qual.id} className="flex gap-4">
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-6 h-6 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{qual.degree_type}</h4>
                        <p className="text-sm text-muted-foreground">{qual.institution}</p>
                        {qual.field_of_study && (
                          <p className="text-sm text-muted-foreground">{qual.field_of_study}</p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">{qual.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Publications */}
            <Card className="p-6 border-border/50">
              <div className="flex items-center gap-2 mb-6">
                <BookOpen className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-serif font-semibold">Publications</h3>
              </div>
              {publications.length === 0 ? (
                <p className="text-muted-foreground">No publications added yet.</p>
              ) : (
                <div className="space-y-4">
                  {publications.map((pub) => (
                    <div key={pub.id} className="flex gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground leading-snug">{pub.title}</h4>
                        {pub.venue && (
                          <p className="text-sm text-muted-foreground mt-1">{pub.venue}</p>
                        )}
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs text-muted-foreground">{pub.year}</span>
                          {pub.url && (
                            <a
                              href={pub.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-primary hover:underline inline-flex items-center gap-1"
                            >
                              View <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyProfile;