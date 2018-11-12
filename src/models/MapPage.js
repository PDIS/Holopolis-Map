export class MapPage {
	getMapDefaultCenter() {
		return {coords: {latitude: 40.40613, longitude: -3.6903}};
	}
	getGpsCenter() {
		return new Promise((resolve, reject) => {
			if(navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(resolve, reject);
			} else {
				reject("Geo Location not supported by browser");
			}
		}).catch(err => {
			console.error(err);
			return this.getMapDefaultCenter();
		});
	}
	getMapMarkers() {
		return new Promise(resolve => resolve([
			{
				id:1,
				name: 'Atocha',
				questions: [
					{
						id: 1,
						title: 'Do you want to build an hospital in Atocha?',
						type: 'healthcare',
						polis_link: 'http://some-link.com/atocha-hospital'
					},
				],
				coords: {latitude: 40.40613, longitude: -3.6903},
			},
			{
				name: 'La Ingobernable',
				questions: [
					{
						id: 2,
						title: 'Do you want to keep La Ingobernable as an open cultural environment?',
						type: 'social',
						polis_link: 'http://some-link.com/la-ingobernable-open'
					},
				],
				coords: {latitude: 40.41163, longitude: -3.69293},
			},
			{
				name: 'Reina Sofía',
				questions: [
					{
						id: 3,
						title: 'Do you want to give free pass to students for visiting the Reina Sofía museum?',
						type: 'education',
						polis_link: 'http://some-link.com/reina-sofia-free-students'
					},
				],
				coords: {latitude: 40.40817, longitude: -3.69437},
			},
		]));
	}
}

