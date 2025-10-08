import { supabaseBrowser } from "@/lib/supabase/client";
import type { UniversityTypeInfo, University } from "@/entities/universities";

const supabase = supabaseBrowser();

export async function getUniversities(): Promise<{
  data: University[];
  error?: string;
}> {
  try {
    const { data, error } = await supabase.from("universities").select("*");
    if (error) {
      console.error("Supabase error:", {
        error: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
    }
    return { data: data ?? [], error: error?.message };
  } catch (error) {
    console.error("Universities retrieval error:", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    });
    return {
      data: [],
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function getUniversityById(id: number): Promise<{
  data: University | null;
  error?: string;
}> {
  try {
    const { data, error } = await supabase
      .from("universities")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Supabase error:", {
        error: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
        id,
      });
      return { data: null, error: error.message };
    }

    return { data };
  } catch (error) {
    console.error("Unexpected error:", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      id,
      timestamp: new Date().toISOString(),
    });
    return {
      data: null,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function getUniversityTypes(): Promise<{
  data: UniversityTypeInfo[];
  error?: string;
}> {
  try {
    const { data, error } = await supabase.rpc("get_university_types_list");

    if (error) {
      console.error("RPC error:", {
        error: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
      return { data: [], error: error.message };
    }

    return { data: data ?? [] };
  } catch (error) {
    console.error("Unexpected error:", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    });
    return {
      data: [],
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
