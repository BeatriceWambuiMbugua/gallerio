// import React, { useState } from 'react';
"use client";
import imageData from "@/constants/Imagedata";
import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BsHash } from "react-icons/bs";

// Define the draggable image component
const DraggableImage = ({ image, index, moveImage }) => {
  const [, dragRef] = useDrag({
    type: "IMAGE",
    item: { id: image.id, index },
  });

  const [, dropRef] = useDrop({
    accept: "IMAGE",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveImage(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => {
        dragRef(dropRef(node));
      }}
      className="grid"
      // Add mobile touch event handlers
      onTouchStart={() => {
        dragRef(dropRef());
      }}
    >
      <img
        className="h-auto max-w-full md:rounded-lg"
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
  const [searchQuery, setSearchQuery] = useState("");

  // Function to re-order images after drag and drop
  const moveImage = (fromIndex, toIndex) => {
    const updatedImages = [...images];
    const [movedImage] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, movedImage);
    setImages(updatedImages);
  };

  // Function to filter images based on the search query and tags
  const filteredImages = images.filter((image) => {
    // Check if the search query is empty or if any tag matches the query
    return (
      searchQuery === "" ||
      image.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto py-10">
        <form className="md:flex items-center  justify-center p-2 mb-4">
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full lg:w-[500px] ">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <BsHash className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type="text"
              id="simple-search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:outline-none focus:ring-gray-500 focus:border-gray-600 block w-full pl-10 p-2.5"
              placeholder="Search by Tag..."
              required
            />
          </div>
        </form>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
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
