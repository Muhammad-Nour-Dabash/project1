import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemoryFormStore } from "../store/memoriesStore";
import {
  createMemory,
  updateMemory,
  getMemoryById,
} from "../services/memories";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const MemoryForm = () => {
  const { t } = useTranslation();
  const { isOpen, mode, selectedId, closeForm } = useMemoryFormStore();
  const { user } = useAuth();
  const [loadingMemory, setLoadingMemory] = useState(false);

  const schema = z.object({
    title: z.string().min(3, t("title-required")).max(100, t("title-max")),
    description: z.string().min(1, t("desc-required")).max(1000, t("desc-max")),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { title: "", description: "" },
    mode: "onChange",
  });

  // Load memory when editing
  useEffect(() => {
    if (mode === "edit" && selectedId) {
      setLoadingMemory(true);
      getMemoryById(selectedId)
        .then(({ data }) => {
          if (data) reset(data);
        })
        .finally(() => setLoadingMemory(false));
    } else {
      reset({ title: "", description: "" });
    }
  }, [mode, selectedId, reset]);

  const onSubmit = async (data: FormData) => {
    if (!user) return;

    const error =
      mode === "edit" && selectedId
        ? await updateMemory(selectedId, data)
        : await createMemory(data, user.id);

    if (!error) {
      closeForm();
      reset();
    }
  };

  return (
    <Dialog open={isOpen} onClose={closeForm} fullWidth maxWidth="sm">
      <DialogTitle>
        {mode === "edit" ? t("edit-memory") : t("create-memory")}
      </DialogTitle>
      <DialogContent>
        {loadingMemory ? (
          <CircularProgress sx={{ m: 2 }} />
        ) : (
          <form id="memory-form" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label={t("title")}
              fullWidth
              margin="normal"
              {...register("title")}
              error={!!errors.title}
              helperText={errors.title?.message}
            />

            <TextField
              label={t("description")}
              fullWidth
              margin="normal"
              multiline
              rows={3}
              {...register("description")}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          </form>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={closeForm}>{t("cancel")}</Button>
        <Button
          form="memory-form"
          type="submit"
          variant="contained"
          disabled={isSubmitting || !isValid || loadingMemory}
        >
          {mode === "edit" ? t("update") : t("create")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MemoryForm;
