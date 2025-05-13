import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box,
} from "@mui/material";
import MemoryActions from "./MemoryActions";
import type { Memory } from "../hooks/useMemories";

interface Props {
  memories: Memory[];
  loading: boolean;
  onDeleteRequest: (id: string) => void;
}

const MemoryTable = ({ memories, loading, onDeleteRequest }: Props) => (
  <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }}>
      <TableHead>
        <TableRow>
          <TableCell>Title</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Created At</TableCell>
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {memories.map((memory) => (
          <TableRow key={memory.id}>
            <TableCell>{memory.title}</TableCell>
            <TableCell>{memory.description}</TableCell>
            <TableCell>
              {new Date(memory.created_at).toLocaleString()}
            </TableCell>
            <TableCell align="right">
              <MemoryActions id={memory.id} onDeleteRequest={onDeleteRequest} />
            </TableCell>
          </TableRow>
        ))}
        {loading ? (
          <TableRow>
            <TableCell colSpan={4} align="center">
              <Box py={2}>
                <CircularProgress size={24} />
              </Box>
            </TableCell>
          </TableRow>
        ) : memories.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} align="center">
              No memories found.
            </TableCell>
          </TableRow>
        ) : null}
      </TableBody>
    </Table>
  </TableContainer>
);

export default MemoryTable;
