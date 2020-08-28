from qiskit.circuit.random import random_circuit
from qiskit.quantum_info import Operator
import numpy as np
import random as rd
from scipy.spatial import distance
from Graph_Constructor import Graph_Wrapper

def generator(): #This function generates random levels for Qflow based on user input 
    rd.seed() #set seed for random numbers 
    num_qubit = 2#int(input('Enter the number of Qubits:'))# take user input for number of qubits and depth.
    depth = 10#int(input('Enter the circuit depth:'))# recomend 2 qubits for now. 
    end = False # end while loop flag
    while end == False:
        Circ =  random_circuit(num_qubit,depth) # Generate a random circuit
        
        Circ_Operator = Operator(Circ) #construct operator for the circuit
        Unitary = Circ_Operator.data# extract the unitary as a 2D array 
        origin = np.zeros(2**num_qubit) # define the origin vector of the state space
        state = np.zeros(2**num_qubit) # create a random unnormalised state in the state space
        
        for i in range(len(state)):
            state[i] = rd.random()
        length = distance.euclidean(origin,state)    
        state = state/length # normalise the state
        
        flow = np.zeros((Unitary.shape[0],Unitary.shape[1]))  # define empt flow matrix
        
        for n in range(Unitary.shape[0]): #fill flow matrix
                       for m in range(Unitary.shape[1]):
                           sum = 0
                           for i in range(Unitary.shape[1]):
                               sum += state[i]*Unitary[n,i]
                           flow[n,m] = ((state[m].conjugate())*(Unitary[n,m].conjugate())*sum).real 
                           if flow[n,m] < 0: # check that at least one element is negative and if true end the loop
                               end = True
                               
                               
    valid = FlowCheck(Unitary, state, flow) #Check that the generated matrix does indeed satisfy the required constraints using a second function.
    if valid == True:
        return Circ_Operator, state, flow
    elif valid == False:
        print('An Error has occured restart the game.')
    

def FlowCheck(Unitary, state, flow):
    new_state = np.matmul(Unitary, state)
    initial_prob = abs(state)**2 # calculate the initial and final probability distributions
    final_prob = abs(new_state)**2
    
    row_margin = np.zeros(flow.shape[0]) #calculate the row sums and column sums.
    for n in range(flow.shape[0]):
        for m in range(flow.shape[1]):
            row_margin[n] += flow[n,m]
    
    col_margin = np.zeros(flow.shape[0])
    for m in range(flow.shape[0]):
        for n in range(flow.shape[1]):
            col_margin[m] += flow[n,m]
            
    outcome1 = np.allclose(initial_prob,col_margin)
    outcome2 = np.allclose(final_prob,row_margin)
    if outcome1 == True & outcome2 == True: # check that the margins of the flow matrix match the probabilities
        return True
    else:
        return False
    
    
if __name__== '__main__': #Test Code
    Unitary, state, flow = generator()
    G_wrapper = Graph_Wrapper(Unitary,state) 
    graph_data = G_wrapper.data
    del graph_data["directed"]
    del graph_data["multigraph"]
    del graph_data["graph"]
    #print(graph_data)
    
    html1 = """<!DOCTYPE html>
            <html lang = "en">
            <head>
                <meta charset="utf-8">
                <title>Squamble - A Quantum Game</title>
                <style type="text/css">
                    canvas {
                        border: 1px solid black;
                     
                    }
                    
                    body {
                        margin: 0;
                         overflow:hidden;
                    }
                    
                    div1 {
                        display: none
                    }
                
                </style>
            </head>
            <body id = "body">"""
    html2=        """<div class = "div1" data-graph = "{}"></div>""".format(graph_data)
                
    html3=        """<canvas></canvas>
                <script src="Qflow_Level_Rand_data.js"></script>
                <script src="Qflow.js"></script>
            </body>
            </html>"""
        
    html = html1+html2+html3
    #This writes the generated HTML version of the graph to a html file which can be viewed in browser
    f = open(r"Qflow_Level_Rand.html", "w")
    f.write(html)
    f.close()
