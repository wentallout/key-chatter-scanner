# Key Chatter Scanner

A precise, browser-based diagnostic tool designed to detect mechanical keyboard chatter (switch bouncing) with microsecond precision.

## Features

- **Diagnostic Map**: An interactive, 103-key visual map that tracks testing progress across your entire keyboard.
- **Microsecond Precision**: Custom threshold settings allow you to finely tune the detection window for double-inputs.
- **Chatter Log & Retest Protocol**: Detected chatter is logged instantly. Once you clean or replace a faulty switch, use the built-in 3-second retest toggle to verify the fix.
- **Modern Architecture**: Built on Svelte 5 with a responsive, atmospheric terminal-style interface using Tailwind CSS v4.

## Getting Started

1. **Install Dependencies**  
   ```sh
   npm install
   ```

2. **Run Development Server**  
   ```sh
   npm run dev
   ```

3. **Build for Production**  
   ```sh
   npm run build
   ```
