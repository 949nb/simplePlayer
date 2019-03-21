function $(selector){
  return document.querySelector(selector)
}
function $$(selector){
  return document.querySelectorAll(selector)
}

var music1 = new Audio()
var singer = $('.singer')
var title = $('.title')



function getMusic(callback) {
  var xhr = new XMLHttpRequest()
  xhr.open('GET', '/music.json', 'true')
  xhr.send()
  xhr.onload = function () {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
      callback(JSON.parse(xhr.responseText))
    }else{
      console.log('获取数据失败')
    }
}}

currentIndex = 0;
getMusic((list)=>{
  playMusic(list[currentIndex])
})

function playMusic(musicObj){
  music1.src = musicObj.src
  console.log(music1)
  $("#bofang").addEventListener('click',function(){
    title.innerText = musicObj.title;
    console.log(musicObj.title)
    singer.innerText = musicObj.singer;
    if($("#bofang").classList.contains('onPlay')){
      music1.pause()
      $("#bofang").classList.remove('onPlay')
    }else{
      $("#bofang").classList.add('onPlay')
      music1.play()
    }
  })
}

music1.ontimeupdate = function(){
  $(".real-bar").style.width = (this.currentTime/this.duration)*100 + "%";
  var songTime = Math.floor(this.currentTime)
  console.log(songTime)
  var min = Math.floor(songTime/60)
  var sec = Math.floor(songTime%60)+''
  sec = sec.length===2?sec:'0'+sec
  // console.log(min+':'+sec)
  $('.time').innerText = '0'+min+':'+sec;
}
