# Squamble

This is the repository for the quantum game 'Squamble' (originally called QFlow), submitted as part of the QE-CDT cohort project for Cohort 6. Further information about the game, including background Physics and how to play, can be found in the project report, or within the game itself.

Squamble is a web based game rendered in the HTML canvas enviroment. The user interface and game mechanics are primarily built through JavaScript while the back end is handled through Python. This software is written using an object oriented approach.   

## Repository contents

The 'index.html' file directs the GitHub pages to the homepage, which is 'index_v2.html'. It is recommended that Microsoft Edge is not used to play Squamble. This file then opens the appropriate pages, either for information ('About.html' or 'How_to_play.html') or game levels.

These levels are the html files 'Level_X.html', or 'Tutorial_X.html' which call the Javascript file 'Qflow.js', which provides the functionality of the game, and 'Level_X_data.js' which provides the appropriate starting level data. 

The data in these files is constructed by 'Graph_Constructor.py', which uses Qiskit and networkx to generate the circuits and graph data that is used as a basis to construct the levels.

Levels can also be generated using the file 'Rand_Gen.py', which creates circuits randomly (these are the files 'Qflow_Level_Rand.html', 'Qflow_Level_Rand_data.js').

The repository also contains music (.wav) and images (.jpg) for the game.

## Prerequisites & Deployment

To get a copy running on your local machine for development and testing purposes, it is necessary to first install Qiskit. Instructions for doing so can be found here: https://qiskit.org/documentation/install.html. Note that it is best to do so using Anaconda.

The game can be played at naomisolomons.github.io. 

## Contributions

The code for this was written by Sam Mister and Naomi Solomons - please access the https://github.com/naomisolomons/qflow repository for a more accurate idea of author contributions.
