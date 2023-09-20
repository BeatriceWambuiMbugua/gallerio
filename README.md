## Gallerio

Gallerio is a web application that allows users to view a gallery of images. The application is built using Next.js, a popular React framework, and Tailwind CSS for styling. It also uses the <mark>react-dnd</mark> library for drag and drop functionality.
### Features

- User authentication
- Image gallery with drag and drop functionality
- Dark mode support
### Installation

To install the application, you need to have Node.js and npm installed on your machine. Then, you can clone the repository and install the dependencies:

```
git clone https://github.com/your-repo/gallerio.git
cd gallerio
npm install
```

### Running the Application

You can start the application in development mode with:

```
npm run dev
```
And build the application for production with:

```
npm run build
```
Then, you can start the application in production mode with:

```
npm run start
```

### Code Structure

The main parts of the application are:

* package.json: This file contains the list of project dependencies and scripts.
* app/: This directory contains the main application code.
* components/: This directory contains the React components used in the application.
* constants/: This directory contains the image data used in the gallery.
* public/: This directory contains the public assets like images 

### User Authentication

User authentication is handled using NextAuth.js. The application uses a custom credentials provider for authentication. The logic for this can be found in:

```javascript

import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
if(!process.env.NEXTAUTH_SECRET){
  throw new Error("please provide process.env.NEXTAUTH_SECRET environment variable");
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // [credentials](file:///Users/beatricewambui/Documents/HNGProjects/gallerio/app/api/auth/%5B...nextauth%5D/route.js#2%2C54-2%2C54) is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the [credentials](file:///Users/beatricewambui/Documents/HNGProjects/gallerio/app/api/auth/%5B...nextauth%5D/route.js#2%2C54-2%2C54) object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your Email",
        }, // You can customize this label to 'Email'
        password: { label: "Password", type: "password" }, // You can customize this label to 'Password'
      },
      authorize: async (credentials) => {
        // Add your own authentication logic here
        if (
          credentials.email === "user@example.com" &&
          credentials.password === "1Password"
        ) {
          // If credentials are valid, return the user object
          return Promise.resolve({ email: credentials.email });
        } else {
          // If credentials are invalid, return null
          return Promise.resolve(null);
        }
      },
    }),
  ],
session:{
  strategy: "jwt",
}

});

export { handler as GET, handler as POST };


```
### Image Gallery

The image gallery is implemented using the react-dnd library for drag and drop functionality. The logic for this can be found in:

```javascript
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
 ...

```

### Styling

The application uses Tailwind CSS for styling. The global styles can be found in:

```javascript
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

html,
body,
:root {
  color-scheme: light;
  scroll-behavior: smooth;
  background-color: #f0f0f0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #171717;
}

```
The Tailwind configuration can be found in:
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
     
    },
  },
  plugins: [],
}
```
### Contributing

Contributions are welcome. Please make sure to update tests as appropriate.