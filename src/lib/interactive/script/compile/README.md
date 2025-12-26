# RESIN Script to Intermediate Representation Compiler
This directory contains the RESIN Script to Intermediate Representation (IR) compiler. The compiler translates RESIN Script code into an intermediate representation that can be further processed or executed by the RESIN runtime.

# About the IR
The IR is an easy-to-parse interpreted language.

# IR Syntax
## Trees and Blocks
The RESIN script consists of blocks organized into trees. Each tree represents a sequence of operations or commands. Blocks not belonging to any tree are ignored.

Every tree begins with `BEGIN TREE <name>;` and ends with `END TREE;`.

### Variable blocks
- Variable set block: `SET <variable_name> = <value>;`
  - If the variable doesn't exist, it is created.
- Variable get block: `GET <variable_name>;`
  - If the variable doesn't exist, an error is raised.