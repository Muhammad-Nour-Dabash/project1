import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  id: string;
  onDeleteRequest: (id: string) => void;
}

const MemoryActions = ({ id, onDeleteRequest }: Props) => (
  <>
    <Tooltip title="Edit">
      <IconButton
        color="primary"
        size="small"
        onClick={() => alert(`Edit ${id}`)}
      >
        <EditIcon />
      </IconButton>
    </Tooltip>
    <Tooltip title="Delete">
      <IconButton
        color="error"
        size="small"
        onClick={() => onDeleteRequest(id)}
      >
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  </>
);

export default MemoryActions;
