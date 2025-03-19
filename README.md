# CatchGPT - AI Detection System

CatchGPT is a tool designed to generate PDF assignments with hidden tracking URLs. These URLs can be used to detect when students are using AI chatbots to complete their assignments.

## How It Works

1. Professors/teachers generate a PDF with an essay assignment
2. Hidden within the PDF (in white text) is a tracking URL
3. When a student copies the assignment into an AI tool, the AI processes the hidden URL
4. The AI tool visits the URL, revealing that the assignment was processed by AI
5. The system logs the visit with details including timestamp, user agent, and IP address

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd CatchGPT
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with your server URL:
```
NEXT_PUBLIC_SERVER_URL=http://your-domain.com
```
If not provided, it will default to `http://localhost:3000`.

### Running the Application

```bash
npm run dev
```

The application will be available at http://localhost:3000.

## Running with Docker

### Prerequisites

- Docker and Docker Compose installed on your system

### Using Docker Compose (Recommended)

1. Clone the repository:
```bash
git clone [your-repository-url]
cd CatchGPT
```

2. Build and start the container:
```bash
docker-compose up -d
```

The application will be available at http://localhost:3000. All tracking data is stored in a SQLite database that persists between container restarts thanks to a Docker volume.

3. To stop the container:
```bash
docker-compose down
```

### Using Docker Directly

1. Pull the latest image from Docker Hub:
```bash
docker pull zibdie/catchgpt:latest
```

2. Run the container with a volume for the SQLite database:
```bash
docker run -p 3000:3000 -e NEXT_PUBLIC_SERVER_URL=http://localhost:3000 -v catchgpt_data:/app/data -d zibdie/catchgpt
```

The application will be available at http://localhost:3000.

## Data Persistence

This application uses SQLite to store tracking data in the `/app/data` directory. When running with Docker, the data is persisted using a Docker volume named `catchgpt_data`.

## Features

- **PDF Generator**: Create assignment PDFs with hidden tracking URLs
- **Dashboard**: View all tracking records with basic information
- **Detailed Views**: See complete details for each tracking instance
- **Fake Data Generation**: Returns convincing but fake information to AI tools

## Tech Stack

- Next.js (App Router)
- TypeScript
- Material UI
- jsPDF for PDF generation
- FakerJS for generating fake data
- SQLite for data storage

## Notes

This tool is intended for educational purposes to demonstrate how AI detection can work. In a production environment, you would want to:

1. Implement a more robust database solution for larger scales
2. Add authentication to protect the dashboard
3. Set up proper logging and monitoring
4. Consider legal and privacy implications in your jurisdiction
