# 🧭 treasure-map-test

This project is a technical test for CarbonIT.

⚠ **Disclaimer**: This program assumes that the Adventurer lines are always defined last in the input files. ⚠

## Installation

To install, just run this command (inside of the working directory):

```
npm install
// or
yarn install
```

## 🧪 Testing / Coverage

### Unit tests

In order to run the unit tests, just run this command (inside of the working directory):

For **npm**:

```
npm run test
// or
npm t
```

For **yarn**:

```
yarn test
```

### Coverage

In order to run the code coverage assessments, just run this command (inside of the working directory):

```
npm run coverage
// or
yarn coverage
```

## ▶ Instructions

### Running the program

In order to run the program, just run this command (inside of the working directory):

```
npm run start
// or
yarn start
```

This project comes with a few test maps, inside of the `/test-maps` directory, but you are free to add your own.

The specified input file will be read and loaded into the program, after which the program will run. After the program is done, an output file will be generated and placed into the `/generated` directory.

### Changing the input / output directories

#### ➡ Input directory

The default value for the input directory is `/test-maps`. In order to use another directory for input files, just change the value of `INPUT_DIRECTORY` insode of `file.constants.ts`.

#### ⬅ Output directory

The default value for the output directory is `/generated`. In order to use another directory for output files, just change the value of `OUTPUT_DIRECTORY` inside of `file.constants.ts`.

The `file.constants.ts` file can be found at this location:

```
src
  |- constants
      |-  file.constants.ts
```

⚠ The custom input/output directories **must be located at the root of the project**. ⚠

### Changing the file to run the program on

The default file the program runs on is `test-map-2.txt`.
In order to run the program on another file, just change the value of `FILENAME` inside of `file.constants.ts`, which can be found at this location:

```
src
  |- constants
      |-  file.constants.ts
```

⚠ The new input file **must be located inside of the designated input directory**. ⚠
