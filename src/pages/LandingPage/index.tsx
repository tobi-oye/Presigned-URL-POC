import React, { useCallback, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { StageFileType, generateURL, stageFile } from "../../api";
import { Button, ButtonGroup, Center } from "@chakra-ui/react";

export const LandingPage = () => {
  // Access the client
  const queryClient = useQueryClient();

  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
    pointer: "cursor",
  };

  const focusedStyle = {
    borderColor: "#2196f3",
  };

  const acceptStyle = {
    borderColor: "#00e676",
  };

  const rejectStyle = {
    borderColor: "#ff1744",
  };

  const [file, setFile] = useState<string | ArrayBuffer | null>("");

  // Queries
  const query = useQuery({ queryKey: ["generateURL"], queryFn: generateURL });
  const { isError, isLoading, data } = query;

  console.log(data, "i am herer");

  const imageUploadMutation = useMutation({
    mutationFn: (file: string) => {
      const imageUploadData: StageFileType = {
        url: data.url,
        headerAPIKey: data.key,
        imageData: file,
      };
      return stageFile(imageUploadData);
    },
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        setFile(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ onDrop, accept: { "image/*": [] } });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const uploadHandler = () => {
    imageUploadMutation.mutate(file as string);
  };
  return (
    <>
      <div className="container">
        <div {...getRootProps({ style } as any)}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
      </div>

      <br />

      <Center>
        <Button
          colorScheme="blue"
          isLoading={imageUploadMutation.isPending}
          onClick={uploadHandler}
        >
          Upload
        </Button>
      </Center>
    </>
  );
};
