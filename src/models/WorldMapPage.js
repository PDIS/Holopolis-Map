import { PolisGateway } from '../models/PolisGateway';

export class WorldMapPage {
	constructor() {
		this.gateway = new PolisGateway();
		this.markers = [
			{
				id: 1,
				name: 'Atocha',
				conversation_ids: ['92km3zkksd'],
				coords: {latitude: 40.40613, longitude: -3.6903},
				icon: L.icon({
					iconUrl: 'https://github.com/PDIS/Holopolis-Map/blob/master/src/assets/PublicSpaces.gif?raw=true',
					iconSize: [32, 47.2],
				})
			},
			{
				id: 2,
				name: 'La Ingobernable',
				conversation_ids: ['3n3dxmbjwt'],
				coords: {latitude: 40.41163, longitude: -3.69293},
				icon: L.icon({
					iconUrl: 'https://github.com/PDIS/Holopolis-Map/blob/master/src/assets/Health.gif?raw=true',
					iconSize: [32, 47.2],
				})
			},
			{
				id: 3,
				name: 'Reina Sofía',
				conversation_ids: ['6rhkfnv8v7'],
				coords: {latitude: 40.40817, longitude: -3.69437},
				icon: L.icon({
					iconUrl: 'https://github.com/PDIS/Holopolis-Map/blob/master/src/assets/EDUCATION.gif?raw=true',
					iconSize: [32, 47.2],
				})
			},
			{
				id: 4,
				name: 'Reina Sofía',
				conversation_ids: ['5n8hnwcdmt'],
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
		if (marker.conversations != undefined) {
			return new Promise(resolve => resolve([marker, this.markers]));
		}
		const promises = marker.conversation_ids
			.map(conversation_id => this.gateway.restGetConversation(conversation_id))
			.map(promise => promise.then(res => res.data));

		return Promise.all(promises).then(results => {
			const newMarker = Object.assign({conversations: results}, marker);
			this.markers = this.markers.filter(marker => marker.id !== newMarker.id);
			this.markers.push(newMarker);
			return [newMarker, this.markers];
		})
	}
	getMapMarkers() {
		return new Promise(resolve => resolve(this.markers));
	}
}

