import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";

interface Props {
  items: string[];
  checked: string[];
  onChange: (items: string[]) => void;
}

export default function CheckboxButtons({ items, checked, onChange }: Props) {
  const [checkedItem, setCheckItems] = useState(checked || []);

  function handledChecked(value: string) {
    const currentIndex = checkedItem.findIndex((item) => item === value);
    let newChecked: string[] = [];
    if (currentIndex === -1) newChecked = [...checkedItem, value];
    else newChecked = checkedItem.filter((item) => item !== value);
    setCheckItems(newChecked);
    onChange(newChecked);
  }

  return (
    <FormGroup>
      {items.map((item) => (
        <FormControlLabel
          control={<Checkbox checked={checkedItem.indexOf(item) !== -1} />}
          onClick={() => handledChecked(item)}
          label={item}
          key={item}
        />
      ))}
    </FormGroup>
  );
}
