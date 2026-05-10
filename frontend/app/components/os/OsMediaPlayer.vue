<template>
  <div>
    <ul class="flex flex-col gap-2">
      <li v-for="track in tracks" :key="track.id">
        <UButton
          :icon="isTrackPlaying(track.id) ? 'material-symbols:pause-rounded' : 'material-symbols:play-arrow'"
          type="button"
          @click="onPlayAsPlaylist(tracks, track)"
          :ui="{ leadingIcon: 'text-white' }"
          class="main-glossy-button bg-web-mm-primary-500!"
        />
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
