# vantage-sv
Run `npm install` from the master branch to have all packages installed.

Run the app locally `npm run start` or in debug mode with `DEBUG=vantage-sv:* npm run dev`

[![Quality gate](https://sonar.sec.ibm.com/api/project_badges/quality_gate?project=managed-security%3Avantage-sv)](https://sonar.sec.ibm.com/dashboard?id=managed-security%3Avantage-sv)

## How to work with this project scaffold
In this readme you will find instructions specific to working with this Java Microservice scaffold based on Spring Boot. 

## Overview
This template is for a Node JS Application, it contains:
```
├── .gitignore - Common git ignore patterns.
├── chart/ - The Helm chart used to deploy the application to Kubernetes or OpenShift.
│   ├── values.yaml - The main K8s configuration file to be used by the developer to make changes. 
├── Dockerfile - Used by Docker to build the app container image.
├── Jenkinsfile - Used by Jenkins to execute the build pipeline.
├── package.json - Used by NodeJs to identify project metadata and handle project dependencies.
├── package-lock.json - Created by nodejs to lock the dependencies. 
├── node_modules - created by nodejs containing all the dependencies. 
├── public, routes, views, app.js - Source code of the project. 

```

### Instructions

Follow the [DevSecOps Pipeline Service Gen 5](https://pages.github.ibm.com/managed-security/dept-it/#/services/devsecops_sre/devsecops_pipeline/5/) documentation to learn how to work with this project scaffold and deliver an application into OpenShift.