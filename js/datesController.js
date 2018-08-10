/* Display shows in HTML table */

var today = new Date()

for (let show of shows) {
    var showDate = new Date(show[0].substr(6,4) + "-" + show[0].substr(3,2) + "-" + show[0].substr(0,2))
    var isComing

    if ((showDate.getTime() - today.getTime()) > 0) {
        isComing = true
    } else {
        isComing = false
    }

    var showElement = document.createElement("tr")
    var dateElement = document.createElement("td")
    var locationElement = document.createElement("td")
    dateElement.appendChild(document.createTextNode(show[0]))
    locationElement.appendChild(document.createTextNode(show[1]))
    showElement.appendChild(dateElement)
    showElement.appendChild(locationElement)

    var coming = document.querySelector("#coming tbody")
    var past = document.querySelector("#past tbody")

    if (isComing == true) {
        coming.appendChild(showElement)
    } else {
        if (!past.hasChildNodes()) {
            past.appendChild(showElement)
        } else {
            past.insertBefore(showElement, past.firstElementChild)
        }
    }
}
