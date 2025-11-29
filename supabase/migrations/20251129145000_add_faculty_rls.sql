
CREATE POLICY "Allow authenticated users to insert faculties"
  ON public.faculties
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to view faculties"
  ON public.faculties
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to update faculties"
  ON public.faculties
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete faculties"
  ON public.faculties
  FOR DELETE
  TO authenticated
  USING (true);
