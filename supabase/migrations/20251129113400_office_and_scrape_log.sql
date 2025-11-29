-- Create office table
CREATE TABLE office (
  office_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_number TEXT,
  block TEXT,
  location TEXT
);

-- Create scrape_log table
CREATE TABLE scrape_log (
  log_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "timestamp" TIMESTAMPTZ DEFAULT now(),
  records_updated INTEGER,
  status TEXT,
  error_message TEXT
);

-- Add hod_id to departments table
ALTER TABLE departments
ADD COLUMN hod_id UUID REFERENCES faculties(id);
