# Pathfinding Visualizer

## Overview
This Pathfinding Visualizer is an interactive web tool that allows users to visualize various pathfinding algorithms in action. It is designed to demonstrate how different algorithms navigate between points on a map, highlighting the routes they take in real time.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Features
- **Interactive Map**: Users can set start and end points by clicking on the map.
- **Algorithm Selection**: Still working on it
- **Real-Time Visualization**: Watch the pathfinding process unfold in real-time with distinct visualization for open set, closed set, and final path.
- **Dark Theme**: A sleek, dark theme that reduces glare and makes path visualization stand out.

## Technologies Used
- **React**: For building the user interface.
- **Leaflet**: As the mapping library to display and interact with geographical data.
- **Farmer Motion**: For animation in web app.
- **ldrs**: For Loading Screen.

## Installation
To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/patel-bhumit/PathFinding_Visualizer.git
   ```
2. Navigate to the project directory:
   ```bash
   cd pathfinding-visualizer
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## Usage
Once the application is running, follow these steps to use the visualizer:
1. Click on the map to set the starting point (it will turn green once set).
2. Click on a different location to set the destination point (it will turn red initially, and turn green when successfully set).
3. Select the pathfinding algorithm you wish to visualize from the dropdown menu.
4. Click the "Run" button to start the visualization.

## Contributing
Contributions to the Pathfinding Visualizer are welcome. Please feel free to fork the repository, make changes, and submit pull requests. You can also open issues to suggest improvements or report bugs.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- Inspiration
    - **https://pathfinding.kelvinzhang.ca/**
    - **https://honzaap.github.io/Pathfinding/**
- for loading screen **https://uiball.com/ldrs/**
