# RecyCon

*RecyCon* is a mobile application developed to make recycling more accessible and rewarding. It connects users looking to sell recyclable items with potential buyers, providing features such as real-time pricing, in-app messaging, and location sharing to facilitate transactions efficiently.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)

## Features

- **User Accounts**: Separate accounts for buyers and sellers.
- **Real-Time Pricing**: View current prices for recyclable materials.
- **In-App Messaging**: Chat functionality with location sharing for easy meet-ups.
- **Location-Based Suggestions**: Discover sellers in nearby areas.
- **Item Management**: Sellers can add, delete, and manage items.
- **Sustainability Insight**: Information on recycling tips and environmental impact.

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) (for backend setup)
- [MongoDB](https://www.mongodb.com/) (for database)
- [Expo](https://expo.dev/) CLI (for mobile app development)

### Backend Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/username/recycon.git
    ```
2. Navigate to the server directory:
    ```bash
    cd recycon/server
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Start the backend server:
    ```bash
    node server.js
    ```

### Mobile App Setup
1. Navigate to the mobile app directory:
    ```bash
    cd recycon/mobile
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the app with Expo:
    ```bash
    expo start
    ```

## Usage

1. **Buyers** can browse listed items, view item details, and chat with sellers.
2. **Sellers** can manage their items, set prices, and respond to inquiries.
3. Use real-time pricing and chat to make transactions smooth and transparent.

## Technologies Used

- **Frontend**: React Native with Expo
- **Backend**: Express.js
- **Database**: MongoDB
- **Real-Time Communication**: WebSockets (for in-app chat)
