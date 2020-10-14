## Cross Country

This is a simple web application that allows you to map out a walk / hike / run on Google Maps.

With this app, I wanted to explore loose coupling when it comes to joining ReactJS to something quite extensive like Google Maps.

This project uses a myriad of third party tools and approaches that are industry standard.

### How do I run this?

You will need to have a fairly recent version of [NodeJS](https://nodejs.org/en/) installed on your machine. I used *v12.16.2*.

You should also have the [Yarn](https://yarnpkg.com/) package manager installed globally.

Once you have Node and Yarn set up, do the following:

- clone or extract this project
- do `$ cd /cross-country` (the root directory for this project)
- run `$ yarn` wbich will install dependencies
- run `$ yarn dev` which will run the application

If you want to run tests and code quality checking, do the following:

- run `$ yarn test` to run all tests
- run `$ yarn coverage` to run all tests with coverage checking
- run `$ yarn lint` to run ESLint and check the code
- run `$ yarn checks` to run coverage and lint checks one after the other

This project was built using ReactJS and TypeScript, and it embodies the following principles:

- Components should be kept simple and maintain a good separation of concerns. Why? Well if we decide we want to use another mapping library or utility, we can do this more easily without the need for an extensive rewrite.

- Code should be loosely coupled if possible, and not tied too closely to a particular framework and / or library. I prefer building smaller simpler components that tie together easily.

- More complex functions should be kept in separate files. This makes testing and isolating functionality much easier, and full test coverage is achievable.

- A single source of truth for data is always good, and Redux does an excellent job of this.