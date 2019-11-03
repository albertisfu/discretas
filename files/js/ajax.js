
$('.actions').on('click', ".coloreo", function()  {


      //Enviar lista de aristas del grafo sin simetrias, ejemplo:
      var grafo = [];
      for (var i = 0; i < arregloAristas.length; i++) {
        var puntos = arregloAristas[i].split(",");
        var a=puntos[0];
        var b=puntos[1];
        grafo.push({[a]:b})
      }
      //var grafo = [{'1':'2'},{'1':'3'},{'1':'4'},{'1':'5'},{'2':'3'},{'2':'4'},{'2':'5'},{'3':'4'},{'3':'5'},{'4':'5'},{'6':'1'},{'6':'2'},{'6':'3'},{'6':'4'},{'6':'5'}];
      console.log(grafo);
      json_data = grafo;

        //se mando a llamar con javascript
        $.ajax({
            url: '/coloreo/',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(json_data),
            success: function (data) {

            //agregar li si no existe o actualizar li si existe
          data = JSON.parse(data);
           console.log(data);


           //Retorna lista de vertices con su color correspondiente, ejemplo:
           //{"5": 0, "6": 1, "4": 2, "3": 3, "1": 4, "2": 5}

           //ejemplo de parsing
          $.each(data, function(key, val) {
                //$("#vertice_" + idl).css("background-color", "#FFFFFF");
                $("#vertice_"+key).css("background-color", colores[val])
                console.log(key+ " *** " + val);
              });

          }

});

    return false;
        });




$('.actions').on('click', ".euler", function()  {


      //Enviar lista de aristas del grafo sin simetrias, ejemplo:
      var edges=[]
      for (var i = 0; i < arregloAristas.length; i++) {
        var puntos = arregloAristas[i].split(",");
        var a=puntos[0];
        var b=puntos[1];
        edges.push({[a]:b})
      }
      var verts=[]
      for (var i = 0; i < vertices.length; i++) {
        verts.push(i+"")
      }
      //console.log(verts);
      //console.log(edges);
      var grafo = {'vers':verts, 'edges':edges};
      json_data = grafo;

        //se mando a llamar con javascript
        $.ajax({
            url: '/euler/',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(json_data),
            success: function (data) {

            data = JSON.parse(data);
            //agregar li si no existe o actualizar li si existe
           console.log(data);

        //Retorna si tiene camino o ciclo de euler y lista de aristas del camino en orden, ejemplo:
        //[{"euler": true}, [{"1": "2"}, {"2": "3"}, {"3": "1"}, {"1": "4"}, {"4": "3"}, {"3": "5"}, {"5": "2"}, {"2": "4"}, {"4": "5"}, {"5": "1"}]]

            //ejemplo de parsing
           euler = data[0]
           console.log(euler)
           $("#resultados").html("")
           ciclo = data[1]
           console.log(ciclo)
           clearCanvas();
           //obtener valores de las aristas
           $.each(ciclo, function(i, obj) {
              //use obj.id and obj.name here, for example:
              $.each(obj, function(key, val) {
                //recorridoEuler.push(key,val)
                //console.log(key+ " *** " + val);
                $("#resultados").append(key+ " *** " + val +"<br>")
                console.log(vertices[key][0]+"***"+vertices[key][1]);
                console.log(vertices[val][0]+"***"+vertices[val][1]);
                //Pintamos el Camino y luego un sleep para hacerlo como animacion
                setTimeout(dibujarRecorrido(key,val),1000);
              });
              setTimeout(sleep(100),2000);

            });



          }

});

    return false;
        });
