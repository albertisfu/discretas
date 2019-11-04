from django.shortcuts import render

# Create your views here.



from django.views.decorators.csrf import csrf_exempt


from django.http import HttpResponse, JsonResponse
import json

import networkx as nx
import operator

import itertools    





def agregarAgrafo(relacion):
	g=nx.Graph()
	for ele in relacion:
		datos=ele
		g.add_edge(datos[0], datos[1])
	return g

def _maximal_independent_set(G):
    result = set()
    remaining = set(G)
    while remaining:
        G = G.subgraph(remaining)
        v = min(remaining, key=G.degree)
        result.add(v)
        remaining -= set(G[v]) | {v}
    return result




def conjunto_independiente(G, colors):
    remaining_nodes = set(G)
    while len(remaining_nodes) > 0:
        nodes = _maximal_independent_set(G.subgraph(remaining_nodes))
        remaining_nodes -= nodes
        for v in nodes:
            yield v


def colore_grafo(G, strategy='largest_first', interchange=False):

    colors = {}

    nodes = conjunto_independiente(G, colors)
    for u in nodes:
        # Set to keep track of colors of neighbours
        neighbour_colors = {colors[v] for v in G[u] if v in colors}
        # Find the first unused color.
        for color in itertools.count():
            if color not in neighbour_colors:
                break
        # Assign the new color to the current node.
        colors[u] = color
    return colors





#Euler Functions
def cadena(graforel, EdgeDestino, listVerti):
			for arista in graforel:
				if arista[0] == EdgeDestino or arista[1] == EdgeDestino:
					#print('edgeDes ', EdgeDestino)

					if arista[0]==EdgeDestino:
						EdgeDestino = arista[1]
					else:
						EdgeDestino = arista[0]



					if EdgeDestino in listVerti:
						pass
					else:
						listVerti.append(EdgeDestino)

						newrel = graforel[:]
						newrel.remove(arista)
						#print('entro afuera')
						#print('new rel afuera ', newrel)
						cadena(newrel, EdgeDestino, listVerti)
				else:
					pass


def aristasLocal(vertice, relacion):
	relgrado = []
	for rel in relacion:
		if vertice==rel[0]:
			relgrado.append(rel)
		if vertice==rel[1]:
			relgrado.append(rel)

	return relgrado


	#count vertices alcanzables:

def countVerticesO(relacion, vertices, VerFrom):
	#conteo de vertices alcanzables desde el vertice actual
	
	for elem in relacion:
		if elem[0] ==  VerFrom or elem[1] ==  VerFrom:
			#print('edgeDes ', EdgeDestino)

			if elem[0]== VerFrom:
				 current = elem[0]
				 next = elem[1]
			else:
				 current = elem[1]
				 next = elem[0] 


			if current == VerFrom:
				EdgeDes = next
				if EdgeDes in vertices:
					pass
				else:
					vertices.append(EdgeDes)

					newrel = relacion[:]
					newrel.remove(elem)
					#print('new rel dentro ', newrel)
					#print('entro adentro')
					cadena(newrel, EdgeDes, vertices)

	if VerFrom in vertices:
		vertices.remove(VerFrom)



def countVerticesMenos(relacion, vertices, VerFrom):
	#conteo de vertices alcanzables desde el vertice actual
	
	for elem in relacion:

		if elem[0] ==  VerFrom or elem[1] ==  VerFrom:
			#print('edgeDes ', EdgeDestino)

			if elem[0]== VerFrom:
				 current = elem[0]
				 next = elem[1]
			else:
				 current = elem[1]
				 next = elem[0] 

			if current == VerFrom:
				EdgeDes = next
				if EdgeDes in vertices:
					pass
				else:
					vertices.append(EdgeDes)

					newrel = relacion[:]
					newrel.remove(elem)
					#print('new rel dentro ', newrel)
					#print('entro adentro')
					cadena(newrel, EdgeDes, vertices)

	if VerFrom in vertices:
		vertices.remove(VerFrom)



def nexteuler(Grelation, currentver, arista, camino):

	#print('inicianext euler')
	#print('arista: ', arista)

	if arista == 0:
		pass
	else:

		relacionlocal = aristasLocal(currentver, Grelation)
		if len(aristasLocal(currentver, Grelation)) > 1:
			#print('vertice ', currentver, 'tiene grado ', len(aristasLocal(currentver, Grelation)))
			#print('relacion grados vertice', aristasLocal(currentver, Grelation))


			verticesOri = []
			verticesMenos = []
			#conteo de vertices alcanzables desde el vertice actual
			countVerticesO(Grelation, verticesOri, currentver)
			conteoOriginal = len(verticesOri)
			#print('0conteo original de : ', currentver, ' :' ,conteoOriginal)
			#print('0vertices original de : ',currentver, ' :', verticesOri)

			for arista in aristasLocal(currentver, Grelation): #iterar en la relacion de aristas locales
				
				graphMinAris = Grelation[:]
				graphMinAris.remove(arista)
				countVerticesMenos(graphMinAris, verticesMenos, currentver)
				conteoAfter = len(verticesMenos)

				#print('1conteo after from arista: ', arista, 'vertice: ', currentver, ' :' ,conteoAfter)
				#print('1vertices after de : ',currentver, ' :', verticesMenos)

				if conteoAfter < conteoOriginal:
					pass
				else:
					


					Grelation1 = Grelation[:]
					Grelation1.remove(arista)
					#print('delete arista: ', arista)

					if arista in camino:
						pass
					else:	

						if len(camino) == 0: 
							camino.append(arista)
						else:
							last_ele = camino[-1]
							print('last ele: ', last_ele)
							last_number = last_ele[1]

							
							if arista[0] ==last_number :
								arisappend = arista
							else:
								arisappend = []
								arisappend.append(arista[1])
								arisappend.append(arista[0])

							camino.append(arisappend)


					if arista[0]==currentver:   #pasa al siguiente vertice
						currentver = arista[1]
					else:
						currentver = arista[0]


					if len(Grelation1) > 0:
						for aris in Grelation1:
							#print('for get arista currentver', currentver )
							#print('for get arista aris', aris )

							if currentver ==  aris[0] or currentver ==  aris[1]:
								aristanext = aris
								break
							else:
								aristanext = 0

					else:
						aristanext = 0

					#print('grelation after delete : ', Grelation1 )
					#print('currentver after delete: ', currentver )
					nexteuler(Grelation1, currentver, aristanext, camino)
					break

		else:
			#print('entro else')
			Grelation1 = Grelation[:]
			Grelation1.remove(arista)
			#print('delete2 arista: ', arista)

			if arista in camino:
				pass
			else:	
				if len(camino) == 0: 
					camino.append(arista)
				else:
					last_ele = camino[-1]
					last_number = last_ele[1]

					
					if arista[0] ==last_number :
						arisappend = arista
					else:
						arisappend = []
						arisappend.append(arista[1])
						arisappend.append(arista[0])

					camino.append(arisappend)


			if arista[0]==currentver:   #eliminar siguiente arista
				currentver = arista[1]
			else:
				currentver = arista[0]


			if len(Grelation1) > 0:
				for aris in Grelation1:
					if currentver ==  aris[0] or currentver ==  aris[1]:
						aristanext = aris
						break
					else:
						aristanext = 0
			else:
				aristanext = 0

				
			nexteuler(Grelation1, currentver, aristanext, camino)




def euler(Grelation, Vertice, camino):
	

	for ver in Grelation:

		if ver[0] ==  Vertice or ver[1] ==  Vertice:

			if ver[0]==Vertice:
				currentver = ver[0]
			else:
				currentver = ver[1]

			print('Vertice inicial: ', currentver)

			nexteuler(Grelation, Vertice,ver, camino)

			break








def home(request):
    #instancia
	data = 'test'

	return render(
        request=request,
        template_name='home.html',
        context={
            
            'data': data,
        })




@csrf_exempt
def ajax_coloreo(request):
    #instancia
	#relacion = [['1','2'], ['1','3'], ['1','4'],['1','5'],['2','3'], ['2','4'], ['2','5'], ['3','4'], ['3','5'], ['4','5'], ['6','1'], ['6','2'], ['6','3'], ['6','4'], ['6','5']]

	#print('request')
	data = json.loads(request.body)
	#print(data)

	relacion = []

	for ele in data:
		#print(ele)
		elemento = []
		for ed in ele:
			#print(ed)
			value = ele[ed]
			#print(value)

			elemento.append(ed)
			elemento.append(value)

			relacion.append(elemento)

	#print('relaciion')
	#print(relacion)


	g = agregarAgrafo(relacion)

	d = colore_grafo(g, strategy='independent_set')

	#print(d)

	response_data = []
	if request.method == 'POST':

		response = json.dumps(d,  ensure_ascii=False)
		print(response)
		return JsonResponse(response, safe=False)
		return response



@csrf_exempt
def ajax_euler(request):
    
	data = json.loads(request.body)
	#print(data)

	relacion = []

	vers = data['vers'];
	edges = data['edges'];


	conjuntoA = []
	for v in vers:
		print(v)
		conjuntoA.append(v);

	for ele in edges:
		#print(ele)
		elemento = []
		for ed in ele:
			#print(ed)
			value = ele[ed]
			#print(value)

			elemento.append(ed)
			elemento.append(value)

			relacion.append(elemento)



	#Este es un ciclo, elementos de relacion: 1,2,3,4,5,6,7,8
	#relacion = [['1','2'],['2','3'], ['3','4'], ['4','1'], ['1','3'],['1','7'],['7','6'],['6','5'],['5','8'],['8','7'],['7','5'],['5','3']]


	print('relacion')
	print(relacion)


	##########

	impar = 0
	countedge = {}
	#conteo de grados
	for ele in conjuntoA:
		for rel in relacion:
			if ele==rel[0]:
				if ele in countedge:
					countedge[ele] += 1
				else:
					countedge[ele] = 1


			if ele==rel[1]:
				if ele in countedge:
					countedge[ele] += 1
				else:
					countedge[ele] = 1

		#print('countedge ', ele, ': ', countedge)
		if countedge[ele] % 2 !=0: 
			impar +=1






	def caminoeuler(relacion): 
		
		camino=[]
		VmaxDeg = max(countedge.items(), key=operator.itemgetter(1))[0]
		#print('VmaxDeg', VmaxDeg)

		sorteddeg = sorted(countedge.items(), key=operator.itemgetter(1), reverse=True)

		for elemento in sorteddeg:
			#print('element 0', elemento[1])
			if elemento[1] % 2 !=0: 
				VerMax = elemento[0]
				break
			else:
				pass
				

		print('Ver max, ', VerMax)

		
		euler(relacion, VerMax, camino)

		print('Camino : ', camino )

		return camino






	def cicloeuler(relacion): 
		camino=[]
		VerMax = max(countedge.items(), key=operator.itemgetter(1))[0]


		print('Ver max, ', VerMax)

		
		euler(relacion, VerMax, camino)

		print('Camino : ', camino )

		return camino

		#print('impar ', impar)
		#print('countle', countedge)





	response = []		
	if impar == 0:
		print('Euleriano, tiene ciclo')
		print(cicloeuler(relacion))
		tipo = {'euler': True}
		ciclo = cicloeuler(relacion)

		listciclo = []
		for cic in ciclo:
			dic = {cic[0]:cic[1]}
			print(dic)

			listciclo.append(dic)

		response.append(tipo)
		response.append(listciclo)




	elif impar == 2:
		print('Semi euleriano, tiene camino')
		print(caminoeuler(relacion))

		tipo = {'euler': True}
		ciclo = caminoeuler(relacion)

		listciclo = []
		for cic in ciclo:
			dic = {cic[0]:cic[1]}
			print(dic)

			listciclo.append(dic)


		response.append(tipo)
		response.append(listciclo)


	elif impar >2:
		print('No euleriano')
		tipo = {'euler': False}
		response.append(tipo)
		response.append({''})


	#print(d)


	if request.method == 'POST':

		response = json.dumps(response,  ensure_ascii=False)
		print(response)
		return JsonResponse(response, safe=False)
		return response







@csrf_exempt
def ajax_hamilton(request):
	data = json.loads(request.body)

	rel = []

	vers = data['vers'];
	edges = data['edges'];


	conjuntoA = []
	for v in vers:
		print(v)
		conjuntoA.append(v);

	for ele in edges:
		#print(ele)
		elemento = []
		for ed in ele:
			#print(ed)
			value = ele[ed]
			#print(value)

			elemento.append(ed)
			elemento.append(value)

			rel.append(elemento)


	#rel = [['0','1'], ['0','2'], ['0','4'], ['1','3'],['2','5'], ['3','4'],['2','4'], ['5','4']]

	#rel = [['0','1'], ['0','2'], ['0','3'],['1','2'], ['1','3'], ['2','3']]

	relacion = []
	for el in rel:
		relacion.append(el)

		simetrico = []
		simetrico.append(el[1])
		simetrico.append(el[0])
		relacion.append(simetrico)

	#print('relacion aumentada ', relacion )

	matriz = []

	indexC = conjuntoA

	for element in conjuntoA:
		fila = []
		for element2 in conjuntoA:
			fila.append(0)
		matriz.append(fila)


	print(matriz)


	for elemenr in relacion:
		for indexlocal in indexC:
			#print('indexc')
			#print(indexC)
			if elemenr[0] == indexlocal:
				#print('element0')
				#print(elemenr[0])
				xindex = indexC.index(indexlocal)
				#print('index x')
				#print(xindex)

		for indexlocal in indexC:
			if elemenr[1] == indexlocal:
				#print('element1')
				#print(elemenr[1])
				yindex = indexC.index(indexlocal)
				#print('index y')
				#print(yindex)


		matriz[xindex][yindex] = 1

	for fila in matriz:
		print(fila)



	class Graph(): 
		def __init__(self, vertices): 
			self.graph = [[0 for column in range(vertices)] 
								for row in range(vertices)] 
			self.V = vertices 

		def isSafe(self, v, pos, path): 
			if self.graph[ path[pos-1] ][v] == 0: 
				return False

		
			for vertex in path: 
				if vertex == v: 
					return False

			return True

	
		def hamCycleUtil(self, path, pos): 

		
			if pos == self.V: 
		
				if self.graph[ path[pos-1] ][ path[0] ] == 1: 
					return True
				else: 
					return False


			for v in range(1,self.V): 

				if self.isSafe(v, pos, path) == True: 

					path[pos] = v 

					if self.hamCycleUtil(path, pos+1) == True: 
						return True

					path[pos] = -1

			return False

		def hamCycle(self): 
			path = [-1] * self.V 


			path[0] = 0

			if self.hamCycleUtil(path,1) == False: 
				print ("No tiene Hamilton")
				return False

			self.printSolution(path) 
			return self.printSolution(path)

		def printSolution(self, path): 
			print("Ciclo o Camino Hamiltoniano")

			#print(path)

			camino = []
			for idx, elem in enumerate(path):

				thiselem = elem
				nextelem = path[(idx + 1) % len(path)]

				simetrico = []
				simetrico.append(thiselem)
				simetrico.append(nextelem)
				camino.append(simetrico)
				
		
			return camino


	g1 = Graph(len(conjuntoA)) 
	g1.graph = matriz


	cam = g1.hamCycle(); 
	print(cam)

	response = []	
	if cam == False:
		
		tipo = {'hami': False}
		response.append(tipo)
		response.append({''})

	else:
		ciclo = cam

		listciclo = []
		for cic in ciclo:
			dic = {cic[0]:cic[1]}
			print(dic)

			listciclo.append(dic)


		tipo = {'hami': True}
		response.append(tipo)
		response.append(listciclo)


	if request.method == 'POST':

		response = json.dumps(response,  ensure_ascii=False)
		print(response)
		return JsonResponse(response, safe=False)
		return response


@csrf_exempt
def ajax_upload(request):


	if request.method == 'POST':
		jsonfile = request.FILES['file']
		json_data = jsonfile.read()
		data_dict = json.loads(json_data)
		print(data_dict)
		return JsonResponse(data_dict, safe=False)







