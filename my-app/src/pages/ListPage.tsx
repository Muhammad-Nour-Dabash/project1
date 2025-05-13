import {
  Box,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  Snackbar,
  Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useMemories } from "../hooks/useMemories";
import MemoryTable from "../components/MemoryTable";
import MemoryCards from "../components/MemoryCards";
import ConfirmDeleteDialog from "../components/ConfirmDeleteDialog";
import { useState } from "react";
import { deleteMemory } from "../services/memories";

const ListPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { memories, loading } = useMemories();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleDeleteRequest = (id: string) => {
    setDeleteId(id);
    setShowDialog(true);
  };

  return (
    <Box sx={{ mt: 4 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: isMobile ? "center" : "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant={isMobile ? "h6" : "h4"}>Your Memories</Typography>
        {!isMobile && (
          <Button variant="contained" color="primary">
            + Create Memory
          </Button>
        )}
      </Box>

      {isMobile && (
        <Fab
          color="primary"
          sx={{ position: "fixed", bottom: 24, right: 24, zIndex: 1000 }}
        >
          <AddIcon />
        </Fab>
      )}

      {/* Memory display */}
      {isMobile ? (
        <MemoryCards
          memories={memories}
          loading={loading}
          onDeleteRequest={handleDeleteRequest}
        />
      ) : (
        <MemoryTable
          memories={memories}
          loading={loading}
          onDeleteRequest={handleDeleteRequest}
        />
      )}

      {/* Confirm Delete Dialog */}
      <ConfirmDeleteDialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        onConfirm={() => {
          if (deleteId) {
            deleteMemory(deleteId).then((error) => {
              if (!error) setShowSnackbar(true);
              setDeleteId(null);
              setShowDialog(false);
            });
          }
        }}
      />

      {/* Snackbar */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        message="Memory deleted successfully"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Box>
  );
};

export default ListPage;
