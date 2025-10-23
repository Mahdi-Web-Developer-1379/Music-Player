let wrapper=document.querySelector(".wrapper")
let imageElem=document.querySelector(".image-area img")
let musicName=document.querySelector(".name-artist .name")
let musicArtists=document.querySelector(".name-artist .artists")
let audioElem=document.querySelector("#audioElement")
let playPauseBtn=document.querySelector(".play-pause")
let playPauseBtnI=document.querySelector(".play-pause i")
let backwardBtn=document.querySelector("#backward")
let forwardBtn=document.querySelector("#forward")
let ReapetBtn=document.querySelector("#Reapet")
let progressArea=document.querySelector(".progress-area")
let progressBar=document.querySelector(".progress-bar")
let currentElem=document.querySelector(".current")
let durationElem=document.querySelector(".duration")
let ListsUlBtn=document.querySelector("#music-Lists-Ul")
let musiclistElem=document.querySelector(".music-list")
let ullistsElem=document.querySelector(".ul-lists")
let closeElem=document.querySelector("#close")


let musicIndex=1

window.addEventListener("load",function () {
    loaded()
})

function loaded() {
    imageElem.src=`../ImagesFile/${allMusic[musicIndex].img}.jpg`
    musicName.innerText=allMusic[musicIndex].name
    musicArtists.innerText=allMusic[musicIndex].artist
    audioElem.src=`../MusicFile/${allMusic[musicIndex].src}.mp3`
    updateTime()
}


///////////////////////////////Control Click

playPauseBtn.addEventListener("click", ()=> {
    
    let Isplaymusic=wrapper.classList.contains("pause")

    Isplaymusic ? pauseMusic():playMusic();
})

function playMusic() {
    audioElem.play()
    wrapper.classList.add("pause")
    playPauseBtnI.className="fa fa-pause"
}

function pauseMusic() {
    audioElem.pause()
    wrapper.classList.remove("pause")
    playPauseBtnI.className="fa fa-play"
}

    forwardBtn.addEventListener("click", ()=> {
      nextMusic()
    })



    function nextMusic() {

    musicIndex++

        if (musicIndex>(allMusic.length)-1) {
             musicIndex=0
        }

    loaded()
    playMusic()

}
    

backwardBtn.addEventListener("click", ()=> {
    musicIndex--
    if (musicIndex<0) {
        musicIndex=(allMusic.length)-1
    }
    loaded()
    playMusic()

})



ReapetBtn.addEventListener("click",function () {
    switch (ReapetBtn.className) {
        case "fas fa-retweet":
            ReapetBtn.className="fas fa-random"
            break;
        case "fas fa-random":
            ReapetBtn.className="fas fa-sync-alt"
            break;
        case "fas fa-sync-alt":
            ReapetBtn.className="fas fa-retweet"
            break;
                default:
            break;
    }
})


audioElem.addEventListener("ended",function () {
    switch (ReapetBtn.className) {
        case "fas fa-retweet":
           nextMusic()
            console.log(musicIndex);
            break;
        case "fas fa-random":
            musicIndex=Math.floor(Math.random()*allMusic.length) 
            loaded()
            playMusic()
            console.log(musicIndex);
            break;
        case "fas fa-sync-alt":
           audioElem.currentTime=0
           audioElem.play()

            break;
                default:
            break;
    }


})







/////Timer

function updateTime() {
    
    audioElem.addEventListener("timeupdate", (e)=> {
       // console.log(e);
         musicDuration=e.target.duration
    
         musicCurrentTime=e.target.currentTime
    
         progressBar.style.width=`${(musicCurrentTime/musicDuration)*100}%`
         
    ////////////////////////////////////loadedData
    
         audioElem.addEventListener("loadeddata", (e)=> {
            musicDuration=e.target.duration
            MinDuration=Math.floor(musicDuration/60)
    
            MinDuration<10 ? MinDuration=`0${MinDuration}`: MinDuration=MinDuration
            
    
            secDuration=Math.floor(musicDuration%60)
            secDuration<10 ? secDuration=`0${secDuration}`: secDuration=secDuration
    
            durationElem.innerText=`${MinDuration}:${secDuration}`
         })
    //////////////////////////////////////
    
         MincurrentTime=Math.floor(musicCurrentTime/60)
         MincurrentTime<10 ? MincurrentTime=`0${MincurrentTime}`: MincurrentTime=MincurrentTime
    
         seccurrentTime=Math.floor(musicCurrentTime%60)
         seccurrentTime<10 ? seccurrentTime=`0${seccurrentTime}`: seccurrentTime=seccurrentTime
    
    
         currentElem.innerText=`${MincurrentTime}:${seccurrentTime}`
        
    
    })
    
}


/////////////////progressArea
progressArea.addEventListener("click",function (e) {
    
    audioElem.currentTime=(e.offsetX/progressArea.clientWidth)*audioElem.duration

    updateTime()
    /*
    console.log(e.offsetX);
    console.log(progressArea.clientWidth);
    console.log((e.offsetX/progressArea.clientWidth)*100+"%");
    */


})




///////////////////////////////////MusicLists

ListsUlBtn.addEventListener("click",function () {
    musiclistElem.style.opacity=1
    musiclistElem.style.bottom=0
    createLists()
})


function createLists() {
    for (let i= 0; i < allMusic.length;i++ ) {

        ullistsElem.insertAdjacentHTML("beforeend",
        `<li class="lists" li-index="${i}" >
        <div class="li-name-artist">
            <p class="li-name">${allMusic[i].name}</p>
            <p class="li-artist">${allMusic[i].artist}</p>
        </div>
        <audio id="${allMusic[i].name}" src="../MusicFile/${allMusic[i].src}.mp3"></audio>
        <span id="${allMusic[i].src}">ss</span>
          </li>`
          )

          let spanElemLi=document.getElementById(`${allMusic[i].src}`)
          let audioElemLi=document.getElementById(`${allMusic[i].name}`)
          
          
             audioElemLi.addEventListener("loadeddata",function (e) {
                musicDuration=e.target.duration
                MinDuration=Math.floor(musicDuration/60)
        
                MinDuration<10 ? MinDuration=`0${MinDuration}`: MinDuration=MinDuration
                
                secDuration=Math.floor(musicDuration%60)
                secDuration<10 ? secDuration=`0${secDuration}`: secDuration=secDuration
        
                spanElemLi.innerText=`${MinDuration}:${secDuration}`
             })
          
    }


    let liTags=ullistsElem.querySelectorAll("li")
    
    for (let i = 0; i < allMusic.length; i++) {
        
        liTags[i].setAttribute("onClick","clicked(this)")

    }

}


function clicked(elem) {
        //console.log(elem);
        let getindex=elem.getAttribute("li-index")
        musicIndex=getindex
        loaded()
        playMusic()
}



closeElem.addEventListener("click", ()=> {
    musiclistElem.style.bottom= `${-50}%`
    ullistsElem=""
})