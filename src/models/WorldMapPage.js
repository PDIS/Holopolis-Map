import { PolisGateway } from '../models/PolisGateway';

export class WorldMapPage {
	constructor() {
		this.gateway = new PolisGateway();
		this.markers = [
			{
				name: 'Atocha',
				questions: [
					{
						id: '92km3zkksd',
					},
				],
				coords: {latitude: 40.40613, longitude: -3.6903},
				icon: L.icon({
					iconUrl: 'https://github.com/PDIS/Holopolis-Map/blob/master/src/assets/PublicSpaces.gif?raw=true',
					iconSize: [32, 47.2],
				})
			},
			{
				name: 'La Ingobernable',
				questions: [
					{
						id: '3n3dxmbjwt',
					},
				],
				coords: {latitude: 40.41163, longitude: -3.69293},
				icon: L.icon({
					iconUrl: 'https://github.com/PDIS/Holopolis-Map/blob/master/src/assets/Health.gif?raw=true',
					iconSize: [32, 47.2],
				})
			},
			{
				name: 'Reina Sofía',
				questions: [
					{
						id: '6rhkfnv8v7',
					},
				],
				coords: {latitude: 40.40817, longitude: -3.69437},
				icon: L.icon({
					iconUrl: 'https://github.com/PDIS/Holopolis-Map/blob/master/src/assets/EDUCATION.gif?raw=true',
					iconSize: [32, 47.2],
				})
			},
			{
				name: 'Reina Sofía',
				questions: [
					{
						id: '5n8hnwcdmt',
					},
				],
				coords: {latitude: 40.40817, longitude: -3.69337},
				icon: L.icon({
					iconUrl: 'https://github.com/PDIS/Holopolis-Map/blob/master/src/assets/Equality.gif?raw=true',
					iconSize: [32, 47.2],
				})
			},
		];
	}
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
	getMarkerInfo(marker) {
		if (marker.questions.filter(question => question.topic != undefined).length === marker.questions.length) {
			return new Promise(resolve => resolve(marker));
		}
		const promises = marker.questions
			.map(question => this.gateway.restGetConversation(question.id))
			.map(promise => promise.then(res => res.data));

		return Promise.all(promises).then(results => {
			const newMarker = JSON.parse(JSON.stringify(marker));
			newMarker.questions = results;
			return newMarker;
		})
	}
	getMapMarkers() {
		return new Promise(resolve => resolve(this.markers));
	}
}

