import React, { useState, useRef } from 'react';
import axios from 'axios';

interface CameraModalProps {
  onClose: () => void;
  userId: string;
  onAddItem: (item: string) => void;
}

const CameraModal: React.FC<CameraModalProps> = ({ onClose, userId, onAddItem }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error('Error accessing webcam:', error);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        setImageSrc(canvas.toDataURL('image/jpeg'));

        // Stop the webcam
        stopWebcam();
      }
    }
  };

  const handleUpload = async () => {
    if (imageSrc && !isSubmitting) {
      try {
        setIsSubmitting(true); 
        const formData = new FormData();
        formData.append('file', dataURLtoFile(imageSrc, 'webcam.jpg'));
        formData.append('prompt', 'Analyze the food in the image and return a JSON object with the name of the item. If there are multiple food items include all of them in a single name. I.e Burger, fries');
        formData.append('userId', userId);
  
        const response = await axios.post('http://localhost:5000/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        let description = response.data.description;
        console.log(description);
        description = description.replace(/```json|```/g, '').trim();
        const parsedResponse = JSON.parse(description);
  
        const itemName = parsedResponse.name || 'Unknown Item';
  
        await onAddItem(itemName);
  
        onClose(); 
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Failed to add item.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const dataURLtoFile = (dataUrl: string, filename: string) => {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/);
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime ? mime[1] : 'application/octet-stream' });
  };

  const stopWebcam = () => {
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg flex flex-col items-center">
        <h2 className="text-lg font-semibold mb-4">Camera Modal</h2>
        {imageSrc ? (
          <img src={imageSrc} alt="Captured" className="w-full h-auto" />
        ) : (
          <video ref={videoRef} width="640" height="480" autoPlay />
        )}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
        <div className="mt-4">
          {!imageSrc && (
            <>
              <button onClick={startWebcam} className="px-4 py-2 bg-blue-500 text-white rounded mr-2">
                Start Webcam
              </button>
              <button onClick={captureImage} className="px-4 py-2 bg-green-500 text-white rounded mr-2">
                Capture Image
              </button>
            </>
          )}
          {imageSrc && (
            <button onClick={handleUpload} disabled={isSubmitting} className="px-4 py-2 bg-purple-500 text-white rounded">
              {isSubmitting ? 'Uploading...' : 'Upload'}
            </button>
          )}
        </div>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default CameraModal;
