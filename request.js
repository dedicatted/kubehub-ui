// List of Clouds
// var xhr = new XMLHttpRequest();
// let data = JSON.stringify({
// 	virtual_machine_ip: "192.168.88.205"
// })
// xhr.open('GET','http://192.168.84.189:8080/api/cloud_providers/list');
// xhr.send();
// // console.dir(JSON.parse(xhr.responseText));
// xhr.onreadystatechange = function() {//Вызывает функцию при смене состояния.
// 	if(xhr.readyState == 4 && xhr.status == 200) {
// 		console.log(JSON.parse(xhr.responseText))
//     }
// }


// let xhr = new XMLHttpRequest();
// xhr.open('POST','http://192.168.84.189:8080/api/cloud_providers/add');

// let data = JSON.stringify({
// 	name: 'name',
// 	type: 'cloud',
// 	api_endpoint: 'api_endpoint',
// 	password: 'password'
// })
// xhr.send(data);
// console.log(data);
// console.dir(xhr.responseText);

let xhr = new XMLHttpRequest();
xhr.open('POST','http://192.168.84.189:8080/api/cloud_providers/remove');

let data = JSON.stringify({
	id: 1
})
xhr.send(data);
console.log(data);
