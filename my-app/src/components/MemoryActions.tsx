import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMemoryFormStore } from "../store/memoriesStore";
import { useTranslation } from "react-i18next";

interface Props {
  id: string;
  onDeleteRequest: (id: string) => void;
}

const MemoryActions = ({ id, onDeleteRequest }: Props) => {
  const { openForm } = useMemoryFormStore(); // ✅ Zustand state
  const { t } = useTranslation();
  return (
    <>
      <Tooltip title={t("edit")}>
        <IconButton
          color="primary"
          size="small"
          onClick={() => openForm("edit", id)} // ✅ Trigger Edit form
        >
          <EditIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title={t("delete")}>
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
};

export default MemoryActions;
