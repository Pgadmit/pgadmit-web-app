-- Saved Universities table setup for Supabase
-- This script creates the saved_universities table and related RPC functions
-- for managing user's favorite universities

-- Create saved_universities table
CREATE TABLE IF NOT EXISTS saved_universities (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  university_id BIGINT NOT NULL REFERENCES universities(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, university_id)
);

-- Enable RLS (Row Level Security) for saved_universities
ALTER TABLE saved_universities ENABLE ROW LEVEL SECURITY;

-- Create policies for saved_universities table
CREATE POLICY "Users can view their own saved universities" ON saved_universities
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own saved universities" ON saved_universities
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved universities" ON saved_universities
  FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_saved_universities_user_id ON saved_universities(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_universities_university_id ON saved_universities(university_id);
CREATE INDEX IF NOT EXISTS idx_saved_universities_created_at ON saved_universities(created_at);

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_saved_universities_updated_at ON saved_universities;
CREATE TRIGGER update_saved_universities_updated_at
  BEFORE UPDATE ON saved_universities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RPC Function: Add university to saved list
CREATE OR REPLACE FUNCTION add_saved_university(university_id_param BIGINT)
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  -- Check if university exists
  IF NOT EXISTS (SELECT 1 FROM universities WHERE id = university_id_param) THEN
    RETURN json_build_object(
      'success', false,
      'error', 'University not found',
      'code', 'UNIVERSITY_NOT_FOUND'
    );
  END IF;

  -- Try to insert, handle duplicate key error
  BEGIN
    INSERT INTO saved_universities (user_id, university_id)
    VALUES (auth.uid(), university_id_param);
    
    RETURN json_build_object(
      'success', true,
      'message', 'University added to saved list',
      'data', json_build_object(
        'user_id', auth.uid(),
        'university_id', university_id_param,
        'created_at', NOW()
      )
    );
  EXCEPTION WHEN unique_violation THEN
    RETURN json_build_object(
      'success', false,
      'error', 'University already in saved list',
      'code', 'ALREADY_SAVED'
    );
  END;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RPC Function: Remove university from saved list
CREATE OR REPLACE FUNCTION remove_saved_university(university_id_param BIGINT)
RETURNS JSON AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM saved_universities 
  WHERE user_id = auth.uid() AND university_id = university_id_param;
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  
  IF deleted_count = 0 THEN
    RETURN json_build_object(
      'success', false,
      'error', 'University not found in saved list',
      'code', 'NOT_SAVED'
    );
  END IF;
  
  RETURN json_build_object(
    'success', true,
    'message', 'University removed from saved list',
    'data', json_build_object(
      'user_id', auth.uid(),
      'university_id', university_id_param,
      'deleted_at', NOW()
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RPC Function: Get user's saved universities with full university details
CREATE OR REPLACE FUNCTION get_saved_universities(
  limit_count INTEGER DEFAULT 50,
  offset_count INTEGER DEFAULT 0
)
RETURNS TABLE (
  id BIGINT,
  university_id BIGINT,
  created_at TIMESTAMP WITH TIME ZONE,
  university_name TEXT,
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
    su.id,
    su.university_id,
    su.created_at,
    u.name as university_name,
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
  FROM saved_universities su
  JOIN universities u ON su.university_id = u.id
  WHERE su.user_id = auth.uid()
  ORDER BY su.created_at DESC
  LIMIT limit_count
  OFFSET offset_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RPC Function: Check if university is saved by user
CREATE OR REPLACE FUNCTION is_university_saved(university_id_param BIGINT)
RETURNS JSON AS $$
DECLARE
  is_saved BOOLEAN;
BEGIN
  SELECT EXISTS(
    SELECT 1 FROM saved_universities 
    WHERE user_id = auth.uid() AND university_id = university_id_param
  ) INTO is_saved;
  
  RETURN json_build_object(
    'success', true,
    'is_saved', is_saved,
    'university_id', university_id_param
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RPC Function: Get saved universities count for user
CREATE OR REPLACE FUNCTION get_saved_universities_count()
RETURNS JSON AS $$
DECLARE
  count_result BIGINT;
BEGIN
  SELECT COUNT(*) INTO count_result
  FROM saved_universities
  WHERE user_id = auth.uid();
  
  RETURN json_build_object(
    'success', true,
    'count', count_result
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RPC Function: Toggle university saved status (add if not saved, remove if saved)
CREATE OR REPLACE FUNCTION toggle_saved_university(university_id_param BIGINT)
RETURNS JSON AS $$
DECLARE
  is_saved BOOLEAN;
  result JSON;
BEGIN
  -- Check if university exists
  IF NOT EXISTS (SELECT 1 FROM universities WHERE id = university_id_param) THEN
    RETURN json_build_object(
      'success', false,
      'error', 'University not found',
      'code', 'UNIVERSITY_NOT_FOUND'
    );
  END IF;

  -- Check if already saved
  SELECT EXISTS(
    SELECT 1 FROM saved_universities 
    WHERE user_id = auth.uid() AND university_id = university_id_param
  ) INTO is_saved;
  
  IF is_saved THEN
    -- Remove from saved
    SELECT remove_saved_university(university_id_param) INTO result;
    RETURN json_build_object(
      'success', true,
      'action', 'removed',
      'is_saved', false,
      'data', result
    );
  ELSE
    -- Add to saved
    SELECT add_saved_university(university_id_param) INTO result;
    RETURN json_build_object(
      'success', true,
      'action', 'added',
      'is_saved', true,
      'data', result
    );
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
