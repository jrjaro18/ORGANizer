import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import MenuItem from "@mui/material/MenuItem";
import LocationSearchInput from "../map/LocationSearch";
import MyMap from "../map/Map";
import { toast } from "react-toastify";
import APIRequests from "../../api";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

const organs = ["Heart", "Lungs", "Liver", "Kidney", "Eyes"];
const tissues = ["Skin", "Bone", "Bone Marrow", "Cornea", "Heart Valves"];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const DonForm = () => {
  const [organ, setOrgan] = React.useState([]);
  const [tissue, setTissue] = React.useState([]);
  const [witnesses, setWitnesses] = useState([
    { name: "", phone: "", email: "" },
  ]);

  const handleOrganChange = (event) => {
    const {
      target: { value },
    } = event;
    setOrgan(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleTissueChange = (event) => {
    const {
      target: { value },
    } = event;
    setTissue(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleWitnessChange = (index, event) => {
    const newWitnesses = [...witnesses];
    const {
      target: { name, value },
    } = event;
    newWitnesses[index][name] = value;
    setWitnesses(newWitnesses);
  };

  const addWitness = () => {
    setWitnesses([...witnesses, { name: "", phone: "", email: "" }]);
  };

  const removeWitness = (index) => {
    const newWitnesses = [...witnesses];
    newWitnesses.splice(index, 1);
    setWitnesses(newWitnesses);
  };

  const [registrationDetails, setRegistrationDetails] = useState({
    type: "donor",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    phone: "",
    blood_group: "",
    age: "",
    weight: "",
    height: "",
    health_history: "",
    organ: [],
    tissue: [],
    witnesses: witnesses,
    availability: true,
    aadhar_card: "",
  });

  useEffect(
    () => {
      setRegistrationDetails({
        ...registrationDetails,
        organ: organ,
        tissue: tissue,
      });
    },
    [organ],
    [tissue]
  );

  const bGroup = [
    {
      value: "A+",
      label: "A+",
    },
    {
      value: "A-",
      label: "A-",
    },
    {
      value: "B+",
      label: "B+",
    },
    {
      value: "B-",
      label: "B-",
    },
    {
      value: "AB+",
      label: "AB+",
    },
    {
      value: "AB-",
      label: "AB-",
    },
    {
      value: "O+",
      label: "O+",
    },
    {
      value: "O-",
      label: "O-",
    },
  ];

  const handleGenderChange = (e) => {
    setRegistrationDetails({ ...registrationDetails, gender: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (registrationDetails.password !== registrationDetails.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    // Prepare the data to send to the API

    try {
      console.log(registrationDetails);
      const response = await APIRequests.signUp(registrationDetails);

      if (response.status === 200) {
        toast.success("Registration successful");
      } else {
        toast.error("Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred");
    }
  };

  return (
    <div className="w-full h-screen">
      <form
        className="flex items-center justify-center flex-wrap gap-4 content-start w-full h-full"
        onSubmit={handleSubmit}
      >
        <TextField
          label="Name"
          variant="outlined"
          value={registrationDetails.name}
          onChange={(e) =>
            setRegistrationDetails({
              ...registrationDetails,
              name: e.target.value,
            })
          }
        />
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          value={registrationDetails.email}
          onChange={(e) =>
            setRegistrationDetails({
              ...registrationDetails,
              email: e.target.value,
            })
          }
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={registrationDetails.password}
          onChange={(e) =>
            setRegistrationDetails({
              ...registrationDetails,
              password: e.target.value,
            })
          }
        />
        <TextField
          label="Confirm Password"
          variant="outlined"
          type="password"
          value={registrationDetails.confirmPassword}
          onChange={(e) =>
            setRegistrationDetails({
              ...registrationDetails,
              confirmPassword: e.target.value,
            })
          }
        />
        <TextField
          label="Phone"
          type="number"
          variant="outlined"
          value={registrationDetails.phone}
          onChange={(e) =>
            setRegistrationDetails({
              ...registrationDetails,
              phone: e.target.value,
            })
          }
        />
        <TextField
          label="Aadhaar Number"
          type="number"
          variant="outlined"
          value={registrationDetails.aadhar_card}
          onChange={(e) =>
            setRegistrationDetails({
              ...registrationDetails,
              aadhar_card: e.target.value,
            })
          }
        />
        <TextField
          label="Blood Group"
          select
          sx={{ width: "150px" }}
          value={registrationDetails.blood_group}
          onChange={(e) =>
            setRegistrationDetails({
              ...registrationDetails,
              blood_group: e.target.value,
            })
          }
          variant="outlined"
        >
          {bGroup.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Age"
          type="number"
          sx={{ width: "100px" }}
          variant="outlined"
          value={registrationDetails.age}
          onChange={(e) =>
            setRegistrationDetails({
              ...registrationDetails,
              age: e.target.value,
            })
          }
        />
        <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={registrationDetails.gender}
          onChange={handleGenderChange}
        >
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
        <TextField
          label="Weight (kg)"
          type="number"
          variant="outlined"
          value={registrationDetails.weight}
          onChange={(e) =>
            setRegistrationDetails({
              ...registrationDetails,
              weight: e.target.value,
            })
          }
        />
        <TextField
          label="Height (cm)"
          type="number"
          variant="outlined"
          value={registrationDetails.height}
          onChange={(e) =>
            setRegistrationDetails({
              ...registrationDetails,
              height: e.target.value,
            })
          }
        />
        <Select
          sx={{ width: "235px" }}
          multiple
          displayEmpty
          value={organ}
          onChange={handleOrganChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Organ</em>;
            }

            return selected.join(", ");
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem disabled value="">
            <em>Placeholder</em>
          </MenuItem>
          {organs.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
        <Select
          sx={{ width: "235px" }}
          multiple
          displayEmpty
          value={tissue}
          onChange={handleTissueChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Tissue</em>;
            }

            return selected.join(", ");
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem disabled value="">
            <em>Placeholder</em>
          </MenuItem>
          {tissues.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
        <div className="gap-4">
          {witnesses.map((witness, index) => (
            <div key={index} className="flex gap-4">
              <TextField
                label={`Witness #${index + 1} Name`}
                variant="outlined"
                name="name"
                value={witness.name}
                onChange={(e) => handleWitnessChange(index, e)}
              />
              <TextField
                label={`Witness #${index + 1} Phone`}
                variant="outlined"
                name="phone"
                value={witness.phone}
                onChange={(e) => handleWitnessChange(index, e)}
              />
              <TextField
                label={`Witness #${index + 1} Email`}
                variant="outlined"
                name="email"
                value={witness.email}
                onChange={(e) => handleWitnessChange(index, e)}
              />
              <Button
                className="h-12"
                variant="outlined"
                size="small"
                color="error"
                onClick={() => removeWitness(index)}
              >
                Remove Witness
              </Button>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <Button
            className="h-12"
            variant="outlined"
            size="small"
            onClick={addWitness}
          >
            Add Witnesses
          </Button>
        </div>

        <TextField
          id="outlined-multiline-static"
          label="Any Past Medical Records"
          multiline
          minRows={1}
          maxRows={4}
          sx={{ width: "100%" }}
          value={registrationDetails.health_history}
          onChange={(e) =>
            setRegistrationDetails({
              ...registrationDetails,
              health_history: e.target.value,
            })
          }
        />

        <input
          className="p-2.5 w-24 bg-red text-white rounded-xl cursor-pointer hover:bg-sub-dark "
          type="submit"
          value="Register"
        />
      </form>
    </div>
  );
};

export default DonForm;
