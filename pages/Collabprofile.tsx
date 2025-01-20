import React, { useState } from 'react';

const Collabprofile: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const images = [
    'image1.jpg',
    'image2.jpg',
    'image3.jpg',
    'image4.jpg',
    'image5.jpg',
  ];

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <div className="bg-slate-300 min-h-[720px] flex justify-center items-center">
      {/* Image Selection Bar */}
      <div className="flex justify-center space-x-4">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Collab Image ${index + 1}`}
            className="w-16 h-16 cursor-pointer rounded-lg hover:opacity-80"
            onClick={() => handleImageClick(image)}
          />
        ))}
      </div>

      {/* Display the selected image */}
      <div className="pt-6">
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Selected Collab"
            className="w-full h-full object-cover"
          />
        )}
        {!selectedImage && (
          <p className="text-gray-500 text-center">Select an image to view more details.</p>
        )}
      </div>
    </div>
  );
};
export default Collabprofile;

