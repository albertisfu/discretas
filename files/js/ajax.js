
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
           var max=0;
          $.each(data, function(key, val) {
                //$("#vertice_" + idl).css("background-color", "#FFFFFF");
                $("#vertice_"+key).css("background-color", colores[val])
                console.log(key+ " *** " + val);
                console.log('$("#vertice_"'+key+').css("background-color",'+colores[val]+')');
                if (max<=val) {
                  max=val;
                };
                $("#resultados").html("")
                $("#resultados").append("Chi de G: "+(max+1)+"<br>")

              });
              for (var i = 0; i < vertices.length; i++) {
                if ($("#vertice_" + i).css("background-color")=="rgb(255, 255, 255)") {
                  console.log("Vertice sin colorear"+ i + "Aplicando Primer color");
                  $("#vertice_"+i).css("background-color", colores[0])
                }
              }
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

           if(euler['euler']==false){alert('No hay camino de euler')}

          console.log(data[1])
          $("#resultados").html("")
          try {
              $("#resultados").append(data[1]["tipo"] +" de Euler<br>")
          } catch (e) {
              $("#resultados").append("Grafo no Euleriano <br>")
          } finally {

          }
           ciclo = data[2]
           console.log(ciclo)
           clearCanvas();
           var cont=1
           //obtener valores de las aristas
           $.each(ciclo, function(i, obj) {
              //use obj.id and obj.name here, for example:
              $.each(obj, function(key, val) {
                //recorridoEuler.push(key,val)
                //console.log(key+ " *** " + val);

                $("#resultados").append(key+ " *** " + val +"<br>")
                //console.log(vertices[key][0]+"***"+vertices[key][1]);
                //console.log(vertices[val][0]+"***"+vertices[val][1]);
                //Pintamos el Camino y luego un sleep para hacerlo como animacion
                setTimeout(function(){
                  if (vertices[key][0]==vertices[val][0] && vertices[key][1]==vertices[val][1]) {
                    //Repintamos Arcos
                    console.log("Lazo");
                    context.beginPath();
                    context.arc(vertices[key][1]+5, vertices[key][0]+5,10,0,Math.PI*2,true);
                    context.strokeStyle = "red";
                    context.stroke();
                  }else {
                    //Repintamos Aristas
                    context.beginPath();
                    context.moveTo(vertices[key][1], vertices[key][0]);
                    context.lineTo(vertices[val][1], vertices[val][0]);
                    context.strokeStyle = "red";
                    context.stroke();
                  }
                },cont*1000);
                cont++;
              });

            });



          },
          error: function( jqXHR, textStatus, errorThrown ){
            if (jqXHR.status == 500) {
              $("#resultados").html("")
              $("#resultados").append("Grafo no Euleriano <br>")
            }
          }

});

    return false;
        });









$('.actions').on('click', ".hami", function()  {

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

      var grafo = {'vers':verts, 'edges':edges};
      //console.log(grafo);
      //var grafo = {'vers':['0','1','2','3','4','5'], 'edges':[{'0':'1'},{'0':'2'},{'0':'4'},{'1':'3'},{'2':'5'},{'3':'4'},{'2':'4'},{'5':'4'}]};

      console.log(grafo);
      json_data = grafo;

        //se mando a llamar con javascript
        $.ajax({
            url: '/hami/',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(json_data),
            success: function (data) {

            //agregar li si no existe o actualizar li si existe
          data = JSON.parse(data);

          console.log('response');
           console.log(data);


        //Retorna si tiene camino o ciclo de euler y lista de aristas del camino en orden, ejemplo:
        //[{"hami": true}, [{"0": 1}, {"1": 3}, {"3": 4}, {"4": 5}, {"5": 2}, {"2": 0}]]

            //ejemplo de parsing
           hami = data[0]
           console.log(hami)
           console.log(data[1])

           if(hami['hami']==false){alert('No hay camino de Hamilton')}


           $("#resultados").html("")
          $("#resultados").append(data[1]["tipo"] +" de Hamilton<br>")

           var cont=1;

           ciclo = data[2]
           console.log(ciclo)
           clearCanvas();
           //obtener valores de las aristas
           $.each(ciclo, function(i, obj) {
              //use obj.id and obj.name here, for example:
              $.each(obj, function(key, val) {
                //console.log(key+ " *** " + val);
                $("#resultados").append(key+ " *** " + val +"<br>")
                setTimeout(function(){
                  if (vertices[key][0]==vertices[val][0] && vertices[key][1]==vertices[val][1]) {
                    //Repintamos Arcos
                    context.beginPath();
                    context.arc(vertices[key][1]+5, vertices[key][0]+5,10,0,Math.PI*2,true);
                    context.strokeStyle = "red";
                    context.stroke();
                  }else {
                    //Repintamos Aristas
                    context.beginPath();
                    context.moveTo(vertices[key][1], vertices[key][0]);
                    context.lineTo(vertices[val][1], vertices[val][0]);
                    context.strokeStyle = "red";
                    context.stroke();
                  }
                },cont*1000);
                cont++;
              });

            });





          }

});

    return false;
        });




$('.uploadForm').on('submit', function(event){
  event.preventDefault();
  console.log('upload file');

 var formData = new FormData();
formData.append('file', $('#uploadFile')[0].files[0]);

  $.ajax({
    url: "/uploadfile/",
    type: "POST",
    data: formData,
    async: true,
    cache: false,
    processData: false,
    contentType: false,
    enctype: 'multipart/form-data',
    success: function(data){

     //retorna JSON del archivo decodificado.
    restablecer()
    console.log(data);
    arregloAristas=data.edges;
    arregloAristas.forEach(function (pos){
      datos=pos.split(",");
      $('#aristas').append('(' + datos[0] + ',' + datos[1] + ')<br />');
    })
    vertices=data.vers;
    console.log(vertices.length);
    verticeActual=0;
    vertices.forEach(function(pos) {
      console.log(pos);
      $('#div_canvas').append('<div id="vertice_' + verticeActual + '" class="vertice" style="top: ' + pos[0] + 'px; left: ' + pos[1] + 'px;">' + verticeActual + '</div>');
      $('#vertice_' + verticeActual).draggable({
        drag: function(e) {
          //Rich Version
          clearCanvas();
          var parentOffset2 = $('#html_canvas').parent().offset();
          arriba = (e.pageY - parentOffset2.top);
          izquierda = (e.pageX - parentOffset2.left);
          //console.log("Arriba: "+arriba +" Izquierda"+ izquierda);
          var id=$(this).attr("id").split("_");
          //console.log("Arriba: "+arriba +" Izquierda"+ izquierda);
          vertices[id[1]]=[arriba, izquierda];
          repintar();
        }

      });
      $("#vertice_"+verticeActual).dblclick(function(){
        var id=$(this).attr("id").split("_");
        id=id[1];
        origen=id;
        var de = $('select[name=de]').val(id);
      });
      $("#vertice_"+verticeActual).click(function(){
        if (document.getElementById("newArista").checked) {
          var id=$(this).attr("id").split("_");
          if (origen!=null) {
            id=id[1];
            destino=id;
            agregarArista2(origen,destino);
            var a = $('select[name=a]').val(id);
          }else {
            alert("Selecione un vertice origen (Doble click en un vertice sin la opcion agregar arista)")
          }
        }
      });

      //vertices.push(pos);
      var o = new Option(verticeActual, verticeActual);
      $(o).html(verticeActual);
      $("#de").append(o);
      o = new Option(verticeActual, verticeActual);
      $(o).html(verticeActual);
      $("#a").append(o);
      $("#vertice_" + verticeActual).css("background-color", color);
      verticeActual++;
      var randomColor = "#000000".replace(/0/g,function(){return (~~(Math.random()*255)).toString(16);});
      colores.push(randomColor)
    });

    repintar();

    }
  });
});
