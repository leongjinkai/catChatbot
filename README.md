# Introduction

This project serves to showcase a demo of integrating OpenAI Assistants along with Function Calling together with an external API (CatAPI). 

# Tech Stack

catGPT - This directory refers to the backend, developed using fastapi framework in python. OpenAI calls are also made here.
catgpt_fe - This directory refers to the frontend, developed using nextjs in typescript.

# How to run this project

Create a .env file in catGPT folder with the following variables:
1. OPENAI_API_KEY (You are able to get this once you sign up for an account in OpenAI website)
2. CATAPI_API_KEY (You can get the API key when you sign up at https://thecatapi.com/)
3. GPT_MODEL (You can select the GPT model depending on your needs, I use gpt-4o)

Do remember to run npm install for catgpt_fe directory to install the required modules.

You can run the backend server using this command "fastapi dev main.py" - This should run on PORT:8000
You can run the frontend server using this command "npm run dev" - This should run on PORT:3000
