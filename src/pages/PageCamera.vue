<template>
  <q-page class="constrain-more q-pa-md">
    <div class="camera-frame q-pa-md">
      <video
        v-show="!imageCaptured"
        ref="video"
        class="full-width"
        autoplay
        playsinline
        />
      <canvas
        v-show="imageCaptured"
        ref="canvas"
        class="full-width"
        height="240"
        />
    </div>
    <div class="text-center q-pa-md">
      <q-btn
        v-if="hasCameraSupport"
        @click="captureImage"
        :disable="imageCaptured"
        color="grey-10"
        icon="eva-camera"
        size="lg"
        round
        />
      <div v-else class="row justify-center q-ma-md">
        <q-file
          accept="image/*"
          @input="captureImageFallback"
          outlined
          class="col col-sm-6"
          label="Choose an image"
          v-model="imageUpload">
          <template v-slot:prepend>
            <q-icon name="eva-attach-outline" />
          </template>
        </q-file>
      </div>
      <div class="row justify-center q-ma-md">
        <q-input
          v-model="post.caption"
          class="col col-sm-6"
          label="Caption *"
          dense
          />
      </div>
      <div class="row justify-center q-ma-md">
        <q-input
          v-model="post.location"
          :loading="locationLoading"
          class="col col-sm-6"
          label="Location"
          dense
          >
            <template v-slot:append>
              <q-btn
                v-if="!locationLoading && locationSupported"
                @click="getLocation"
                round dense flat
                icon="eva-navigation-2-outline" />
            </template>
          </q-input>
      </div>
      <div class="row justify-center q-mt-lg">
        <q-btn
          @click="addPost"
          :disable="!post.caption || !post.photo"
          unelevated
          rounded
          color="primary"
          label="Post Image"
          />
      </div>
    </div>
  </q-page>
</template>

<script>
import { uid } from 'quasar';
require('md-gum-polyfill');

import { dataURItoBlob } from 'src/util';

export default {
  name: 'PageCamera',
  data() {
    return {
      post: {
        id: uid(),
        caption: '',
        location: '',
        photo: null,
        date: Date.now(),
      },
      imageCaptured: false,
      imageUpload: [],
      hasCameraSupport: true,
      locationLoading: false,
    }
  },
  computed: {
    locationSupported() {
      return ('geolocation' in navigator);
    }
  },
  methods: {
    initCamera() {
      navigator.mediaDevices.getUserMedia({
        video: true
      }).then(stream => {
        this.$refs.video.srcObject = stream;
      }).catch(() => {
        this.hasCameraSupport = false;
      });
    },
    captureImage() {
      let video = this.$refs.video;
      let canvas = this.$refs.canvas;
      canvas.width = video.getBoundingClientRect().width;
      canvas.height = video.getBoundingClientRect().height;
      let context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      this.imageCaptured = true;
      this.post.photo = dataURItoBlob(canvas.toDataURL());
      this.disableCamera();
    },
    captureImageFallback(file) {
      this.post.photo = file;
      let canvas = this.$refs.canvas;
      let context = canvas.getContext('2d');

      var reader = new FileReader();
      reader.onload = event => {
        var img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img,0,0);
          this.imageCaptured = true;
        }
        img.src = event.target.result;
      }
      reader.readAsDataURL(file);
    },
    disableCamera() {
      this.$refs.video.srcObject.getVideoTracks().forEach(track => {
        track.stop();
      });
    },
    getLocation() {
      this.locationLoading = true;
      navigator.geolocation.getCurrentPosition(position => {
        this.getCityandCountry(position);
      }, () => {
        this.locationError();
      }, { timeout: 7000 });
    },
    getCityandCountry(position) {
      let apiUrl = `${ process.env.VUE_APP_API_URL_GEOLOCATION }/${ position.coords.latitude },${ position.coords.longitude }?json=1`;

      this.$axios.get(apiUrl).then(result => {
        this.locationSuccess(result);
      }).catch(() => {
        this.locationError();
      });
    },
    locationSuccess(result) {
      this.post.location = result.data.city;

      if (result.data.country) {
        this.post.location += `, ${ result.data.country }`;
      }
      this.locationLoading = false;
    },
    locationError() {
      this.$q.dialog({
        title: 'Error',
        message: 'Could not find your location!'
      });
      this.locationLoading = false;
    },
    addPost() {
      this.$q.loading.show();

      let formData = new FormData();
      formData.append('id', this.post.id);
      formData.append('caption', this.post.caption);
      formData.append('location', this.post.location);
      formData.append('date', this.post.date);
      formData.append('file', this.post.photo, `${this.post.id}.png`);

      this.$axios.post(`${ process.env.VUE_APP_API_PRODUCTION }/posts`, formData).then(response => {
        console.log('response: ', response);
        this.$router.push('/');
        this.$q.notify({
          message: 'Post Created!',
          actions: [
            { label: 'Dismiss', color: 'white' }
          ]
        });
        this.$q.loading.hide();
      }).catch(error => {
        console.log('error', error);
        this.$q.dialog({
          title: 'Error',
          message: 'Could not create post!'
        });
        this.$q.loading.hide();
      });
    },
  },
  mounted() {
    this.initCamera();
  },
  beforeDestroy() {
    if(this.hasCameraSupport) {
      this.disableCamera();
    }
  },
}
</script>

<style lang="scss">
.camera-frame {
  border: 2px solid $grey-10;
  border-radius: 10px;
}
</style>
