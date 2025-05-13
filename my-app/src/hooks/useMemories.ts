import { useEffect, useState } from "react";
import { getAllMemories } from "../services/memories";
import supabase from "../services/supabaseClient";

export type Memory = {
  id: string;
  title: string;
  description: string;
  created_at: string;
};

export const useMemories = () => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMemories = async () => {
    setLoading(true);
    const { data, error } = await getAllMemories();
    if (!error) setMemories(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMemories();

    const channel = supabase
      .channel("memories-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "memories" },
        () => fetchMemories()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { memories, loading, refetch: fetchMemories };
};
