    //Programación
    var vertices = new Array();
    var arregloAristas = new Array();
    var verticeActual = 0;
    var arriba = 0;
    var izquierda = 0;
    var CONSTANTE = 10;
    var color = '#FFFFFF';
    var colores= new Array();
    var canvas;
    var context;
    var origen; var destino;
    function sleep(milliseconds) {
     var start = new Date().getTime();
     for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
       break;
      }
     }
    }



    function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}



    function exportar(){
      var cadena='{"vers":[';
      for (var i = 0; i < vertices.length; i++) {
        if (i == vertices.length-1) {
          cadena=cadena+'['+vertices[i][0]+','+vertices[i][1]+']'
        }else {
          cadena=cadena+'['+vertices[i][0]+','+vertices[i][1]+'],'
        }
      }
      cadena=cadena+'], "edges":[';
      for (var i = 0; i < arregloAristas.length; i++) {
        console.log(i);
        if (i == arregloAristas.length-1) {
          cadena=cadena+'"'+arregloAristas[i]+'"'
        }else {
          cadena=cadena+'"'+arregloAristas[i]+'",'
        }
      }
      cadena=cadena+']}';
      console.log(cadena);

      download(cadena, 'export.json', 'text/plain');


    }



    function restablecer() {
        //Remover vértices
        for ( i = 0; i < verticeActual ; i++ ) {
          $("#vertice_" + i).remove();
        }
        //Reiniciar variables
        vertices = new Array();
        arregloAristas = new Array();
        verticeActual = 0;
        arriba = 0;
        izquierda = 0;
        color = '#FFFFFF';
        colores= new Array();
        origen=null;
        destino=null;
        //Borrar contenidos de trazos
        $('#aristas').html('');
        $('#resultados').html('');
        clearCanvas();
        //Quitar las aristas de los selects
        $('#de')
            .find('option')
            .remove()
            .end();
        $('#a')
            .find('option')
            .remove()
            .end();
    }

    function clearCanvas() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      var w = canvas.width;
      canvas.width = 1;
      canvas.width = w;
    }
    function agregarArista() {
      //Vértices
      var de = $('select[name=de]').val();
      var a = $('select[name=a]').val();
      //Validar si no existe ya
      if ( arregloAristas.indexOf(de + "," + a) == -1 && arregloAristas.indexOf(a + "," + de) == -1) {
        //No existe, dibujar arista
        if (vertices[de][1]==vertices[a][1] && vertices[de][0]==vertices[a][0]) {
          //Dibujamos Lazos
          context.beginPath();
          context.arc(vertices[de][1]+15, vertices[de][0]+15,10,0,Math.PI*2,true);
          context.stroke();
        }else {
          //Dibujamos Aristas
          context.beginPath();
          context.moveTo(vertices[de][1], vertices[de][0]);
          context.lineTo(vertices[a][1], vertices[a][0]);
          context.stroke();
        }
        //Agregar a arreglo
        arregloAristas.push(de + "," + a);
        $('#aristas').append('(' + de + ',' + a + ')<br />');
      } else {
        //Ya existe
        alert('No se pueden duplicar aristas... O tener simetria');
      }
    }
    function repintar() {
      //Repinta las aristas existentes despues de mover un nodo
      for (var i = 0; i < arregloAristas.length; i++) {
        var datos=arregloAristas[i].split(",");
        if (vertices[datos[0]][1]==vertices[datos[1]][1] && vertices[datos[0]][0]==vertices[datos[1]][0]) {
          //Repintamos Arcos
          context.beginPath();
          context.arc(vertices[datos[0]][1]+5,  vertices[datos[0]][0]+5,10,0,Math.PI*2,true);
          context.stroke();
        }else {
          //Repintamos Aristas
          context.beginPath();
          context.moveTo(vertices[datos[0]][1], vertices[datos[0]][0]);
          context.lineTo(vertices[datos[1]][1], vertices[datos[1]][0]);
          context.stroke();
        }

      }
      //console.log(vertice);
    }
    $(document).ready(function() {
        //Coordenadas para dibujar
        $(document).keypress(function(event){
          if (event.which  == 97 ) {
            //alert("a")
            if ($("#newArista").is(":checked")) {
              $("#newArista").prop("checked",false);
            }else {
              $("#newArista").prop("checked",true);
            }
          }
          if (event.which  == 118) {
            if ($("#newVertice").is(":checked")) {
              $("#newVertice").prop("checked",false);
            }else {
              $("#newVertice").prop("checked",true);
            }
          }
        })
        $('#html_canvas').mousemove(function(e){
            var parentOffset = $(this).parent().offset();
            arriba = (e.pageY - parentOffset.top);
            izquierda = (e.pageX - parentOffset.left);
        });
        //Dibujar vértice
        $('#html_canvas').click(function(){
          if (document.getElementById("newVertice").checked) {
            //Limpiamos Coloreo por agregar nuevo vertice
            //for (var i = 0; i < vertices.length; i++) {
            //  $("#vertice_"+i).css("background-color", "#FFFFFF")
            //}
            $('#div_canvas').append('<div id="vertice_' + verticeActual + '" class="vertice" style="top: ' + arriba + 'px; left: ' + izquierda + 'px;">' + verticeActual + '</div>');
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
              },
              stop: function() {
                //Poor Version
                //clearCanvas();
                //var id=$(this).attr("id").split("_");
                //console.log("Arriba: "+arriba +" Izquierda"+ izquierda);
                //vertices[id[1]]=[arriba, izquierda];
                //repintar();
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

            vertices.push([arriba, izquierda]);
            var o = new Option(verticeActual, verticeActual);
            $(o).html(verticeActual);
            $("#de").append(o);
            o = new Option(verticeActual, verticeActual);
            $(o).html(verticeActual);
            $("#a").append(o);
            var p=Math.round, r=Math.random, s=255;
            var randomColor = "#000000".replace(/0/g,function(){return (~~(Math.random()*255)).toString(16);});
            colores.push(randomColor)
            $("#vertice_" + verticeActual).css("background-color", colores[0]);
            verticeActual++;
            //console.log(randomColor);
          }
        });
        canvas = document.getElementById('html_canvas');
        context = canvas.getContext('2d');
    });

    function agregarArista2(origen,destino) {
      //Limpiamos el coloreo que se tenia por agregar una nueva arista
      for (var i = 0; i < vertices.length; i++) {
        $("#vertice_"+i).css("background-color", "#FFFFFF")
      }
      //Vértices
      var de = origen;
      var a = destino;
      //Validar si no existe ya
      if ( arregloAristas.indexOf(de + "," + a) == -1 && arregloAristas.indexOf(a + "," + de) == -1) {
        //No existe, dibujar arista
        if (vertices[de][1]==vertices[a][1] && vertices[de][0]==vertices[a][0]) {
          //Dibujamos Lazos
          context.beginPath();
          context.arc(vertices[de][1]+15, vertices[de][0]+15,10,0,Math.PI*2,true);
          context.stroke();
        }else {
          //Dibujamos Aristas
          context.beginPath();
          context.moveTo(vertices[de][1], vertices[de][0]);
          context.lineTo(vertices[a][1], vertices[a][0]);
          context.stroke();
        }
        //Agregar a arreglo
        arregloAristas.push(de + "," + a);
        $('#aristas').append('(' + de + ',' + a + ')<br />');
      } else {
        //Ya existe
        alert('No se pueden duplicar aristas... O tener simetria');
      }
      coloreo()
    }

function coloreo(){
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
    })

}
