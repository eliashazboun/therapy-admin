import { useDisorderModal } from "@/hooks/use-disorder-modal";
import { useState } from "react";
import { Modal } from "../ui/modal";
import {
  Autocomplete,
  FilterOptionsState,
  TextField,
  createFilterOptions,
} from "@mui/material";
import { Disorders } from "@prisma/client";
import { Combobox } from "../ui/combobox";
import { Button } from "../ui/button";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Spinner from "../ui/spinner";
import toast from "react-hot-toast";

interface AddDisorderModalProps {
  disorders: Disorders[];
}

const AddDisorderModal: React.FC<AddDisorderModalProps> = ({ disorders }) => {
  const disorderModal = useDisorderModal();
  const [value, setValue] = useState<{ label: string; id: string } | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const options = disorders.map((disorder) => ({
    label: disorder.condition,
    id: disorder.id,
  }));
  const params = useParams();
  const router = useRouter();

  const addDisorder = async () => {
    try {
      setLoading(true);
      await axios.post(
        `/api/${params.practiceId}/clients/${params.clientId}/disorders`,
        {
          disorderId: value?.id,
        }
      );

      router.refresh();
      toast.success("Added disorder to client!");
      disorderModal.onClose();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Add Disorder"
      isOpen={disorderModal.isOpen}
      onClose={disorderModal.onClose}
      description="Add a disorder for your client."
    >
      <Autocomplete
        disablePortal
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        options={options}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderOption={(props, option: { label: string; id: string }) => {
          return (
            <li {...props} key={option.id}>
              {option.label}
            </li>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            key={params.inputProps.id}
            variant="standard"
            placeholder="Disorders"
          />
        )}
      />
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button
          disabled={loading}
          variant={"outline"}
          onClick={disorderModal.onClose}
        >
          Cancel
        </Button>
        <Button onClick={addDisorder} disabled={loading} type="submit">
          {loading ? <Spinner /> : "Submit"}
        </Button>
      </div>
    </Modal>
  );
};

export default AddDisorderModal;
