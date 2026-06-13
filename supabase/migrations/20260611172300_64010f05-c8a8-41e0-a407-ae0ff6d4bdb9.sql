
CREATE TABLE public.partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category public.donor_category NOT NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  address TEXT NOT NULL,
  city TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  cover_url TEXT,
  logo_url TEXT,
  verified BOOLEAN NOT NULL DEFAULT true,
  rating NUMERIC(3,2) DEFAULT 4.5,
  total_rescued INT DEFAULT 0,
  owner_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.partners TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.partners TO authenticated;
GRANT ALL ON public.partners TO service_role;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
CREATE POLICY "partners_public_read" ON public.partners FOR SELECT USING (true);
CREATE POLICY "partners_owner_write" ON public.partners FOR UPDATE TO authenticated USING (owner_user_id = auth.uid());
CREATE POLICY "partners_admin_all" ON public.partners FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

ALTER TABLE public.food_listings ADD COLUMN partner_id UUID REFERENCES public.partners(id) ON DELETE CASCADE;
ALTER TABLE public.food_listings ALTER COLUMN donor_id DROP NOT NULL;
CREATE INDEX ON public.food_listings(partner_id);
CREATE INDEX ON public.food_listings(category, status);
CREATE INDEX ON public.partners(category);
