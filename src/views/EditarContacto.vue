<template>
  <div class="container mt-3">
    <h3>Editar contacto</h3>
    <div class="alert alert-danger" role="alert" v-if="errorMensaje">
        {{ errorMensaje }}
    </div>
    <form @submit.prevent="editarContacto">
        <div class="mb-3">
            <label class="form-label">Nombre:</label>
            <input class="form-control" type="text" v-model="contacto.nombre">
        </div>
        <div class="mb-3">
            <label class="form-label">Email:</label>
            <input class="form-control"  type="text" v-model="contacto.email">
        </div>
        <div class="mb-3">
            <label class="form-label">Telefono</label>
            <input class="form-control" type="text" v-model="contacto.telefono">
        </div>
        <button class="btn btn-primary" type="submit">Editar contacto</button>
        <button class="btn btn-secondary" type="submit" @click="cancelar()">Cancelar</button>
    </form>
  </div>
</template>

<script>
  import axios from 'axios'
  const backend_url = import.meta.env.VITE_BACKEND_URL;

export default {
    props: ['id'],
    data() {
        return {
            errorMensaje: "",
            contacto: {
                nombre: '',
                email: '',
                telefono: ''
            }
        }
    },
    async mounted() {
        const contactos_api = await axios.get(`${backend_url}/contacto/${this.id}`);
        if (contactos_api.data) {
            this.contacto.nombre = contactos_api.data.nombre;
            this.contacto.email = contactos_api.data.email;
            this.contacto.telefono = contactos_api.data.telefono;
        }
    },
    methods: {
        async editarContacto() {
            try {
                await axios.patch(`${backend_url}/contacto/${this.id}`, this.contacto);
                this.$router.push({path: "/"});
            } catch (mensajeError) {
                this.errorMensaje = "No se pudo almacenar el cambio en la base de datos"
            }
        },
        cancelar() {
            this.$router.push({path: "/"});
        }
    }
}
</script>

<style>

</style>