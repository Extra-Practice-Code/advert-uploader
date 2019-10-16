/* global fetch, FormData, Vue */

const app = new Vue({
  el: '#app',
  data: {
    step: 0,
    mainPicture: null,
    mainPictureURL: null,
    productTitle: null,
    productPrice: null,
    uploadingPhoto: false,
    publishing: false
  },
  methods: {
    nextStep: function () {
      this.step += 1
    },
    uploadPhoto: async function () {
      if (!this.uploadingPhoto) {
        const pictures = document.getElementById('pictures').files[0]
        const formData = new FormData()

        this.uploadingPhoto = true

        formData.append('pictures', pictures)

        const response = await fetch('https://assets.e-rob.nl', {method: 'POST', body: formData})
        this.mainPictureURL = await response.text()
        this.nextStep()
      }
    },
    resetPhoto: function () {
      this.uploadingPhoto = false
      this.mainPicture = null
      this.mainPictureURL = null
      this.step = 1
    },
    editDetails: function () {
      this.step = 3
    },
    publish: async function () {
      this.publishing = true

      fetch('https://marketplace.e-rob.nl/api/collections/save/uploads?token=account-311b5b245eceac5ab10804a2c0417d', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: {
            title: this.productTitle,
            price: this.productPrice,
            image: this.mainPictureURL }
        })
      })
        .then(res => res.json())
        .then(entry => console.log(entry))

      this.step = 5
    }
  }
})
