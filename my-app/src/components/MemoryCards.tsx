import { Paper, Typography, Box, CircularProgress } from "@mui/material";
import type { Memory } from "../hooks/useMemories";
import MemoryActions from "./MemoryActions";

interface Props {
  memories: Memory[];
  loading: boolean;
  onDeleteRequest: (id: string) => void;
}

const MemoryCards = ({ memories, loading, onDeleteRequest }: Props) => {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (memories.length === 0) {
    return (
      <Typography align="center" color="text.secondary">
        No memories found.
      </Typography>
    );
  }

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {memories.map((memory) => (
        <Paper key={memory.id} sx={{ p: 2 }}>
          <Typography variant="h6">{memory.title}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {memory.description}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {new Date(memory.created_at).toLocaleString()}
          </Typography>
          <Box display="flex" justifyContent="flex-end" mt={1}>
            <MemoryActions id={memory.id} onDeleteRequest={onDeleteRequest} />
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default MemoryCards;
