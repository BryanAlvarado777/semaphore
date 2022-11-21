lightsIndex = {"green":0,"orange":1,"red":2}
lights = [
    document.getElementById("light-green"),
    document.getElementById("light-orange"),
    document.getElementById("light-red")
]
timers = [0,0,0]
var currentLightColor
/**
 * Cambia la luz a la siguiente en el orden verde, amarillo, rojo. Luego espera y vuelve a cambiar la luz.
*/
function changeLight(){
    lights[currentLightColor].setAttribute("state",0)
    currentLightColor = (currentLightColor+1)%3
    lights[currentLightColor].setAttribute("state",1)
    setTimeout(changeLight,timers[currentLightColor]*1000)
}
/**
 * Lee la configuracion del semaforo, inicializa las variables timers y currentLightColor y comienza la ejecucion del ciclo del semaforo
*/
function initSemaphore(semaphoreConfig){
    currentLightColor = lightsIndex[semaphoreConfig.currentLightColor]
    semaphoreConfig.lights.forEach(lightSetting => {
        timers[lightsIndex[lightSetting.color]] = lightSetting.duration
    });
    lights[currentLightColor].setAttribute("state",1)
    setTimeout(changeLight,timers[currentLightColor]*1000)
}
/**
 * Se envia la peticion para obtener la configuracion del semaforo
*/
xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        semaphoreConfig = JSON.parse(this.responseText);
        initSemaphore(semaphoreConfig)
    }
  };
xhttp.open("GET","https://xompasssuiteadminstg.z20.web.core.windows.net/semaphore.json")
xhttp.send()