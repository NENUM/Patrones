function iniciarMapa(){
    const coord = {lat:4.7197657 ,lng:-74.2311452}
    let map = new google.maps.Map(document.getElementById('map'),{
        zoom:18,
        center: coord
    })
    let marker = new google.maps.Marker({
        position: coord,
        map: map
    })
}