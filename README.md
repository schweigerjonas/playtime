# Playtime

Playtime is a web application built with the [Hapi](https://hapi.dev/) framework that allows users to register, log in, and manage their music playlists.

## Features

- **User Authentication**: Secure registration and login using JSON Web Tokens (JWT).
- **Playlist Management**: Users can create new playlists, add tracks, and assign a cover image to each playlist.
- **Persistence**: Stores user, playlist, and track data using [MongoDB](https://www.mongodb.com/).
- **API**: A REST API for CRUD operations on _users_, _playlists_ and _tracks_.
- **Testing**: Includes test suite to ensure application reliability.
- **API Documentation**: Integrated [Swagger](https://swagger.io/)/OpenAPI documentation for easy API exploration and consumption.
- **Deployment**: Fully deployed and accessible online.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (LTS version recommended)
- MongoDB instance (local or hosted)

### Installation

Clone the repository:

```bash
git clone git@github.com:schweigerjonas/playtime.git
cd playtime
```

Install dependencies:

```bash
npm install
```

Configure Environment Variables:

Create a file named .env in the root directory and add your configuration variables. At a minimum, you'll need:

```bash
# Cookie credentials
COOKIE_NAME=playtime
COOKIE_PASSWORD=YOUR_PERSONAL_PASSWORD_HERE

# MongoDB connection string
DB=mongodb://localhost/playtime

# Cloudinary credentials
CLOUDINARY_NAME=YOUR_CLOUDINARY_NAME
CLOUDINARY_API_KEY=YOUR_CLOUDINARY_API_KEY
CLOUDINARY_SECRET=YOUR_CLOUDINARY_SECRET

# Other variables (e.g., PORT)
# ...

```

### Run the Application

To run in development mode (with monitoring/reloading):

```bash
npm run dev
```

To run in production/standard mode:

```bash
npm start
```

The server will typically start on <http://YOUR_HOSTNAME:3000> (or the port specified in your configuration).

## Testing

The project includes a test suite to cover the API endpoints, database interactions, and authentication logic.

To run the full test suite:

```bash
npm test
```

## API Documentation

Once the application is running, the interactive API documentation is available via Swagger:

Access the documentation at:

> <http://YOUR_HOSTNAME:3000/documentation> (adjust port if necessary).

This documentation provides details on all available endpoints, required parameters, and response schemas.

## Deployment

The application is deployed and live at:

> <https://playtime-r37p.onrender.com/>

_Note: It may take 1-2 minutes until the instance is spun up upon first visiting the website._
