import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, Upload, Users, FileText, BookOpen, Award } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Users className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-foreground">FEIMS</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/faculty" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Faculty
            </Link>
            <Link to="/departments" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Departments
            </Link>
            <Link to="/upload" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Upload
            </Link>
          </nav>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-16">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-4">
            <Award className="w-4 h-4" />
            Modern Faculty Management
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground leading-tight">
            Automated Faculty Information Management
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Extract, organize, and manage detailed faculty profiles with AI-powered document processing. 
            Streamline administrative workflows for universities.
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 h-12 px-8">
              <Upload className="w-5 h-5 mr-2" />
              Upload Documents
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8">
              <Search className="w-5 h-5 mr-2" />
              Browse Faculty
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="p-6 border-border/50 bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Upload className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-serif font-semibold mb-2">Automated Extraction</h3>
            <p className="text-muted-foreground">
              Upload PDFs, CVs, and certificates. Our system automatically extracts and structures faculty information.
            </p>
          </Card>

          <Card className="p-6 border-border/50 bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-serif font-semibold mb-2">Department Organization</h3>
            <p className="text-muted-foreground">
              Faculty profiles organized by department with powerful search, filtering, and analytics capabilities.
            </p>
          </Card>

          <Card className="p-6 border-border/50 bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-serif font-semibold mb-2">Course & Publication Mapping</h3>
            <p className="text-muted-foreground">
              Track courses taught, publications, qualifications, and academic achievements in one place.
            </p>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 md:p-12 border-border/50 bg-gradient-to-br from-card to-secondary/10">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-serif font-bold text-primary mb-2">70%</div>
                <div className="text-muted-foreground">Faster Onboarding</div>
              </div>
              <div>
                <div className="text-4xl font-serif font-bold text-accent mb-2">90%</div>
                <div className="text-muted-foreground">Extraction Accuracy</div>
              </div>
              <div>
                <div className="text-4xl font-serif font-bold text-primary mb-2">&lt;1s</div>
                <div className="text-muted-foreground">Search Response</div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-4xl font-serif font-bold text-foreground">
            Ready to modernize your faculty management?
          </h2>
          <p className="text-lg text-muted-foreground">
            Join universities already using FEIMS to streamline their administrative workflows.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 h-12 px-8">
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-background/80 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Users className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-serif font-semibold text-foreground">FEIMS</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 FEIMS. Modern faculty information management.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;