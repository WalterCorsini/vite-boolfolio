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
            errors: []
        }
    },
    methods: {
        sendForm() {
            axios.post(`${this.store.apiBaseUrl}/api/leads`, this.form)
                .then((resp) => {
                    this.resetInput();
                })
                .catch((err) => {
                    if (err.response.status === 422) {
                    console.log(err);
                        // console.log(err.response.data.errors);
                        this.errors = err.response.data.errors;
                    }
                });
        },
        resetInput(){
            console.log("ciao");
            this.form.name ="";
            this.form.lastname ="";
            this.form.email ="";
            this.form.phone_number ="";
            this.form.message ="";
        }
    }
}
</script>

<template>

    <div class="container m-auto p-5">
        <h1 class="text-center">contatti</h1>
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
                <div class="col">
                    <label for="email">Email</label>
                    <input type="text" name="email" v-model="form.email" class="form-control"
                        :class="{ 'is-invalid': errors.email }">
                    <div class="invalid-feedback" v-if="errors.email">{{ errors.email[0] }}</div>
                </div>

                <div class="col">
                    <label for="phone_number">Telefono</label>
                    <input type="text" name="phone_number" class="mb-3 form-control" v-model="form.phone_number"
                        :class="{ 'is-invalid': errors.phone_number }">
                    <div class="invalid-feedback" v-if="errors.phone_number">{{ errors.phone_number[0] }}</div>
                </div>
            </div>

            <div class="row container">
                <label for="message">Messaggio: </label>
                <textarea name="message" id="message" cols="30" rows="10" v-model="form.message"
                    :class="{ 'is-invalid': errors.message }"></textarea>
                <div class="invalid-feedback" v-if="errors.message">{{ errors.message[0] }}</div>
            </div>

            <button class="btn btn-success mt-2" type="submit" @click.prevent="sendForm()"> clicca</button>
        </form>

    </div>


</template>

<style lang="scss" scoped></style>

