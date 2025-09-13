
import { createTask } from './firebase-scripts/main.js';

console.log('Adding example tasks to Firestore...');

await createTask(
  "Design New Logo",
  "Create a modern and fresh logo for the HTW brand, incorporating Hawaiian themes.",
  500,
  "business"
);

await createTask(
  "Build API Endpoint",
  "Develop a REST API endpoint for user profiles using Node.js and Express.",
  800,
  "tech"
);

console.log('Example tasks added successfully.');
