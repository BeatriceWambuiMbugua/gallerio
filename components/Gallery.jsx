// import React, { useState } from 'react';
"use client";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import imageData from "@/constants/Imagedata";
import { useState } from "react";

// Define the draggable image component
const DraggableImage = ({ image, index, moveImage }) => {
  const [, ref] = useDrag({
    type: "IMAGE",
    item: { id: image.id, index },
  });

  const [, drop] = useDrop({
    accept: "IMAGE",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveImage(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))} className="grid">
      <img
        className="h-auto max-w-full rounded-lg"
        src={image.url}
        alt={`Image ${image.id}`}
      />
      <div className="flex gap-1 pt-2">
        {image.tags.map((tag) => (
          <span
            key={tag}
            className="bg-gray-200 py-2 px-3 rounded-lg capitalize hover:subpixel-antialiased tracking-wide hover:cursor-pointer"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default function Gallery() {
  const [images, setImages] = useState(imageData);

  // Function to re-order images after drag and drop
  const moveImage = (fromIndex, toIndex) => {
    const updatedImages = [...images];
    const [movedImage] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, movedImage);
    setImages(updatedImages);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <DraggableImage
              key={image.id}
              image={image}
              index={index}
              moveImage={moveImage}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
}
