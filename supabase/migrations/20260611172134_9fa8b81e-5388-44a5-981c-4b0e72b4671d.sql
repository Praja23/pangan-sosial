
-- Enums
CREATE TYPE public.app_role AS ENUM ('admin','donor_hotel','donor_restoran','donor_umkm','donor_mbg','penerima');
CREATE TYPE public.listing_status AS ENUM ('available','reserved','picked_up','expired','cancelled');
CREATE TYPE public.reservation_status AS ENUM ('pending','picked_up','expired','cancelled');
CREATE TYPE public.donor_category AS ENUM ('hotel','restoran','umkm','mbg');
CREATE TYPE public.report_status AS ENUM ('open','reviewed','resolved','dismissed');
CREATE TYPE public.sanction_type AS ENUM ('warning','suspended','banned');

-- profiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL DEFAULT '',
  phone TEXT,
  address TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_select_all_auth" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "profiles_insert_self" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_self" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

-- user_roles
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);
GRANT SELECT, INSERT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "user_roles_self_read" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "user_roles_self_insert" ON public.user_roles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "user_roles_admin_all" ON public.user_roles FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- donor_profiles
CREATE TABLE public.donor_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  category public.donor_category NOT NULL,
  org_name TEXT NOT NULL,
  description TEXT,
  address TEXT NOT NULL,
  city TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  cover_url TEXT,
  contact_phone TEXT,
  license_no TEXT,
  verified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.donor_profiles TO anon;
GRANT SELECT, INSERT, UPDATE ON public.donor_profiles TO authenticated;
GRANT ALL ON public.donor_profiles TO service_role;
ALTER TABLE public.donor_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "donor_profiles_public_read" ON public.donor_profiles FOR SELECT USING (true);
CREATE POLICY "donor_profiles_self_upsert" ON public.donor_profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "donor_profiles_self_update" ON public.donor_profiles FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "donor_profiles_admin_all" ON public.donor_profiles FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- food_listings
CREATE TABLE public.food_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category public.donor_category NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  portions INT NOT NULL CHECK (portions > 0),
  portions_remaining INT NOT NULL,
  image_url TEXT,
  pickup_address TEXT NOT NULL,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  expires_at TIMESTAMPTZ NOT NULL,
  rescue_score INT NOT NULL DEFAULT 50,
  priority_label TEXT,
  status public.listing_status NOT NULL DEFAULT 'available',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.food_listings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.food_listings TO authenticated;
GRANT ALL ON public.food_listings TO service_role;
ALTER TABLE public.food_listings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "listings_public_read" ON public.food_listings FOR SELECT USING (true);
CREATE POLICY "listings_donor_insert" ON public.food_listings FOR INSERT TO authenticated WITH CHECK (auth.uid() = donor_id);
CREATE POLICY "listings_donor_update" ON public.food_listings FOR UPDATE TO authenticated USING (auth.uid() = donor_id);
CREATE POLICY "listings_donor_delete" ON public.food_listings FOR DELETE TO authenticated USING (auth.uid() = donor_id);
CREATE POLICY "listings_admin_all" ON public.food_listings FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- reservations
CREATE TABLE public.reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID NOT NULL REFERENCES public.food_listings(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  portions INT NOT NULL CHECK (portions > 0),
  status public.reservation_status NOT NULL DEFAULT 'pending',
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + INTERVAL '60 minutes'),
  picked_up_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.reservations TO authenticated;
GRANT ALL ON public.reservations TO service_role;
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "reservations_self_read" ON public.reservations FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM public.food_listings l WHERE l.id = listing_id AND l.donor_id = auth.uid()));
CREATE POLICY "reservations_insert_self" ON public.reservations FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "reservations_update_self" ON public.reservations FOR UPDATE TO authenticated
  USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM public.food_listings l WHERE l.id = listing_id AND l.donor_id = auth.uid()));
CREATE POLICY "reservations_admin_all" ON public.reservations FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- reports
CREATE TABLE public.reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  target_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  listing_id UUID REFERENCES public.food_listings(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  evidence_url TEXT,
  status public.report_status NOT NULL DEFAULT 'open',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.reports TO authenticated;
GRANT ALL ON public.reports TO service_role;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "reports_self_insert" ON public.reports FOR INSERT TO authenticated WITH CHECK (auth.uid() = reporter_id);
CREATE POLICY "reports_self_read" ON public.reports FOR SELECT TO authenticated USING (auth.uid() = reporter_id);
CREATE POLICY "reports_admin_all" ON public.reports FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- sanctions
CREATE TABLE public.sanctions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type public.sanction_type NOT NULL,
  reason TEXT NOT NULL,
  issued_by UUID REFERENCES auth.users(id),
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.sanctions TO authenticated;
GRANT ALL ON public.sanctions TO service_role;
ALTER TABLE public.sanctions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "sanctions_self_read" ON public.sanctions FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "sanctions_admin_all" ON public.sanctions FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- handle_new_user trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''))
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
