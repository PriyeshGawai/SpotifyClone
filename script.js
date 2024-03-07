console.log("Welcome to spotify");

let songIndex=0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('MyProgressBar');
let gif=document.getElementById('gif');
let masterSongName=document.getElementById('masterSongName');
let songItems=Array.from(document.getElementsByClassName('SongItem'));
let song=[
    {SongName:"Chunnari Chunnari.mp3", filepath:"songs/1.mp3", coverpath:"images/1.jpg"},
    {SongName:"Gulabi Sharara.mp3" ,filepath:"songs/2.mp3", coverpath:"images/2.jpg"},
    {SongName:"Ye Jo teri paylo ki.mp3" ,filepath:"songs/3.mp3", coverpath:"images/3.jpg"},
    {SongName:"Chunnari Chunnari.mp3" ,filepath:"songs/4.mp3", coverpath:"images/3.jpg"}
]

songItems.forEach((element,i) => {
    // console.log(element ,i);
    element.getElementsByTagName("img")[0].src=song[i].coverpath;
    element.getElementsByClassName("songName")[0].innerText=song[i].SongName;
});

// audioElement.play();

// Handel play/pause click
masterPlay.addEventListener('click',()=>{
if(audioElement.paused ||audioElement.currentTime<=0){
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity=1;
}
else{
    audioElement.pause();
    masterPlay.classList.add('fa-circle-play');
    masterPlay.classList.remove('fa-circle-pause');
    gif.style.opacity=0;
}

});


// listen to Event
audioElement.addEventListener('timeupdate',()=>{
// console.log('timeupdate');
// update seekbar
progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
// console.log(progress);
myProgressBar.value=progress;
});

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime=(myProgressBar.value*audioElement.duration)/100;
});

const makeAllPlays =()=>{
    Array.from(document.getElementsByClassName("SongItemPlay")).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    } 
)}


Array.from(document.getElementsByClassName("SongItemPlay")).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        //console.log(e.target);
        if(audioElement.paused ||audioElement.currentTime<=0){
            makeAllPlays();
             songIndex=e.target.id;
            masterSongName.innerText=song[songIndex-1].SongName;
            gif.style.opacity=1;
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.src='songs/'+(songIndex+'.mp3');
            audioElement.currentTime=0;
            audioElement.play();
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
        }
        else{
            //makeAllPlays();
            songIndex=e.target.id;
            masterSongName.innerText=song[songIndex-1].SongName;
            gif.style.opacity=0;
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            audioElement.src='songs/'+(songIndex+'.mp3');
            audioElement.currentTime=0;
            audioElement.pause();
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
           
        }
    })
});

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>3) songIndex=1;
    else songIndex++;
    audioElement.src='songs/'+(songIndex+'.mp3');
    gif.style.opacity=1;
    masterSongName.innerText=song[songIndex-1].SongName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause'); 
    songIndex.classList.remove('fa-circle-play');
    songIndex.classList.add('fa-circle-pause');
});

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<1) songIndex=4;
    else songIndex--;
    audioElement.src='songs/'+(songIndex+'.mp3');
    gif.style.opacity=1;
    masterSongName.innerText=song[songIndex-1].SongName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.add('fa-circle-play');
    masterPlay.classList.remove('fa-circle-pause');
    songIndex.classList.remove('fa-circle-play');
    songIndex.classList.add('fa-circle-pause');
});
