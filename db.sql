-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.custom_category_request (
  id integer NOT NULL DEFAULT nextval('custom_category_request_id_seq'::regclass),
  provider_id uuid NOT NULL,
  requested_category character varying NOT NULL,
  requested_category_english character varying,
  status character varying DEFAULT 'pending'::character varying CHECK (status::text = ANY (ARRAY['pending'::character varying, 'approved'::character varying, 'rejected'::character varying]::text[])),
  created_at timestamp without time zone DEFAULT now(),
  reviewed_at timestamp without time zone,
  reviewed_by uuid,
  notes text,
  created_category_id integer,
  CONSTRAINT custom_category_request_pkey PRIMARY KEY (id),
  CONSTRAINT custom_category_request_provider_id_fkey FOREIGN KEY (provider_id) REFERENCES public.service_provider(id),
  CONSTRAINT custom_category_request_created_category_id_fkey FOREIGN KEY (created_category_id) REFERENCES public.service_category(id)
);
CREATE TABLE public.provider_activity_log (
  id integer NOT NULL DEFAULT nextval('provider_activity_log_id_seq'::regclass),
  provider_id uuid NOT NULL,
  activity_type character varying NOT NULL,
  ip_address character varying,
  user_agent text,
  metadata jsonb,
  created_at timestamp without time zone DEFAULT now(),
  CONSTRAINT provider_activity_log_pkey PRIMARY KEY (id),
  CONSTRAINT provider_activity_log_provider_id_fkey FOREIGN KEY (provider_id) REFERENCES public.service_provider(id)
);
CREATE TABLE public.provider_category (
  id integer NOT NULL DEFAULT nextval('provider_category_id_seq'::regclass),
  provider_id uuid NOT NULL,
  category_id integer NOT NULL,
  created_at timestamp without time zone DEFAULT now(),
  CONSTRAINT provider_category_pkey PRIMARY KEY (id),
  CONSTRAINT provider_category_provider_id_fkey FOREIGN KEY (provider_id) REFERENCES public.service_provider(id),
  CONSTRAINT provider_category_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.service_category(id)
);
CREATE TABLE public.provider_evaluation_results (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  provider_id uuid NOT NULL UNIQUE,
  total_reviews integer NOT NULL,
  weighted_score numeric NOT NULL,
  trust_percentage numeric NOT NULL,
  status character varying NOT NULL CHECK (status::text = ANY (ARRAY['pending'::character varying, 'dangerous'::character varying, 'rejected'::character varying, 'approved'::character varying]::text[])),
  badge character varying CHECK (badge::text = ANY (ARRAY['bronze'::character varying, 'silver'::character varying, 'gold'::character varying, NULL::character varying]::text[])),
  explanation text NOT NULL,
  evaluated_at timestamp without time zone DEFAULT now(),
  updated_at timestamp without time zone DEFAULT now(),
  CONSTRAINT provider_evaluation_results_pkey PRIMARY KEY (id),
  CONSTRAINT provider_evaluation_results_provider_id_fkey FOREIGN KEY (provider_id) REFERENCES public.service_provider(id)
);
CREATE TABLE public.provider_rep_reviews (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  provider_id uuid NOT NULL,
  rep_id uuid NOT NULL,
  vote integer NOT NULL CHECK (vote = ANY (ARRAY['-1'::integer, 1])),
  confidence integer NOT NULL CHECK (confidence >= 1 AND confidence <= 5),
  notes text,
  created_at timestamp without time zone DEFAULT now(),
  updated_at timestamp without time zone DEFAULT now(),
  CONSTRAINT provider_rep_reviews_pkey PRIMARY KEY (id),
  CONSTRAINT provider_rep_reviews_provider_id_fkey FOREIGN KEY (provider_id) REFERENCES public.service_provider(id),
  CONSTRAINT provider_rep_reviews_rep_id_fkey FOREIGN KEY (rep_id) REFERENCES public.rep(id)
);
CREATE TABLE public.provider_review (
  id integer NOT NULL DEFAULT nextval('provider_review_id_seq'::regclass),
  provider_id uuid NOT NULL,
  user_id uuid,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  comment text,
  helpful_count integer DEFAULT 0,
  created_at timestamp without time zone DEFAULT now(),
  updated_at timestamp without time zone DEFAULT now(),
  CONSTRAINT provider_review_pkey PRIMARY KEY (id),
  CONSTRAINT provider_review_provider_id_fkey FOREIGN KEY (provider_id) REFERENCES public.service_provider(id)
);
CREATE TABLE public.rep (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  username character varying NOT NULL UNIQUE,
  password_hash text NOT NULL,
  full_name character varying NOT NULL,
  email character varying UNIQUE,
  phone character varying,
  role character varying DEFAULT 'rep'::character varying CHECK (role::text = ANY (ARRAY['admin'::character varying, 'rep'::character varying, 'supervisor'::character varying]::text[])),
  is_active boolean DEFAULT true,
  providers_reviewed integer DEFAULT 0,
  providers_approved integer DEFAULT 0,
  providers_rejected integer DEFAULT 0,
  last_login_at timestamp without time zone,
  last_login_ip character varying,
  created_at timestamp without time zone DEFAULT now(),
  created_by uuid,
  updated_at timestamp without time zone DEFAULT now(),
  CONSTRAINT rep_pkey PRIMARY KEY (id),
  CONSTRAINT rep_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.rep(id)
);
CREATE TABLE public.rep_activity (
  id integer NOT NULL DEFAULT nextval('rep_activity_id_seq'::regclass),
  rep_id uuid NOT NULL,
  activity_type character varying NOT NULL,
  provider_id uuid,
  details jsonb,
  ip_address character varying,
  created_at timestamp without time zone DEFAULT now(),
  CONSTRAINT rep_activity_pkey PRIMARY KEY (id),
  CONSTRAINT rep_activity_rep_id_fkey FOREIGN KEY (rep_id) REFERENCES public.rep(id),
  CONSTRAINT rep_activity_provider_id_fkey FOREIGN KEY (provider_id) REFERENCES public.service_provider(id)
);
CREATE TABLE public.rep_session (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  rep_id uuid NOT NULL,
  session_token text NOT NULL UNIQUE,
  ip_address character varying,
  user_agent text,
  expires_at timestamp without time zone NOT NULL,
  created_at timestamp without time zone DEFAULT now(),
  CONSTRAINT rep_session_pkey PRIMARY KEY (id),
  CONSTRAINT rep_session_rep_id_fkey FOREIGN KEY (rep_id) REFERENCES public.rep(id)
);
CREATE TABLE public.service_category (
  id integer NOT NULL DEFAULT nextval('service_category_id_seq'::regclass),
  name character varying NOT NULL UNIQUE,
  name_english character varying,
  created_at timestamp without time zone DEFAULT now(),
  CONSTRAINT service_category_pkey PRIMARY KEY (id)
);
CREATE TABLE public.service_provider (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  provider_type character varying NOT NULL CHECK (provider_type::text = ANY (ARRAY['individual'::character varying, 'organization'::character varying]::text[])),
  logo_url text,
  name character varying NOT NULL,
  description_persian text NOT NULL,
  description_english text,
  province character varying,
  city character varying,
  online_services boolean DEFAULT false,
  response_speed character varying CHECK (response_speed::text = ANY (ARRAY['asap'::character varying, 'scheduled'::character varying, 'day'::character varying, 'hour'::character varying, 'immediate'::character varying]::text[])),
  telegram character varying,
  signal character varying,
  whatsapp character varying,
  phone character varying,
  email character varying,
  social_link text NOT NULL,
  status character varying DEFAULT 'pending'::character varying CHECK (status::text = ANY (ARRAY['pending'::character varying, 'approved'::character varying, 'rejected'::character varying, 'suspended'::character varying]::text[])),
  verified boolean DEFAULT false,
  verification_notes text,
  consent_direct_contact boolean DEFAULT false,
  consent_terms boolean DEFAULT false,
  created_at timestamp without time zone DEFAULT now(),
  updated_at timestamp without time zone DEFAULT now(),
  approved_at timestamp without time zone,
  reviewed_by uuid,
  reviewed_at timestamp without time zone,
  review_status character varying DEFAULT 'pending'::character varying CHECK (review_status::text = ANY (ARRAY['pending'::character varying, 'under_review'::character varying, 'evaluated'::character varying, 'approved'::character varying, 'rejected'::character varying, 'dangerous'::character varying]::text[])),
  badge character varying CHECK (badge::text = ANY (ARRAY['bronze'::character varying, 'silver'::character varying, 'gold'::character varying, NULL::character varying]::text[])),
  total_rep_reviews integer DEFAULT 0,
  trust_score numeric,
  CONSTRAINT service_provider_pkey PRIMARY KEY (id),
  CONSTRAINT service_provider_reviewed_by_fkey FOREIGN KEY (reviewed_by) REFERENCES public.rep(id)
);