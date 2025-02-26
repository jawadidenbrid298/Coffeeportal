// import React, {useState, useEffect} from 'react';
// import {View, Text, ActivityIndicator, Alert, StyleSheet, TouchableOpacity} from 'react-native';
// import MapView, {Marker, Polyline} from 'react-native-maps';
// import * as Location from 'expo-location';

// const haversineDistance = (coords1, coords2) => {
//   const toRad = (value) => (value * Math.PI) / 180;
//   const R = 6371;
//   const dLat = toRad(coords2.latitude - coords1.latitude);
//   const dLon = toRad(coords2.longitude - coords1.longitude);
//   const lat1 = toRad(coords1.latitude);
//   const lat2 = toRad(coords2.latitude);

//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);

//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c;
// };

// const LocationScreen = () => {
//   const [location, setLocation] = useState(null);
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [savedLocation, setSavedLocation] = useState(null);
//   const [distance, setDistance] = useState(null);

//   useEffect(() => {
//     const fetchLocation = setTimeout(async () => {
//       let {status} = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         setErrorMsg('Permission to access location was denied');
//         Alert.alert('Permission Denied', 'Please enable location services.');
//         setLoading(false);
//         return;
//       }

//       let locationData = await Location.getCurrentPositionAsync({});
//       setLocation(locationData);
//       setSelectedLocation(locationData.coords);
//       setLoading(false);
//     }, 3000);

//     return () => clearTimeout(fetchLocation);
//   }, []);

//   const handleMapPress = (event) => {
//     const newLocation = event.nativeEvent.coordinate;
//     setSelectedLocation(newLocation);

//     if (savedLocation) {
//       const calculatedDistance = haversineDistance(savedLocation, newLocation);
//       setDistance(calculatedDistance.toFixed(2)); // Distance in km
//     }
//   };

//   const handleConfirmLocation = () => {
//     if (selectedLocation) {
//       setSavedLocation(selectedLocation);
//       setDistance(null);
//       Alert.alert('Location Saved', `Latitude: ${selectedLocation.latitude}\nLongitude: ${selectedLocation.longitude}`);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {loading ? (
//         <ActivityIndicator size='large' color='#0000ff' />
//       ) : errorMsg ? (
//         <Text>{errorMsg}</Text>
//       ) : (
//         <>
//           <View style={styles.mapContainer}>
//             <MapView
//               style={styles.map}
//               initialRegion={{
//                 latitude: location?.coords.latitude,
//                 longitude: location?.coords.longitude,
//                 latitudeDelta: 0.01,
//                 longitudeDelta: 0.01
//               }}
//               onPress={handleMapPress}
//               showsUserLocation={true}>
//               {savedLocation && <Marker coordinate={savedLocation} title='Saved Location' pinColor='green' />}

//               {selectedLocation && (
//                 <Marker
//                   coordinate={selectedLocation}
//                   title='Selected Location'
//                   description='Tap elsewhere to change location'
//                 />
//               )}

//               {savedLocation && selectedLocation && (
//                 <Polyline
//                   coordinates={[savedLocation, selectedLocation]}
//                   strokeColor='blue'
//                   strokeWidth={3}
//                   lineDashPattern={[5, 5]} // Dashed line effect for footsteps
//                 />
//               )}
//             </MapView>
//           </View>

//           <TouchableOpacity style={styles.button} onPress={handleConfirmLocation}>
//             <Text style={styles.buttonText}>Confirm Location</Text>
//           </TouchableOpacity>

//           {savedLocation && (
//             <Text style={styles.savedLocationText}>
//               Saved Location: {savedLocation.latitude}, {savedLocation.longitude}
//             </Text>
//           )}

//           {distance && <Text style={styles.distanceText}>Distance: {distance} km</Text>}
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 20,
//     alignItems: 'center'
//   },
//   mapContainer: {
//     width: '90%',
//     height: '40%',
//     margin: 20,
//     borderWidth: 2,
//     borderColor: '#C67C4E',
//     borderRadius: 10,
//     overflow: 'hidden'
//   },
//   map: {
//     width: '100%',
//     height: '100%'
//   },
//   button: {
//     marginTop: 10,
//     backgroundColor: '#C67C4E',
//     padding: 12,
//     borderRadius: 20,
//     alignItems: 'center',
//     width: '50%'
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold'
//   },
//   savedLocationText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: '#333'
//   },
//   distanceText: {
//     marginTop: 10,
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#007AFF'
//   }
// });

// export default LocationScreen;

import React from 'react';

function LocationScreen() {
  return <div>locationScreen</div>;
}

export default LocationScreen;
