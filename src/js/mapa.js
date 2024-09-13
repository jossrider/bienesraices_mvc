;(function () {
  const lat = document.querySelector('#lat').value || -25.341427
  const lng = document.querySelector('#lng').value || -57.507581
  let marker
  const mapa = L.map('mapa').setView([lat, lng], 13)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(mapa)

  // Utilizar Provider y Geocoder
  const geocodeService = L.esri.Geocoding.geocodeService()

  // El Pin
  marker = new L.marker([lat, lng], { draggable: true, autoPan: true }).addTo(mapa)

  // Detectar el movimiento del pin
  marker.on('moveend', function (e) {
    marker = e.target
    const posicion = marker.getLatLng()
    console.log(posicion)
    mapa.panTo(new L.LatLng(posicion.lat, posicion.lng))

    // Obtener la informacion de las calles
    geocodeService
      .reverse()
      .latlng(posicion, 13)
      .run(function (error, resultado) {
        // console.log(resultado)
        marker.bindPopup(resultado.address.LongLabel)

        // Llenar los campos
        document.querySelector('.calle').textContent = resultado?.address?.Address ?? ''
        document.querySelector('#calle').value = resultado?.address?.Address ?? ''
        document.querySelector('#lat').value = resultado?.latlng?.lat ?? ''
        document.querySelector('#lng').value = resultado?.latlng?.lng ?? ''
      })
  })
})()
