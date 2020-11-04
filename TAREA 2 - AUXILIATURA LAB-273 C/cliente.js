const direccion = 'localhost';
const puerto = 7000;
var net = require('net'); 
process.stdout.write('Bienvenido al sistema LAB 273\nIngrese usuario y contraseña (user/pass)\n');
process.stdin.on('data', function(data) {
    const datoEnviar = data.toString().trim();
    const client = new net.Socket();
    // conectamos con el servidor
    client.connect(puerto, direccion, function() {
        const address = client.address();
        const port = address.port;
        const ipaddr = address.address;
        // enviamos el dato
        client.write(datoEnviar);
    });
    //Se recibe el mensaje enviado por el servidor en la variable data
	client.on('data', function(data) {
		console.log(data.toString());
		if (data.toString().indexOf('Bienvenid@')!=-1)
		{
			client.end(); // Se finaliza la conexion del cliente
		}
	});
    // cerramos la conexion con el servidor
    client.on('end', function() {
        process.exit();
    });
});