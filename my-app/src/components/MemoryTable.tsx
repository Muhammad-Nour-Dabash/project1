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
import { useTranslation } from "react-i18next";

interface Props {
  memories: Memory[];
  loading: boolean;
  onDeleteRequest: (id: string) => void;
}

const MemoryTable = ({ memories, loading, onDeleteRequest }: Props) => {
  const { t } = useTranslation();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>{t("title")}</TableCell>
            <TableCell>{t("description")}</TableCell>
            <TableCell>{t("created-at")}</TableCell>
            <TableCell align="right">{t("actions")}</TableCell>
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
                <MemoryActions
                  id={memory.id}
                  onDeleteRequest={onDeleteRequest}
                />
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
                {t("no-memories-found")}
              </TableCell>
            </TableRow>
          ) : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MemoryTable;
