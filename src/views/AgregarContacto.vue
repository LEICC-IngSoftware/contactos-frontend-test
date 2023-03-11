<template>
  <div class="container mt-3">
    <h3>Agregar contacto</h3>
    <div class="alert alert-danger" role="alert" v-if="errorMensaje">
        {{ errorMensaje }}
    </div>
    <form @submit.prevent="crearContacto">
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
        <button class="btn btn-primary" type="submit">Crear contacto</button>
        <button class="btn btn-secondary" type="submit" @click="cancelar()">Cancelar</button>
    </form>
  </div>
</template>

<script>
    const backend_url = import.meta.env.VITE_BACKEND_URL;
    import axios from 'axios'

    export default {
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
        methods: {
            async crearContacto() {
                try {
                    await axios.post(`${backend_url}/contacto`, this.contacto);
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