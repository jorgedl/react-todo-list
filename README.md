# React ToDo List

This is a React-based ToDo List application designed to demonstrate a clean and scalable approach to React component structure using Atomic Design methodology and BEM naming conventions for CSS. The application provides a user-friendly interface for managing daily tasks efficiently.

## Design Methodology

### BEM (Block, Element, Modifier)

I use the BEM methodology for CSS naming to ensure the stylesheets are organized, scalable, and maintainable. This method helps in avoiding collisions in CSS class names and makes the styles easier to read and understand. By separating the styles into blocks, elements, and modifiers, I can quickly identify the relationship and hierarchy of styles, which simplifies debugging and further development.

### Atomic Design

In this project, I have implemented Atomic Design principles to structure the React components. Here's how I've categorized the components:

- **Atoms**: These are small, reusable components like Buttons, Inputs, and Icons. They serve as the foundational building blocks that can be used across the application.
- **Molecules**: These are groups of atoms bonded together and serve as the backbone of the application's functionality, like a ToDo Item with a checkbox, text, and a delete button.
- **Organisms**: These are groups of molecules joined together to form a relatively complex, distinct section of an interface, such as the ToDo List itself, which combines multiple ToDo Item molecules.

This approach helps in managing the complexity of the application as it grows and makes the components more reusable and manageable.

## Technology Stack

### Core Technologies

- **React**: Utilized for building the user interface, leveraging the latest in functional component patterns and state management.
- **TanStack Router**: Chosen for its modern, flexible routing capabilities in React, facilitating the navigation between different views and states of the application.
- **React Hooks**: Extensively used to manage state and side effects in functional components, allowing for cleaner and more reusable code.

### Build and Tooling

- **Vite**: A modern build tool that significantly speeds up the development by leveraging native ES modules. It provides a faster and leaner development experience compared to traditional tools like Webpack.
- **Biome**: Experimented with as a code formatter to evaluate its effectiveness in maintaining code aesthetics, positioned as an alternative to Prettier.

## Project Structure

src/
├─ assets/
│ ├─ icons/
├─ components/
├─ features/
│ ├─ todo-list/
│ │ ├─ components/
├─ hooks/
├─ types/
├─ pages/
└─ routes/

## Getting Started

To get started with this project, clone the repository and install the dependencies:

```bash
git clone https://github.com/jorgedl/react-todo-list.git
cd react-todo-list
yarn install
```

To run the application locally:

```bash
yarn start
```

This will start the development server and open the application in your default web browser.