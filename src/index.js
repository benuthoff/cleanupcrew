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

		students: {
			'A Cycle': {
				'upper': [],
				'lower': [],
				'terms': [
					{
						'name': 'Freshman',
						'color': 'white'
					},
					{
						'name': 'Junior',
						'color': 'purple'
					}
				]
			},
			'B Cycle': {
				'upper': [],
				'lower': [],
				'terms': [
					{
						'name': 'Freshman',
						'color': 'white'
					},
					{
						'name': 'Junior',
						'color': 'purple'
					}
				]
			}
		}

	}

});