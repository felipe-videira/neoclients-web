# Neoclients Web
An client management app. Also check the [Neoclients API](https://github.com/felipe-videira/neoclients-api).

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Stats](#stats)

## Requirements
Docker ^19.03

## Installation
Install [Docker](https://docs.docker.com/get-docker/)

Create a file named ".env" on the root folder with the information exemplified on the ".env.example" file

Apply the ".env" changes
```bash
$ docker-compose config
```
Start
```bash
$ docker-compose up 
```

## Usage

#### If settings, such as packages, are changed
```bash
$ docker-compose up --build
```
#### If the ".env" file is changed
```bash
$ docker-compose config
```

## Stats
 - Vue.js v2.6
 - Vuetify v2.2

