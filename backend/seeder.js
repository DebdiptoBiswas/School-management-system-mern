// Import necessary modules
import dotenv from 'dotenv';
import connectDB from './config/db.js'; // Make sure this path is correct

// Import data and models
import { users } from './data/users.js';
import { items } from './data/Data.js';
import Dashboard from './models/dashboardModel.js';
import Admin from './models/adminModel.js';

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Function to import data
const importData = async () => {
  try {
    // Clear existing data
    await Admin.deleteMany();
    await Dashboard.deleteMany();

    // Insert new data
    await Admin.insertMany(users);
    await Dashboard.insertMany(items);

    console.log('Data imported successfully.');
    process.exit();
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
};

// Function to destroy data
const destroyData = async () => {
  try {
    // Remove all data
    await Admin.deleteMany();
    await Dashboard.deleteMany();

    console.log('Data destroyed successfully.');
    process.exit();
  } catch (error) {
    console.error('Error destroying data:', error);
    process.exit(1);
  }
};

// Check command line argument to decide whether to import or destroy data
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
