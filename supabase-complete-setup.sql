-- Complete Supabase setup with profiles and onboarding tables

-- Create profiles table (if not exists)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  name TEXT,
  country TEXT DEFAULT 'India',
  field_of_study TEXT,
  budget TEXT,
  current_education TEXT,
  gpa TEXT,
  avatar_url TEXT,
  picture TEXT,
  onboarding_complete BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Row Level Security) for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles table
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, country, field_of_study, budget, avatar_url, picture)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'country', 'India'),
    NEW.raw_user_meta_data->>'field_of_study',
    NEW.raw_user_meta_data->>'budget',
    NEW.raw_user_meta_data->>'avatar_url',
    NEW.raw_user_meta_data->>'picture'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create separate table for onboarding data
CREATE TABLE IF NOT EXISTS user_onboarding (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  study_goal TEXT,
  destination TEXT,
  knows_universities TEXT,
  country TEXT,
  field_of_study TEXT,
  gpa TEXT,
  intake TEXT,
  budget TEXT,
  funding TEXT,
  study_break BOOLEAN,
  visa_refusal BOOLEAN,
  segment TEXT,
  onboarding_data JSONB,
  is_completed BOOLEAN DEFAULT false,
  current_step INTEGER DEFAULT 0,
  budget_slider INTEGER[] DEFAULT ARRAY[30000],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Row Level Security) for user_onboarding
ALTER TABLE user_onboarding ENABLE ROW LEVEL SECURITY;

-- Create policies for user_onboarding table
CREATE POLICY "Users can view own onboarding data" ON user_onboarding
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own onboarding data" ON user_onboarding
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own onboarding data" ON user_onboarding
  FOR UPDATE USING (auth.uid() = id);

-- Create function to upsert onboarding data
CREATE OR REPLACE FUNCTION public.upsert_onboarding_data(
  user_id UUID,
  onboarding_data JSONB
)
RETURNS VOID AS $$
BEGIN
  INSERT INTO public.user_onboarding (
    id,
    study_goal,
    destination,
    knows_universities,
    country,
    field_of_study,
    gpa,
    intake,
    budget,
    funding,
    study_break,
    visa_refusal,
    segment,
    onboarding_data,
    is_completed,
    current_step,
    budget_slider,
    updated_at
  )
  VALUES (
    user_id,
    (onboarding_data->>'studyGoal')::TEXT,
    (onboarding_data->>'destination')::TEXT,
    (onboarding_data->>'knowsUniversities')::TEXT,
    (onboarding_data->>'country')::TEXT,
    (onboarding_data->>'fieldOfStudy')::TEXT,
    (onboarding_data->>'gpa')::TEXT,
    (onboarding_data->>'intake')::TEXT,
    (onboarding_data->>'budget')::TEXT,
    (onboarding_data->>'funding')::TEXT,
    (onboarding_data->>'studyBreak')::BOOLEAN,
    (onboarding_data->>'visaRefusal')::BOOLEAN,
    (onboarding_data->>'segment')::TEXT,
    onboarding_data,
    (onboarding_data->>'isCompleted')::BOOLEAN,
    (onboarding_data->>'currentStep')::INTEGER,
    (onboarding_data->>'budgetSlider')::INTEGER[],
    NOW()
  )
  ON CONFLICT (id) DO UPDATE SET
    study_goal = EXCLUDED.study_goal,
    destination = EXCLUDED.destination,
    knows_universities = EXCLUDED.knows_universities,
    country = EXCLUDED.country,
    field_of_study = EXCLUDED.field_of_study,
    gpa = EXCLUDED.gpa,
    intake = EXCLUDED.intake,
    budget = EXCLUDED.budget,
    funding = EXCLUDED.funding,
    study_break = EXCLUDED.study_break,
    visa_refusal = EXCLUDED.visa_refusal,
    segment = EXCLUDED.segment,
    onboarding_data = EXCLUDED.onboarding_data,
    is_completed = EXCLUDED.is_completed,
    current_step = EXCLUDED.current_step,
    budget_slider = EXCLUDED.budget_slider,
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get onboarding data
CREATE OR REPLACE FUNCTION public.get_onboarding_data(user_id UUID)
RETURNS TABLE (
  study_goal TEXT,
  destination TEXT,
  knows_universities TEXT,
  country TEXT,
  field_of_study TEXT,
  gpa TEXT,
  intake TEXT,
  budget TEXT,
  funding TEXT,
  study_break BOOLEAN,
  visa_refusal BOOLEAN,
  segment TEXT,
  onboarding_data JSONB,
  is_completed BOOLEAN,
  current_step INTEGER,
  budget_slider INTEGER[]
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    uo.study_goal,
    uo.destination,
    uo.knows_universities,
    uo.country,
    uo.field_of_study,
    uo.gpa,
    uo.intake,
    uo.budget,
    uo.funding,
    uo.study_break,
    uo.visa_refusal,
    uo.segment,
    uo.onboarding_data,
    uo.is_completed,
    uo.current_step,
    uo.budget_slider
  FROM user_onboarding uo
  WHERE uo.id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to sync onboarding completion status
CREATE OR REPLACE FUNCTION public.sync_onboarding_completion()
RETURNS TRIGGER AS $$
BEGIN
  -- Update profiles table when onboarding completion changes
  UPDATE public.profiles 
  SET 
    onboarding_complete = NEW.is_completed,
    updated_at = NOW()
  WHERE id = NEW.id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to sync onboarding completion
DROP TRIGGER IF EXISTS sync_onboarding_completion_trigger ON user_onboarding;
CREATE TRIGGER sync_onboarding_completion_trigger
  AFTER INSERT OR UPDATE OF is_completed ON user_onboarding
  FOR EACH ROW EXECUTE FUNCTION public.sync_onboarding_completion();

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_onboarding_complete ON profiles(onboarding_complete);
CREATE INDEX IF NOT EXISTS idx_user_onboarding_completed ON user_onboarding(is_completed);
CREATE INDEX IF NOT EXISTS idx_user_onboarding_study_goal ON user_onboarding(study_goal);
CREATE INDEX IF NOT EXISTS idx_user_onboarding_destination ON user_onboarding(destination);
CREATE INDEX IF NOT EXISTS idx_user_onboarding_segment ON user_onboarding(segment);
