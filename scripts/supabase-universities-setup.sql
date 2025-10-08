-- Universities table setup for Supabase
-- This script creates the universities table and related functions for CSV import
-- Updated to match actual table schema with correct data types

-- Create universities table
CREATE TABLE IF NOT EXISTS universities (
  id BIGINT PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT,
  state_province TEXT,
  city TEXT,
  website_url TEXT,
  university_type TEXT,
  logo_url TEXT,
  description TEXT,
  programs TEXT,
  qs_world_ranking INTEGER,
  us_news_ranking INTEGER,
  application_deadline_international TEXT,
  application_deadline_early TEXT,
  decision_release_date TEXT,
  application_fee NUMERIC,
  application_portal_url TEXT,
  robots_txt_url TEXT,
  minimum_gpa TEXT,
  average_gpa_admitted NUMERIC,
  tuition_fees_international TEXT,
  living_costs_monthly TEXT,
  application_fee_waiver BOOLEAN,
  accommodation_options TEXT,
  campus_size_setting TEXT,
  international_support_services TEXT,
  students_total TEXT,
  international_students_percent NUMERIC,
  countries_represented TEXT,
  alumni_network_strength TEXT,
  postgrad_work_permit TEXT,
  average_graduate_salary TEXT,
  top_employers TEXT,
  required_documents_ids TEXT,
  required_tests_undergrad TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Row Level Security) for universities
ALTER TABLE universities ENABLE ROW LEVEL SECURITY;

-- Create policies for universities table (public read access)
CREATE POLICY "Universities are viewable by everyone" ON universities
  FOR SELECT USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_universities_country ON universities(country);
CREATE INDEX IF NOT EXISTS idx_universities_state_province ON universities(state_province);
CREATE INDEX IF NOT EXISTS idx_universities_city ON universities(city);
CREATE INDEX IF NOT EXISTS idx_universities_university_type ON universities(university_type);
CREATE INDEX IF NOT EXISTS idx_universities_qs_ranking ON universities(qs_world_ranking);
CREATE INDEX IF NOT EXISTS idx_universities_us_news_ranking ON universities(us_news_ranking);
CREATE INDEX IF NOT EXISTS idx_universities_name ON universities USING gin(to_tsvector('english', name));
CREATE INDEX IF NOT EXISTS idx_universities_description ON universities USING gin(to_tsvector('english', description));

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_universities_updated_at ON universities;
CREATE TRIGGER update_universities_updated_at
  BEFORE UPDATE ON universities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Drop existing function if it exists (to allow return type changes)
DROP FUNCTION IF EXISTS search_universities(TEXT, TEXT, TEXT, INTEGER, INTEGER, INTEGER, INTEGER);

-- Create function to search universities
CREATE OR REPLACE FUNCTION search_universities(
  search_query TEXT DEFAULT '',
  country_filter TEXT DEFAULT NULL,
  university_type_filter TEXT DEFAULT NULL,
  min_qs_ranking INTEGER DEFAULT NULL,
  max_qs_ranking INTEGER DEFAULT NULL,
  limit_count INTEGER DEFAULT 50,
  offset_count INTEGER DEFAULT 0
)
RETURNS TABLE (
  id BIGINT,
  name TEXT,
  country TEXT,
  state_province TEXT,
  city TEXT,
  website_url TEXT,
  university_type TEXT,
  logo_url TEXT,
  description TEXT,
  qs_world_ranking INTEGER,
  us_news_ranking INTEGER,
  application_fee NUMERIC,
  minimum_gpa TEXT,
  average_gpa_admitted NUMERIC,
  students_total TEXT,
  international_students_percent NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    u.id,
    u.name,
    u.country,
    u.state_province,
    u.city,
    u.website_url,
    u.university_type,
    u.logo_url,
    u.description,
    u.qs_world_ranking,
    u.us_news_ranking,
    u.application_fee,
    u.minimum_gpa,
    u.average_gpa_admitted,
    u.students_total,
    u.international_students_percent
  FROM universities u
  WHERE 
    (search_query = '' OR 
     to_tsvector('english', u.name || ' ' || COALESCE(u.description, '')) @@ plainto_tsquery('english', search_query))
    AND (country_filter IS NULL OR u.country ILIKE '%' || country_filter || '%')
    AND (university_type_filter IS NULL OR u.university_type = university_type_filter)
    AND (min_qs_ranking IS NULL OR u.qs_world_ranking >= min_qs_ranking)
    AND (max_qs_ranking IS NULL OR u.qs_world_ranking <= max_qs_ranking)
  ORDER BY 
    CASE WHEN u.qs_world_ranking IS NOT NULL THEN u.qs_world_ranking ELSE 999999 END,
    u.name
  LIMIT limit_count
  OFFSET offset_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing function if it exists (to allow return type changes)
DROP FUNCTION IF EXISTS get_university_stats();

-- Create function to get university statistics
CREATE OR REPLACE FUNCTION get_university_stats()
RETURNS TABLE (
  total_universities BIGINT,
  countries_count BIGINT,
  avg_qs_ranking NUMERIC,
  avg_international_percent NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*) as total_universities,
    COUNT(DISTINCT country) as countries_count,
    AVG(qs_world_ranking) as avg_qs_ranking,
    AVG(international_students_percent) as avg_international_percent
  FROM universities
  WHERE qs_world_ranking IS NOT NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get countries list
CREATE OR REPLACE FUNCTION get_countries_list()
RETURNS TABLE (
  country TEXT,
  universities_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    u.country,
    COUNT(*) as universities_count
  FROM universities u
  WHERE u.country IS NOT NULL
  GROUP BY u.country
  ORDER BY universities_count DESC, u.country;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get university types list
CREATE OR REPLACE FUNCTION get_university_types_list()
RETURNS TABLE (
  university_type TEXT,
  universities_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    u.university_type,
    COUNT(*) as universities_count
  FROM universities u
  WHERE u.university_type IS NOT NULL
  GROUP BY u.university_type
  ORDER BY universities_count DESC, u.university_type;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

