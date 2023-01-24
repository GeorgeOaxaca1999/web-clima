const APP_ID = '4090239d69cdb3874de692fd18539299';

let temperaturaValor = document.getElementById('temperatura-valor')  
let temperaturaDescripcion = document.getElementById('temperatura-descripcion')  
let ubicacion = document.getElementById('ubicacion')  
let iconoAnimado = document.getElementById('icono-animado') 
let vientoVelocidad = document.getElementById('velocidad-viento') 
let fecha = document.getElementById('date')
let humedad = document.getElementById('humedad')
let presion = document.getElementById('presion')

window.addEventListener('load', ()=> {
    let lon
    let lat

    if(navigator.geolocation){
       navigator.geolocation.getCurrentPosition( posicion => {
           //console.log(posicion.coords.latitude)
           lon = posicion.coords.longitude
           lat = posicion.coords.latitude
            //ubicación actual    
           const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${ APP_ID}`

           //ubicación por ciudad
           //const url = `http://api.openweathermap.org/data/2.5/weather?units=metric&q=Pachuca,Mexico&appid=${APP_ID}`;
           //console.log(url)

           fetch(url)
            .then( response => { return response.json()})
            .then( data => {
                //console.log(data)
                
                let temp = Math.floor(data.main.temp)
                //console.log(temp)
                temperaturaValor.textContent = `${temp} ° C`

                //console.log(data.weather[0].description)
                let desc = data.weather[0].description
                temperaturaDescripcion.textContent = desc.toUpperCase()
                ubicacion.textContent = data.name
                
                vientoVelocidad.textContent = `Velocidad del viento: ${data.wind.speed} m/s`
                fecha.textContent = getDate()
                humedad.textContent = `Humedad: ${data.main.humidity}%`
                presion.textContent = `Presion: ${data.main.pressure}`

                //para iconos dinámicos
                console.log(data.weather[0].main)
                switch (data.weather[0].main) {
                    case 'Thunderstorm':
                      iconoAnimado.src='animated/thunder.svg'
                      console.log('TORMENTA');
                      break;
                    case 'Drizzle':
                      iconoAnimado.src='animated/rainy-2.svg'
                      console.log('LLOVIZNA');
                      break;
                    case 'Rain':
                      iconoAnimado.src='animated/rainy-7.svg'
                      console.log('LLUVIA');
                      break;
                    case 'Snow':
                      iconoAnimado.src='animated/snowy-6.svg'
                        console.log('NIEVE');
                      break;                        
                    case 'Clear':
                        iconoAnimado.src='animated/day.svg'
                        console.log('LIMPIO');
                      break;
                    case 'Atmosphere':
                      iconoAnimado.src='animated/weather.svg'
                        console.log('ATMOSFERA');
                        break;  
                    case 'Clouds':
                        iconoAnimado.src='animated/cloudy-day-1.svg'
                        console.log('NUBES');
                        break;  
                    default:
                      iconoAnimado.src='animated/cloudy-day-1.svg'
                      console.log('por defecto');
                  }

                  cleanUp()
            })
            .catch( error => {
                console.log(error)
            })
       })
          
    }
})

const cleanUp = () => {
  let container = document.getElementById('container');
  let loader = document.getElementById('loader');

  loader.style.display = 'none'; 
  container.style.display = 'flex'; 
}

const getDate = () => {
  let date = new Date();
  return `${date.getDate()}-${ ('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
}
