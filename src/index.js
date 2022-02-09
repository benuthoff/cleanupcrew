// Cleanup Crew Web Script
// by Ben Uthoff

// Socket Pointers
var socket = io();

// Initialize Vue App
var CleanupApp = new Vue({

	el: '#vueapp',

	data: {

		// Page Perameters
		title: 'ITNShop\'s Cleanup Crew',
		infomenu: false,
		historymenu: false,

		// Rotation Configuration
		cycles: [],
		cycle_trackpos: -1,
		locations: [],
		jobs: [],
		classes: {},
		history: []

	},

	methods: {

		nextGroup() {

			console.log('NEXT!');

			// Go to the next cycle. Account for overflow
			CleanupApp.cycle_trackpos += 1;
			if ( ''+CleanupApp.cycle_trackpos >= ''+CleanupApp.cycles.length ) { CleanupApp.cycle_trackpos = 0 };

			for (let i=0; i < CleanupApp.jobs.length; i++) {

				// Go to the next location for the job. Account for overflow
				// Only changes on 0 aka A cycles.
				if (CleanupApp.cycle_trackpos === 0) {
					CleanupApp.jobs[i].location_trackpos += 1;
					if ( CleanupApp.jobs[i].location_trackpos >= CleanupApp.jobs[i].locations.length )
						{ CleanupApp.jobs[i].location_trackpos = 0 };
				};
				
				// Gets the name of the class the job will be taking a student from.
				let clss = CleanupApp.cycles[ CleanupApp.cycle_trackpos ].locationmap[ CleanupApp.jobs[i].locations[ CleanupApp.jobs[i].location_trackpos ] ];

				// Go to the next student in the class. Account for overflow
				CleanupApp.classes[clss].student_trackpos += 1;
				if ( CleanupApp.classes[clss].student_trackpos >= CleanupApp.classes[clss].studentlist.length )
					{ CleanupApp.classes[clss].student_trackpos = 0 };
				
				// Get the name of the chosen student.
				let stdnt = CleanupApp.classes[clss].studentlist[ CleanupApp.classes[clss].student_trackpos ];

				CleanupApp.jobs[i].assigned = [ stdnt, clss ];

			};

			CleanupApp.addHistoryItem();
			CleanupApp.saveData();

		},

		resetAll() { // Resets all cycles

			CleanupApp.closeMenus();

			CleanupApp.cycle_trackpos = -1; // Reset Cycle rotation

			for (let i=0; i < CleanupApp.jobs.length; i++) {  // For each job.
				CleanupApp.jobs[i].location_trackpos = -1; // Reset Job rotation
				CleanupApp.jobs[i].assigned = [ 'Student', Object.keys(CleanupApp.classes)[0] ]; // Clear Job assignment
			};

			let clss = Object.keys(CleanupApp.classes);
			for (let i=0; i < clss.length; i++) { // For each class.
				CleanupApp.classes[ clss[i] ].student_trackpos = -1; // Reset Student rotation
			};

			CleanupApp.saveData();

		},

		clearHistory() {
			CleanupApp.closeMenus();
			CleanupApp.history = [];
			CleanupApp.saveData();
		},

		saveData() {
			socket.emit('datasync', {
				'cycles': CleanupApp.cycles,
				'cycle_trackpos': CleanupApp.cycle_trackpos,
				'locations': CleanupApp.locations,
				'jobs': CleanupApp.jobs,
				'classes': CleanupApp.classes,
				'history': CleanupApp.history
			});
		},

		closeMenus() {
			CleanupApp.infomenu = false;
			CleanupApp.historymenu = false;
		},

		addHistoryItem() {

			let x = { // base history point
				cycle_trackpos: CleanupApp.cycle_trackpos,
				jobs: [],
				classes_trackpos: {
					"Freshmen": 0,
					"Sophomores": 0,
					"Juniors": 0,
					"Seniors": 0
				}
			}

			// Add the jobs to the object
			for (let i=0; i < CleanupApp.jobs.length; i++) { 
				x.jobs.push({
					'location_trackpos': CleanupApp.jobs[i].location_trackpos,
					'assigned': CleanupApp.jobs[i].assigned
				})
			};

			// Add the class positions to the object
			let classes = Object.keys(CleanupApp.classes);
			for (let i=0; i < classes.length; i++) {
				x.classes_trackpos[ classes[i] ] = CleanupApp.classes[ classes[i] ].student_trackpos;
			};

			CleanupApp.history.unshift(x);
			
		}

	}

});

socket.on('datasend', (store) => { // Gets data from backend.
	let props = Object.keys(store);
	for (let i=0; i < props.length; i++) {
		CleanupApp[ props[i] ] = store[ props[i] ];
	};
});