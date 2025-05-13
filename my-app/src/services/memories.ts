import supabase from "./supabaseClient";
import type { Memory } from "../hooks/useMemories";

// Fetch all memories
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getAllMemories = async (): Promise<{ data: Memory[]; error: any }> => {
  const { data, error } = await supabase
    .from("memories")
    .select("*")
    .order("created_at", { ascending: false });
  return { data: data || [], error };
};

// Delete one memory
export const deleteMemory = async (id: string) => {
  const { error } = await supabase.from("memories").delete().eq("id", id);
  return error;
};
