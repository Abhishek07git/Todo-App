# React + Vite + Tailwind CSS

Installing Tailwind CSS as a Vite plugin is the most seamless way to integrate it with frameworks like Laravel, SvelteKit, React Router, Nuxt, and SolidJS.

01
Create your project
Start by creating a new Vite project if you don’t have one set up already. The most common approach is to use Create Vite.

Terminal
npm create vite@latest my-project
cd my-project

02
Install Tailwind CSS
Install tailwindcss and @tailwindcss/vite via npm.

Terminal
npm install tailwindcss @tailwindcss/vite

03
Configure the Vite plugin
Add the @tailwindcss/vite plugin to your Vite configuration.

vite.config.ts
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})

04
Import Tailwind CSS
Add an @import to your CSS file that imports Tailwind CSS.

CSS
@import "tailwindcss";

05
Start your build process
Run your build process with npm run dev or whatever command is configured in your package.json file.

Terminal
npm run dev
