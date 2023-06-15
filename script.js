const selectServices = document.getElementById('selectServices');
const selectOptions = document.getElementById('selectOptions');
const dataFidelizacion = document.getElementById('dataFidelizacion');

function generateCustomerRow(customer) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${customer.id}</td>
        <td>${customer.firstName}</td>
        <td>${customer.lastName}</td>
        <td>${customer.carPlate}</td>
        <td>${customer.carType}</td>
        <td>${customer.email}</td>
        <td>${customer.phone}</td>
        <td>
        <button type="button" class="btn btn-sm btn-primary edit-button" data-id="${customer.id}">Editar</button>
        <button type="button" class="btn btn-sm btn-danger delete-button" data-id="${customer.id}">Eliminar</button>
        </td>
    `;

    return row;
}


const customers = [
    { id: 1, firstName: 'John', lastName: 'Doe', carPlate: 'ABC123', carType: 'Automóvil', email: 'john@example.com', phone: '1234567890', puntos: 30 },
    { id: 2, firstName: 'Jane', lastName: 'Smith', carPlate: 'XYZ987', carType: 'Camioneta', email: 'jane@example.com', phone: '9876543210', puntos: 30 }
];

puntos(customers)
const customersTableBody = document.getElementById('customersTableBody');
customers.forEach(function (customer) {
    const row = generateCustomerRow(customer);
    customersTableBody.appendChild(row);
});

$('#searchForm').submit(function (event) {
    event.preventDefault();
    const searchValue = $('#searchInput').val();
    // Lógica para buscar clientes según el valor de búsqueda
    // ...
});

$('#customersTable').on('click', '.edit-button', function () {
    const customerId = $(this).data('id');
    // Lógica para cargar los datos del cliente en el formulario de edición
    // ...
});

$('#customersTable').on('click', '.delete-button', function () {
    const customerId = $(this).data('id');
    deleteCustomer(customerId)
});
function deleteCustomer(customerId) {
    customers = customers.filter(c => c.id !== customerId);
    renderCustomerTable(customers);
}

$('#customerForm').submit(function (event) {
event.preventDefault();
const id = $('#idInput').val();
const firstName = $('#firstNameInput').val();
const lastName = $('#lastNameInput').val();
const carPlate = $('#carPlateInput').val();
const carType = $('#carTypeSelect').val();
const email = $('#emailInput').val();
const phone = $('#phoneInput').val();
// Lógica para enviar los datos del cliente al servidor
// ...

// Crear objeto de cliente
const newCustomer = {
    id: id,
    firstName: firstName,
    lastName: lastName,
    carPlate: carPlate,
    carType: carType,
    email: email,
    phone: phone,
    puntos: 0
};
//console.log(newCustomer);
customers.push(newCustomer);
localStorage.setItem('customers', JSON.stringify(customers));

// Agregar fila de cliente a la tabla
const newRow = generateCustomerRow(newCustomer);
customersTableBody.appendChild(newRow);

// Agrega una opción al select
const newOption = document.createElement('option');
newOption.textContent = firstName +' '+ lastName;
newOption.value = firstName +' '+ lastName;
selectOptions.appendChild(newOption);


// Limpiar campos del formulario
$('#idInput').val('');
$('#firstNameInput').val('');
$('#lastNameInput').val('');
$('#carPlateInput').val('');
$('#carTypeSelect').val('Automóvil');
$('#emailInput').val('');
$('#phoneInput').val('');
});

// Ejemplo de botón de cancelar
$('#cancelButton').click(function () {
// Limpiar campos del formulario
$('#idInput').val('');
$('#firstNameInput').val('');
$('#lastNameInput').val('');
$('#carPlateInput').val('');
$('#carTypeSelect').val('Automóvil');
$('#emailInput').val('');
$('#phoneInput').val('');
});

// Función para buscar clientes
function searchCustomers() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredCustomers = customers.filter(function (customer) {
      return (
        customer.firstName.toLowerCase().includes(searchInput) ||
        customer.lastName.toLowerCase().includes(searchInput) ||
        customer.identification.toLowerCase().includes(searchInput)
      );
    });
    displayCustomers(filteredCustomers);
  }


/* SERVICIOS */

// Array para almacenar los servicios
let services = [];

// Crear servicio
$('#createServiceForm').submit(function (event) {
  event.preventDefault();
  const serviceName = $('#serviceName').val();
  const serviceValue = parseFloat($('#serviceValue').val());
  const serviceDescription = $('#serviceDescription').val();
  const servicePoints = parseInt($('#servicePoints').val());

  // Generar un ID único para el nuevo servicio
  const serviceId = generateUniqueId();

  // Crear el objeto de servicio
  const newService = {
    id: serviceId,
    name: serviceName,
    value: serviceValue,
    description: serviceDescription,
    points: servicePoints
  };

  // Agregar el servicio al array
  services.push(newService);

   // Agrega una opción al select
   const newOption = document.createElement('option');
   newOption.textContent = serviceName;
   newOption.value = serviceName;
   selectServices.appendChild(newOption);

  // Agregar la fila del servicio a la tabla
  const row = document.createElement('tr');
  row.id = 'serviceRow' + serviceId;
  row.innerHTML = `
    <td>${serviceId}</td>
    <td>${serviceName}</td>
    <td>${serviceValue}</td>
    <td>${serviceDescription}</td>
    <td>${servicePoints}</td>
    <td>
      <button type="button" class="btn btn-danger btn-sm" onclick="deleteService(${serviceId})">Eliminar</button>
    </td>
  `;
  servicesTableBody.appendChild(row);

  // Limpiar campos del formulario
  $('#serviceName').val('');
  $('#serviceValue').val('');
  $('#serviceDescription').val('');
  $('#servicePoints').val('');
});

// Eliminar servicio
function deleteService(serviceId) {
  // Filtrar los servicios para obtener el servicio a eliminar
  const serviceIndex = services.findIndex(service => service.id === serviceId);

  if (serviceIndex !== -1) {
    // Eliminar el servicio del array
    services.splice(serviceIndex, 1);

    // Eliminar la fila correspondiente de la tabla
    document.getElementById('serviceRow' + serviceId).remove();
  }
}

// Función para generar un ID único
function generateUniqueId() {
  return Math.floor(Math.random() * 1000000);
}
  
function compra(){
var client = selectOptions.value;
var game = selectServices.value;
console.log(client, game);
console.log(customers);
const nomb = client.split(' ')[0];
console.log(nomb);
const resultado = customers.find(dato => dato.firstName === nomb);
console.log(resultado);
console.log(services);
const resultado2 = services.find(dato => dato.name === game);
console.log(resultado2);
const descuento = resultado2.value - (resultado2.value*0.06) + (resultado2.value*0.14) 
console.log(descuento);
if(resultado){
    // Modificar el dato en el objeto encontrado
    resultado.puntos = resultado.puntos + resultado2.points;
    puntos(customers);
}

/*  */

Swal.fire({
    title: 'Datos de compra',
    html: "Nombre: " + client + "<br> Servicio: " + game + "<br> Valor: " + descuento,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Confirmar compra',
    cancelButtonText: 'Cancelar',
    }).then((result) => {
    if (result.isConfirmed) {
        Swal.fire(
        'Aprobada!',
        'La compra se ha realizado exitosamente.',
        'success'
        )
    }
      })
}

function puntos(dataUsers){

    dataUsers.forEach(obj => {

        const row = document.createElement('tr');
        const idFid = document.createElement('td');
        const nameFid = document.createElement('td');
        const lastnameFid = document.createElement('td');
        const placaFid = document.createElement('td');
        const puntosFid = document.createElement('td');
    
        idFid.textContent = obj.id;
        nameFid.textContent = obj.firstName;
        lastnameFid.textContent = obj.lastName;
        placaFid.textContent = obj.carPlate;
        puntosFid.textContent = obj.puntos;
      
        row.appendChild(idFid);
        row.appendChild(nameFid);
        row.appendChild(lastnameFid);
        row.appendChild(placaFid);
        row.appendChild(puntosFid);
    
        dataFidelizacion.appendChild(row);
    });
}
