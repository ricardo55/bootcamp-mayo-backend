const concat = require('ffmpeg-concat')
const glob = require('glob')

//an array of video path to concatenate
const videos = glob.sync('/home/username/Downloads/clips/*.mp4')

const output = './output/concatenated.mp4'

//a function to merge an array of videos with custom music
//and a transition fadegrayscale of 500ms duration between videos.
async function oneTransitionMergeVideos() {
    await concat({
        output,
        videos,
        audio: "/home/username/Downloads/music/music.m4a",
        transition: {
            name: "fadegrayscale",
            duration: 500
        }
    });
}

oneTransitionMergeVideos()