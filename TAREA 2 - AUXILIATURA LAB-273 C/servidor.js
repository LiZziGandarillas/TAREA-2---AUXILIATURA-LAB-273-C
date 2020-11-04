bd = [[1,"Dan Israel","Copa Lupe","dcopalupe","123456"],
[2,"Jorge Andres","Alanocaquino","jalanocaquino","1q2w3e4"],
[3,"Ana","Condori Quispe","acondoriquispe","54321"],
[4,"Lizeth","Gandarillas Parra","lizzi","lizzi123"]];
var net = require('net'); // Se importa el modulo net
var puerto =  Number(process.argv[2]);
//Se crea un socket para establecer la conexion del servidor
var server = net.createServer(function(connection) {
	//Se recibe el mensaje enviado por el cliente en la variable data
	connection.on('data', function(data) {
		var vdata = data.toString().split('/');
		var user = vdata[0];
		var pass = vdata[1];
		var sw = true;
		for (var i =0; i<bd.length; i++){
			if (user == bd[i][3])
			{
				sw = false;
				if (pass == bd[i][4])
				{
					connection.write('Bienvenid@ '+bd[i][1]+' '+bd[i][2]+'!!!!!');
					console.log('Cliente conectado '+bd[i][3]+'/'+bd[i][4]);
				}
				else
					connection.write('La contraseña para '+bd[i][3]+' es incorrecta.\nIngrese usuario y contraseña (user/pass)');
			}
		}
		if (sw)
			connection.write('El usuario '+user+' es incorrecto o no existe.\nIngrese usuario y contraseña (user/pass)');
	});
});
//Se inicia al servidor a la excucha de conexiones
server.listen(puerto, function() {
	console.log('Servidor corriendo en puerto '+puerto);
});