import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemoryFormStore } from "../store/memoriesStore";
import { createMemory } from "../services/memories";
import { useAuth } from "../context/AuthContext";

const schema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be at most 100 characters"),
  description: z
    .string()
    .min(1, "Description must be at least 1 character")
    .max(1000, "Description must be at most 1000 characters"),
});

type FormData = z.infer<typeof schema>;

const MemoryForm = () => {
  const { isOpen, closeForm } = useMemoryFormStore();
  const { user } = useAuth();

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

  const onSubmit = async (data: FormData) => {
    if (!user) return;

    const error = await createMemory(data, user.id);
    if (!error) {
      closeForm();
      reset();
    }
  };

  return (
    <Dialog open={isOpen} onClose={closeForm} fullWidth maxWidth="sm">
      <DialogTitle>Create Memory</DialogTitle>
      <DialogContent>
        <form id="memory-form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
          />

          <TextField
            label="Description"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeForm}>Cancel</Button>
        <Button
          form="memory-form"
          type="submit"
          variant="contained"
          disabled={isSubmitting || !isValid}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MemoryForm;
