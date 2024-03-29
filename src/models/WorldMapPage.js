import { PolisGateway } from '../models/PolisGateway';

export class WorldMapPage {
	constructor() {
		this.gateway = new PolisGateway();
		this.markers = [
			{
				id: 1,
				name: 'Atocha Renfe',
				conversation_ids: ['92km3zkksd'],
				coords: {latitude: 40.40613, longitude: -3.6903},
				logo: 'https://github.com/PDIS/Holopolis-Map/blob/master/src/assets/SPACES.png?raw=true',
				icon: L.icon({
					iconUrl: 'https://github.com/PDIS/Holopolis-Map/blob/master/src/assets/PublicSpaces.gif?raw=true',
					iconSize: [32, 47.2],
				})
			},
			{
				id: 2,
				name: 'Why Madrid Should Be Your Next Vacation Destination',
				conversation_ids: ['3eeru2dfur'],
				coords: {latitude: 40.41163, longitude: -3.69293},
				logo: 'https://github.com/PDIS/Holopolis-Map/blob/master/src/assets/EQUALITY.png?raw=true',
				icon: L.icon({
					iconUrl: 'https://github.com/PDIS/Holopolis-Map/blob/master/src/assets/Equality.gif?raw=true',
					iconSize: [32, 47.2],
				})
			},
			{
				id: 3,
				name: 'Instituto Nacional de Administración Pública',
				conversation_ids: ['6amx5ecten'],
				coords: {latitude: 40.40969, longitude: -3.69530},
				logo: 'https://github.com/PDIS/Holopolis-Map/blob/master/src/assets/HEALTH.png?raw=true',
				icon: L.icon({
					iconUrl: 'https://github.com/PDIS/Holopolis-Map/blob/master/src/assets/Health.gif?raw=true',
					iconSize: [32, 47.2],
				})
			},
			{
				id: 4,
				name: 'Real Jardín Botánico de Madrid',
				conversation_ids: ['4rffhe8wa9'],
				coords: {latitude: 40.41109, longitude: -3.68978},
				logo: 'https://github.com/PDIS/Holopolis-Map/blob/master/src/assets/EDUCATION.png?raw=true',
				icon: L.icon({
					iconUrl: 'https://github.com/PDIS/Holopolis-Map/blob/master/src/assets/EDUCATION.gif?raw=true',
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

