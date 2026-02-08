# AnangAI - Kingston City Guide

An intelligent AI-powered city guide for Kingston, Ontario that helps visitors and locals discover sustainable restaurants, accessible attractions, and local events through natural language conversation.

![AnangAI](frontendimages/ANANG_logo.png)

## 🌟 Features

- **AI-Powered Chat Interface**: Ask questions in natural language about restaurants, places, and events
- **RAG (Retrieval Augmented Generation)**: Intelligent search across local data files with context-aware responses
- **Multilingual Support**: Full English and French support with language toggle
- **Sustainable Tourism**: Highlights Green Plate-certified restaurants (Gold, Silver, Bronze)
- **Accessibility Information**: Displays accessibility and washroom information for all places
- **Dynamic Discovery Page**: Browse all categories with beautiful, responsive cards
- **Smart Query Processing**: Handles vague queries, specific searches, date filtering, and location-based queries
- **Get Featured Program**: Local businesses can submit applications to be featured

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation
- **Lucide React** - Icons

### Backend
- **FastAPI** - Python web framework
- **OpenRouter API** - LLM provider (GPT-4o-mini)
- **Uvicorn** - ASGI server
- **httpx** - HTTP client

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **Python** (v3.8 or higher) - [Download](https://www.python.org/downloads/)
- **npm** or **yarn** - Comes with Node.js
- **OpenRouter API Key** - [Get one here](https://openrouter.ai/keys)

## 🚀 Installation

### 1. Clone the Repository

git clone <repository-url>
cd KingstonAssist### 2. Install Frontend Dependencies

npm install### 3. Install Backend Dependencies

cd backend
pip install -r requirements.txt### 4. Set Up Environment Variables

Create a `.env` file in the `backend` directory:
h
cd backend
touch .env
Add your OpenRouter API key:

OPENROUTER_API_KEY=your_api_key_here**Note**: You can get your API key from [OpenRouter](https://openrouter.ai/keys). If you don't set this, the code will use a fallback key (for development only).

### 5. Verify Data Files

Ensure you have the following directory structure with data files:

### Start the Backend Server

Open a terminal and navigate to the backend directory:

cd backend
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload

**Windows (PowerShell):**
.\run.ps1**Windows (Command Prompt):**
run.batThe backend will be available at `http://localhost:8000`

### Start the Frontend Development Server

Open a **new terminal** and run:
h
npm run dev
The frontend will be available at `http://localhost:5173`
