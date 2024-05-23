#           DEFAULT SCRIPT TO CREATE EXPRESS.JS APP
#               CREATE MINIMUM API WITH 
#                 - ERROR HANDLING 
#                 - UTILS 
#                 - SERVICES  
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#



# PowerShell script to set up a basic Node.js project with Express
param (
  [Parameter(Mandatory=$true)]
  [string]$ProjectName = "my-express-app",

  [Parameter(Mandatory=$true)]
  [bool]$InstallLintStaged = $false
)




# Check if the folder exists
if (-Not (Test-Path -Path ".git" -PathType Container)) {
  Write-Host "The folder '.git' does not exist. Stopping the script."
  exit 1
}

# If the folder exists, continue with the script
Write-Host "The folder '.git' exists. Continuing with the script."




# Function to write messages in green
function Write-Info($message) {
  Write-Host $message -ForegroundColor Green
}


# Step 1: Create project directory
Write-Info "Creating project directory '$ProjectName'..."
New-Item -ItemType Directory -Name $ProjectName -Force
Set-Location -Path $ProjectName


# Step 2: Initialize a new Node.js project
Write-Info "Initializing a new Node.js project..."
npm init


# Step 3: Install Dependencies
Write-Info "Installing Express..."
npm install express
Write-Info "Installed Express..."

Write-Info "Installing Nodemon..."
npm install nodemon
Write-Info "Installed Nodemon..."

Write-Info "Installing Eslint..."
npm install eslint --save-dev
Write-Info "Installed Eslint..."

Write-Info "Configuring Eslint..."
npm init @eslint/config@latest --save-dev
Write-Info "Configured Eslint..."

if ($InstallLintStaged) {
  Write-Info "Installing Lint-Staged..."
  npm install lint-staged --save-dev
  Write-Info "Installed Lint-Staged..."
  
  Write-Info "Installing Husky..."
  npm install husky --save-dev
  Write-Info "Installed Husky..."
  
  Write-Info "Configuring Husky..."
  npx husky init
  npx husky add .husky/pre-commit "npx lint-staged"
  Write-Info "Configured Husky..."
}


# Step 4: Create necessary directories and files
Write-Info "Creating directories and files..."

Write-Info "Creating text-file with useful scripts"
@'
{
  "scripts": {
    "start": "nodemon app.js",
    "eslint": "eslint .",
    "eslint-fix": "eslint --fix ."
  },
  "type": "module"
}
'@ | Out-File -FilePath overridePackageAndDeleteAfter.json -Encoding utf8


# Create folders directories
New-Item -ItemType Directory -Name controllers
New-Item -ItemType Directory -Name routes
New-Item -ItemType Directory -Name services
New-Item -ItemType Directory -Name utils


# Create main application file 'app.js'
@'
import express from "express";
import { homeRoutes } from "./routes/homeRoutes.js";
import { mathRoutes } from "./routes/mathRoutes.js";
import { generalErrorHandler, notFoundHandler } from "./utils/errorUtils.js";

const app = express();
const port = 3000;

// Use json body
app.use(express.json());

// Use the routes
app.use("/", homeRoutes);
app.use("/math", mathRoutes);

// Middlewares (Order matters!)
app.use(notFoundHandler);
app.use(generalErrorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

'@ | Out-File -FilePath app.js -Encoding utf8


# Create main application file 'errorUtils.js'
@'
export const createError = (status, message) => {
  const error = new Error();
  error.status = status;
  error.message = message;
};

export const generalErrorHandler = (error, req, res, next) => {
  const statusCode = error.status || 500;

  res.status(statusCode);

  res.json({
    status: statusCode,
    error: {
      message: error.message,
    },
  });
};

export const notFoundHandler = (req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  
  next(error);
};

'@ | Out-File -FilePath utils/errorUtils.js -Encoding utf8


# Create main application file 'mathService.js'
@'
export const squareNumber = (number) => {
  return number * number;
};

export const doubleNumber = (number) => {
  return number * 2;
};

'@ | Out-File -FilePath services/mathService.js -Encoding utf8


# Create 'controllers/homeController.js'
@'
export const getHomePage = (req, res) => {
  res.send('Hello, world!');
};

export const getAboutPage = (req, res) => {
  res.send('About Page');
};

'@ | Out-File -FilePath controllers/homeController.js -Encoding utf8


# Create 'controllers/mathController.js'
@'
import { squareNumber, doubleNumber } from './../services/mathService.js';

export const getSquare = (req, res, next) => {
  try {
    const number = parseInt(req.params.number, 10);
    if (isNaN(number)) {
      throw new Error('Invalid number');
    }

    const result = squareNumber(number);

    res.json({ result });

  } catch (error) {
    next(error);
  }
};

export const getDouble = (req, res, next) => {
  try {
    const number = parseInt(req.params.number, 10);
    if (isNaN(number)) {
      throw new Error('Invalid number');
    }

    const result = doubleNumber(number);

    res.json({ result });

  } catch (error) {
    next(error);
  }
};

export const postSquare = (req, res, next) => {
  try {
    const { number } = req.body;
    if (typeof number !== 'number' || isNaN(number)) {
      throw new Error('Invalid number');
    }
    
    const result = squareNumber(number);

    res.json({ result });

  } catch (error) {
    next(error);
  }
};

export const postDouble = (req, res, next) => {
  try {
    const { number } = req.body;
    if (typeof number !== 'number' || isNaN(number)) {
      throw new Error('Invalid number');
    }

    const result = doubleNumber(number);

    res.json({ result });

  } catch (error) {
    next(error);
  }
};

'@ | Out-File -FilePath controllers/mathController.js -Encoding utf8


# Create 'routes/homeRoutes.js'
@'
import express from 'express';
import { getHomePage, getAboutPage } from '../controllers/homeController.js'

export const homeRoutes = express.Router();

homeRoutes.get('/', getHomePage);
homeRoutes.get('/about', getAboutPage);

'@ | Out-File -FilePath routes/homeRoutes.js -Encoding utf8


# Create 'routes/mathRoutes.js'
@'
export const createError = (status, message) => {
  const error = new Error();
  error.status = status;
  error.message = message;
};

export const generalErrorHandler = (error, req, res, next) => {
  const statusCode = error.status || 500;

  res.status(statusCode);

  res.json({
    status: statusCode,
    error: {
      message: error.message,
    },
  });
};

export const notFoundHandler = (req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  
  next(error);
};

'@ | Out-File -FilePath routes/mathRoutes.js -Encoding utf8


Write-Info "Project setup complete. You can now run your server with 'node app.js'."


# Return to the initial directory
Set-Location -Path ..


# Done
Write-Info "Node.js project '$ProjectName' has been successfully created!"
