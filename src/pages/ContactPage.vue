<script>
import axios from 'axios';
import { store } from '../store';

export default {
    data() {
        return {
            form: {
                name: "",
                lastname: "",
                email: "",
                phone_number: "",
                message: "",
            },
            store,
            errors: [],
            isSend: false,
            isLoading: false,
        }
    },
    methods: {
        sendForm() {
    this.errors = [];
    this.isLoading = true;
    console.log('Invio form iniziato');
    axios.post(`${store.apiBaseUrl}/api/leads`, this.form)
        .then((resp) => {
            console.log('Risposta ricevuta:', resp);
            this.isLoading = false;
            this.isSend = true;
            this.resetInput();
            setTimeout(() => {
                this.isSend = false;
                console.log('Timeout completato'); 
            }, 5000);
        })
        .catch((err) => {
            this.isLoading = false;
            if (err.response && err.response.status === 422) {
                console.log(err);
                this.errors = err.response.data.errors;
            }
        });
},
        resetInput() {
            console.log("Reset input");
            this.form.name = "";
            this.form.lastname = "";
            this.form.email = "";
            this.form.phone_number = "";
            this.form.message = "";
        }
    }
}
</script>

<template>

    <div class="container m-auto p-5">
        <h1 class="text-center">contatti</h1>
        <div v-if="isSend === true" class="alert alert-success text-center">
            messaggio inviato correttamente
        </div>
        <form>
            <div class="row container">
                <div class="col">
                    <label for="name">Nome</label>
                    <input type="text" name="name" v-model="form.name" class="form-control"
                        :class="{ 'is-invalid': errors.name }">
                    <div class="invalid-feedback" v-if="errors.name">{{ errors.name[0] }}</div>
                </div>

                <div class="col">
                    <label for="lastname">Cognome</label>
                    <input type="text" name="lastname" v-model="form.lastname" class="form-control"
                        :class="{ 'is-invalid': errors.lastname }">
                    <div class="invalid-feedback" v-if="errors.lastname">{{ errors.lastname[0] }}</div>
                </div>
            </div>

            <div class="row container">

                <!-- email -->
                <div class="col">
                    <label for="email">Email</label>
                    <input type="text" name="email" v-model="form.email" class="form-control"
                        :class="{ 'is-invalid': errors.email }">
                    <div class="invalid-feedback" v-if="errors.email">{{ errors.email[0] }}</div>
                </div>
                <!-- /email -->

                <!-- phone_number -->
                <div class="col">
                    <label for="phone_number">Telefono</label>
                    <input type="text" name="phone_number" class="mb-3 form-control" v-model="form.phone_number"
                        :class="{ 'is-invalid': errors.phone_number }">
                    <div class="invalid-feedback" v-if="errors.phone_number">{{ errors.phone_number[0] }}</div>
                </div>
                <!-- /phone_number -->
            </div>

            <!-- message -->
            <div class="row container">
                <label for="message">Messaggio: </label>
                <textarea name="message" id="message" cols="30" rows="10" v-model="form.message"
                    :class="{ 'is-invalid': errors.message }"></textarea>
                <div class="invalid-feedback" v-if="errors.message">{{ errors.message[0] }}</div>
            </div>
            <!-- /message -->

            <!-- button -->
            <button role="status" class="btn btn-success mt-2 d-flex gap-2" :class="{ 'disabled': isLoading === true }"
                type="submit" @click.prevent="sendForm()">
                <span>
                    clicca
                </span>
                <span v-show="isLoading === true" class="spinner-border text-white"></span>
            </button>
            <!-- /button -->

        </form>

    </div>


</template>

<style lang="scss" scoped></style>
