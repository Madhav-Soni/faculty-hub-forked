-- Create departments table
CREATE TABLE departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  code TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create faculties table
CREATE TABLE faculties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
  designation TEXT,
  phone TEXT,
  experience_years INTEGER DEFAULT 0,
  profile_photo_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create qualifications table
CREATE TABLE qualifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  faculty_id UUID REFERENCES faculties(id) ON DELETE CASCADE NOT NULL,
  degree_type TEXT NOT NULL,
  institution TEXT NOT NULL,
  year INTEGER,
  field_of_study TEXT,
  remarks TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create publications table
CREATE TABLE publications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  faculty_id UUID REFERENCES faculties(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  venue TEXT,
  year INTEGER,
  doi TEXT,
  url TEXT,
  publication_type TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create courses table
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  credits INTEGER,
  department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create faculty_courses junction table
CREATE TABLE faculty_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  faculty_id UUID REFERENCES faculties(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  semester TEXT,
  year INTEGER,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(faculty_id, course_id, semester, year)
);

-- Create extracted_documents table
CREATE TABLE extracted_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  faculty_id UUID REFERENCES faculties(id) ON DELETE SET NULL,
  file_name TEXT NOT NULL,
  file_hash TEXT NOT NULL UNIQUE,
  extracted_text TEXT,
  file_url TEXT,
  document_type TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE faculties ENABLE ROW LEVEL SECURITY;
ALTER TABLE qualifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE faculty_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE extracted_documents ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (public read for now, will add roles later)
CREATE POLICY "Enable read access for all users" ON departments FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON faculties FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON qualifications FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON publications FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON courses FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON faculty_courses FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON extracted_documents FOR SELECT USING (true);

-- Create indexes for performance
CREATE INDEX idx_faculties_department ON faculties(department_id);
CREATE INDEX idx_faculties_email ON faculties(email);
CREATE INDEX idx_qualifications_faculty ON qualifications(faculty_id);
CREATE INDEX idx_publications_faculty ON publications(faculty_id);
CREATE INDEX idx_publications_year ON publications(year);
CREATE INDEX idx_courses_department ON courses(department_id);
CREATE INDEX idx_faculty_courses_faculty ON faculty_courses(faculty_id);
CREATE INDEX idx_faculty_courses_course ON faculty_courses(course_id);
CREATE INDEX idx_extracted_documents_faculty ON extracted_documents(faculty_id);
CREATE INDEX idx_extracted_documents_hash ON extracted_documents(file_hash);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for faculties table
CREATE TRIGGER update_faculties_updated_at
  BEFORE UPDATE ON faculties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();