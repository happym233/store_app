import { UploadFile } from "@mui/icons-material";
import {
  FormControl,
  FormHelperText,
  Typography,
  useControlled,
} from "@mui/material";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UseControllerProps, useController } from "react-hook-form";

interface Props extends UseControllerProps {}

export default function AppDropzone(props: Props) {
  const { fieldState, field } = useController({ ...props, defaultValue: null });

  const dzStyles = {
    display: "flex",
    border: "dashed 3px #eee",
    borderColor: "#eee",
    borderRadius: "5px",
    paddingTop: "30px",
    alignItems: "center",
    height: 150,
    width: 300,
  };

  const dzActive = {
    borderColor: "green",
  };

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      acceptedFiles[0] = Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      });
      field.onChange(acceptedFiles[0]);
    },
    [field]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <FormControl
        style={isDragActive ? { ...dzStyles, ...dzActive } : dzStyles}
      >
        <input {...getInputProps()} />
        <UploadFile sx={{ fontSize: "60px", color: "lightgray" }} />
        <Typography variant="h6" sx={{ color: "darkgray" }}>
          Drop image here...
        </Typography>
        <FormHelperText sx={{ color: "#d32f2f" }}>
          {fieldState.error?.message}
        </FormHelperText>
      </FormControl>
    </div>
  );
}
