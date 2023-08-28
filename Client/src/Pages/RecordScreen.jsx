import React, { useEffect, useState } from "react";
import { Button, Container, Text } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const RecordScreen = () => {
  const [screenRecord, setScreenRecord] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [isRecording, setIsRecording] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const token = localStorage.getItem("jwtToken");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!token) {
      navigate("/");
      toast({
        title: "Unauthorised access",
        description: "No Token Provided",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
    const uploadScreenCaptureVideo = async () => {
      if (recordedChunks && recordedChunks.length > 0) {
        const blob = new Blob(recordedChunks, { type: "video/mp4" });
        const formData = new FormData();
        formData.append("screenCaptureVideo", blob);

        try {
          const response = await fetch(
            `http://localhost:8000/api/screencapture/upload/${userId}`,
            {
              method: "POST",
              headers: {
                Authorization: `${token}`,
              },
              body: formData,
            }
          );

          if (response.ok) {
            toast({
              title: "Video Uploaded to Cloudinary",
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "top-right",
            });
          } else {
            toast({
              title: "Error Uploading Video",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top-right",
            });
          }
        } catch (error) {
          console.log("Error uploading video:", error);
          toast({
            title: "Error Uploading Video",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top-right",
          });
        }
      }
    };
    uploadScreenCaptureVideo();
  }, [navigate, token, toast, recordedChunks, userId, screenRecord]);

  const startRecording = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });
      setScreenRecord(screenStream);

      const recorder = new MediaRecorder(screenStream);
      setMediaRecorder(recorder);

      const chunks = [];
      recorder.ondataavailable = (e) => e.data.size > 0 && chunks.push(e.data);
      recorder.onstop = () => setRecordedChunks(chunks);

      recorder.start();
      setIsRecording(true);
      toast({
        title: "Recording started",
        status: "info",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      console.error("Error starting screen recording:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
      toast({
        title: "Recording Stopped",
        status: "info",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const downloadRecording = () => {
    if (recordedChunks.length > 0) {
      const blob = new Blob(recordedChunks, { type: "video/mp4" });
      const videoUrl = URL.createObjectURL(blob);

      const currentDate = new Date().toISOString().split("T")[0];
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const currentTime = `${hours}:${minutes}`;
      const fileName = `${currentDate}_${currentTime}_screenRecord.mp4`;

      const a = document.createElement("a");
      a.href = videoUrl;
      a.download = fileName;
      a.style.display = "none";

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      window.URL.revokeObjectURL(videoUrl);
      toast({
        title: "Download Started",
        description: fileName,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <div style={{ paddingTop: "50px" }}>
      <Container>
        {screenRecord ? (
          <>
            <Button onClick={isRecording ? stopRecording : startRecording}>
              {isRecording ? "Stop Screen Recording" : "Start Screen Recording"}
            </Button>
            {recordedChunks.length > 0 && (
              <Button onClick={downloadRecording}>Download Recording</Button>
            )}
          </>
        ) : (
          <>
            <Text>Please grant permission for Screen Recording</Text>
            <Button onClick={isRecording ? stopRecording : startRecording}>
              {isRecording ? "Stop Screen Recording" : "Start Screen Recording"}
            </Button>
          </>
        )}
      </Container>
    </div>
  );
};

export default RecordScreen;
