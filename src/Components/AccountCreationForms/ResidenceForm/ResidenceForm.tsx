import React from "react";
import FormWrapper from "../FormWrapper/FormWrapper";
import {
  allCitizenStatus,
  allCountries,
  allStates,
} from "../../../Data/ResidenceData";
import "./ResidenceForm.css";
import Select from "react-select";

const countryOptions = allCountries.map((country) => ({
  value: country,
  label: country,
}));

const stateOptions = allStates.map((state) => ({
  value: state,
  label: state,
}));

const citizenshipOptions = allCitizenStatus.map((status) => ({
  value: status,
  label: status,
}));

type OptionType = {
  value: string;
  label: string;
};

type ResidenceData = {
  countryOfTaxResidence: string;
  stateOfResidence: string;
  citizenshipStatus: string;
};

type ResidenceFormProps = ResidenceData & {
  updateFields: (fields: Partial<ResidenceData>) => void;
  error: string;
};

const customSelectStyles = {
  control: (provided: any) => ({
    ...provided,
    border: "1px solid #8F8F8F",
    borderRadius: "3px",
    padding: "0", // Adjust the padding to match your inputs
    minHeight: "24px", // Adjust the height to match your inputs
    boxShadow: "none",
    "&:hover": { borderColor: "#8F8F8F" },
  }),
  input: (provided: any) => ({
    ...provided,
  }),
  placeholder: (provided: any) => ({
    ...provided,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: ".75rem",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: ".75rem",
  }),
  option: (provided: any) => ({
    ...provided,
    fontSize: ".75rem",
  }),
};

export default function ResidenceForm({
  countryOfTaxResidence,
  stateOfResidence,
  citizenshipStatus,
  updateFields,
  error,
}: ResidenceFormProps) {
  const handleSelectChange = (
    selectedOption: OptionType | null,
    field: keyof ResidenceData
  ) => {
    if (selectedOption) {
      updateFields({ [field]: selectedOption.value });
    }
  };

  return (
    <FormWrapper title="Sign up">
      <div className="custom-select">
        <Select
          required
          value={countryOptions.find(
            (option) => option.value === countryOfTaxResidence
          )}
          onChange={(selectedOption) =>
            handleSelectChange(selectedOption, "countryOfTaxResidence")
          }
          options={countryOptions}
          placeholder="Country of Residence"
          className="react-select-container"
          classNamePrefix="react-select"
          styles={customSelectStyles}
        />
        <br />
        <Select
          required
          value={stateOptions.find(
            (option) => option.value === stateOfResidence
          )}
          onChange={(selectedOption) =>
            handleSelectChange(selectedOption, "stateOfResidence")
          }
          options={stateOptions}
          placeholder="State of Residence"
          className="react-select-container"
          classNamePrefix="react-select"
          styles={customSelectStyles}
        />
        <br />
        <Select
          required
          value={citizenshipOptions.find(
            (option) => option.value === citizenshipStatus
          )}
          onChange={(selectedOption) =>
            handleSelectChange(selectedOption, "citizenshipStatus")
          }
          options={citizenshipOptions}
          placeholder="Citizenship Status"
          className="react-select-container"
          classNamePrefix="react-select"
          styles={customSelectStyles}
        />
      </div>
    </FormWrapper>
  );
}
