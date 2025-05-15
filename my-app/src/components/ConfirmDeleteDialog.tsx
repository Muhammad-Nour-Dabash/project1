import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteDialog = ({ open, onClose, onConfirm }: Props) => {
  const { t } = useTranslation();
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t("confirm-delete")}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t("delete-confirm-message")}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t("cancel")}</Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          {t("delete")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
