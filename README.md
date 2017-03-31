## PostgreSQL

1. How to create database on ElephantSQL

  - In your browser, go to [ElephantSQL](https://www.elephantsql.com/)
  - Log into ElephantSQL via GitHub
  - Click on 'Create new instance' to create a new database
  - Give your database a name, choose the 'Tiny Turtly' free plan, and select any data center from the list
  - Click on the name of your new new database to see details; you'll need the URL. Copy this to your clipboard!

1. Create a `config.env` file

1. Build database
`node database-one-off-build/database_build.js`

#### Tips:
To run a *build or sql* script locally you can run
`\i {name of your build script}`
