# Quiz Application

Welcome to the Quiz Application! This React-based application allows users to take a quiz with multiple-choice, true/false, and text-based questions. It provides a summary of the results with a confetti animation for a fun touch when users perform well.

## Features

- Fetch questions from a local JSON file
- Handle multiple types of questions: multiple-choice, true/false, and text
- Track and display user answers
- Show a summary with correct and wrong answers
- Display confetti animation if users answer 2 or more questions correctly

## Getting Started

Follow these instructions to set up and run the application locally.

### Prerequisites

Make sure you have the following software installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)

### Installation

1. **Clone the repository and run app:**

```bash
git clone https://github.com/yourusername/quiz-app.git
cd quiz-app
```

2. **Install the dependencies:**

```bash
yarn install
```

3. **Add the questions data:**
   Create a questions.json file in the public directory of the project with the following structure:

```bash
{
  "results": [
    {
      "category": "General Knowledge",
      "type": "multiple",
      "difficulty": "easy",
      "question": "What is the capital of France?",
      "correct_answer": "Paris",
      "incorrect_answers": ["London", "Berlin", "Madrid"]
    },
    ...
  ]
}
```

### Running the Application

1. **Start the development server:**

```bash
yarn run dev
```

This will start the development server and open the application in your default web browser. The app will be accessible at http://localhost:3000.

2. **Build for production:**

If you want to build the application for production, use:

```bash
yarn run build
```

This will create a build directory with optimized static files for deployment.

### Contributing

If you want to contribute to this project, feel free to fork the repository, make your changes, and submit a pull request. For any issues or feature requests, please create a new issue in the repository.

### Acknowledgments

The confetti animation library used is react-confetti. For more information, visit [react-confetti GitHub](https://github.com/alampros/react-confetti)
