<template>
  <div class="os-STYLE">
    <ul class="flex flex-col gap-2">
      <li v-for="track in tracks" :key="track.id">
        <!--  TODO: THIS WAS A UI COMP-->
        <button
          type="button"
          @click="onPlayAsPlaylist(tracks, track)"
          class="main-glossy-button bg-green-500! flex items-center justify-center inline-flex w-8 h-8 align-middle mr-2"
        >
          <Icon :name="isTrackPlaying(track.id) ? 'material-symbols:pause-rounded' : 'material-symbols:play-arrow'" class="text-white text-lg" />
        </button>
        {{ track.title }}
      </li>
    </ul>
  </div>
  <MusicFlow :options="{ autoplay: true }" />
</template>

<script setup lang="ts">
import "vue-music-flow/dist/vue-music-flow.css";
import { MusicFlow, useMusicFlow, type TMusicFlow } from "vue-music-flow";

const { onPlayAsPlaylist, isTrackPlaying } = useMusicFlow();

const tracks: TMusicFlow[] = [
  {
    id: 1,
    audio: "/music/Skrillex - Scary Monsters and Nice Sprites MIDI Edition.mp3",
    title: "Scary Monsters And Nice Sprites MIDI Edition",
    artist: "Skrillex",
    artwork: "https://placehold.co/512x512",
    album: "Scary Monsters and Nice Sprites",
    original: {
      source: "https://ik.imagekit.io/ltdassets/public/audio/edm/all-world-music/",
    },
  },
];
</script>

<style>
@import "~/assets/css/operating-system.css";
</style>
