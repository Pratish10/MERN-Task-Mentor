import { Button, Container, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const RecordVideo = () => {
  const [webcamAudio, setWebcamAudio] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState(null);
  const videoRef = useRef(null);

  const toast = useToast();
  const token = localStorage.getItem("jwtToken");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = webcamAudio;
      videoRef.current.play();
    }
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
    const uploadRecordedVideo = async () => {
      if (recordedChunks && recordedChunks.length > 0) {
        const blob = new Blob(recordedChunks, { type: "video/mp4" });
        const formData = new FormData();
        formData.append("webCamVideo", blob);

        try {
          const response = await fetch(
            `https://mern-task-mentor.onrender.com/api/webcam/upload/${userId}`,
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

    uploadRecordedVideo();
  }, [navigate, token, webcamAudio, toast, recordedChunks, userId]);

  const startRecording = () => {
    if (webcamAudio) {
      const recorder = new MediaRecorder(webcamAudio);
      setMediaRecorder(recorder);
      const chunks = [];

      recorder.ondataavailable = (e) => e.data.size > 0 && chunks.push(e.data);
      recorder.onstop = () => setRecordedChunks(chunks);

      recorder.start();
      toast({
        title: "Recording started",
        status: "info",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const stopRecording = async () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
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
      const fileName = `${currentDate}_${hours}:${minutes}_webcamRecord.mp4`;

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

  const requestPermission = async () => {
    try {
      const webcamAudioStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setWebcamAudio(webcamAudioStream);
    } catch (error) {
      console.log("Error accessing webcam:", error);
    }
  };

  const isRecording = mediaRecorder && mediaRecorder.state === "recording";

  return (
    <div style={{ paddingTop: "50px" }}>
      <Container>
        {isRecording && (
          <h3 style={{ color: "red", textAlign: "center" }}>Recording...</h3>
        )}
        <br />
        {webcamAudio ? (
          <React.Fragment>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{
                width: "100%",
                height: "100%",
              }}
            ></video>
            <br />
            <div>
              <Button onClick={isRecording ? stopRecording : startRecording}>
                {isRecording ? "Stop Recording" : "Start Recording"}
              </Button>
              <Button onClick={downloadRecording}>Download Your Video</Button>
            </div>
          </React.Fragment>
        ) : (
          <>
            <Text>Please grant permission for Webcam and audio</Text>
            <Button onClick={requestPermission}>Request Permission</Button>
          </>
        )}
        <br />
      </Container>
    </div>
  );
};

export default RecordVideo;
