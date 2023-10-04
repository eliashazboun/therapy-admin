"use client";
import React, { useEffect, useState } from "react";
import AutoComplete, {
  AutocompleteCloseReason,
} from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Control, Controller } from "react-hook-form";

interface MedicineAutocompleteProps {
  setDosages: React.Dispatch<
    React.SetStateAction<string[][] | string[] | string>
  >;
  control: Control<any>;
}

const MedicineAutocomplete: React.FC<MedicineAutocompleteProps> = ({
  setDosages,
  control
}) => {
  const [medicationSuggestions, setMedicationSuggestions] = useState([]);
  const [medicationDosages, setMedicationDosages] = useState<
    string[][] | string[] | string
  >([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setMedicationSuggestions([]);
    try {
      setLoading(true);
      const res = await axios.get(
        `https://clinicaltables.nlm.nih.gov/api/rxterms/v3/search?ef=STRENGTHS_AND_FORMS&terms=${inputValue}`
      );
      setMedicationSuggestions(res.data[1]);
      setMedicationDosages(res.data[2].STRENGTHS_AND_FORMS);
      console.log(res);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inputValue.length === 1) {
      fetchData();
      return;
    }
    const timer = setTimeout(() => {
      fetchData();
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue]);

  return (
      <Controller
        name="drugName"
        control={control}
        rules={{
          required: "Required"
        }}
        
        render={({ field, fieldState }) => (
          <AutoComplete
            {...field}
            disablePortal
            id="tags-standard"
            
            options={medicationSuggestions}
            isOptionEqualToValue={(option: any, value) =>
              option.value === value.value
            }
            onChange={(event, newValue) => field.onChange(newValue)}
            loading={loading}
            inputValue={inputValue}
            onInputChange={(event, newInputValue, reason) => {
              setInputValue(newInputValue);
              if (reason === "clear") {
                console.log("clear");
                setDosages([]);
              }
            }}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option}>
                  {option}
                </li>
              );
            }}
            onClose={(event: React.SyntheticEvent, reason) => {
              if (reason === "selectOption") {
                const idx = medicationSuggestions.findIndex(
                  (item) => item === event.currentTarget.innerHTML
                );
                console.log("DOSAGES", medicationDosages, idx);
                setDosages(medicationDosages[idx]);
                setMedicationDosages(medicationDosages[idx]);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                error={!!fieldState.error}
                key={params.inputProps.id}
                variant="standard"
                placeholder="Medication"
              />
            )}
          />
        )}
       
        
      />
  );
};

export default MedicineAutocomplete;
