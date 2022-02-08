// Cleanup Crew Web Script
// by Ben Uthoff

var CleanupApp = new Vue({

	el: '#vueapp',

	data: {

		title: 'ITNShop\'s Cleanup Crew',

		roles: [
			{
				name: 'Sweeping (Upper)',
				assigned: 'Student A'
			},
			{
				name: 'Sweeping (Lower)',
				assigned: 'Student B'
			},
			{
				name: 'Sweeping (Related)',
				assigned: 'Student C'
			},
			{
				name: 'Trash A',
				assigned: 'Student D'
			},
			{
				name: 'Trash B',
				assigned: 'Student E'
			}
		],

		students: {},
		history: []

	}

});

// Socket Pointers
var socket = io();

socket.on('datasend', (store) => { // Gets data from backend.
	CleanupApp.students = store.active;
	CleanupApp.history = store.history;
});