<script>
import axios from 'axios';
import { store } from '../store';
export default{
    data(){
        return{
            form:{
                name:"",
                lastname:"",
                email:"",
                phone_number:"",
                message:"",
            },
            store,
            errors:[]
        }
    },
    methods:{
        sendForm(){
            axios.post(`${this.store.apiBaseUrl}/api/leads`,this.form)
            .then((resp) =>{
                console.log(resp);
            })
            .catch((error)=>{
                if(error.response.status === 422){
                    console.log(error.response.data.errors);
                    this.errors = error.response.data.errors;
                }
            });
        }
    }
}
</script>

<template>
    <div class="container m-auto p-5">
        <h1 class="text-center">contatti</h1>
        <form action="" class="form-control d-flex flex-column">
            <label for="name">Nome</label>
            <input type="text" name="name" v-model="form.name" :class="{'is-invalid': errors.name}">
            <div class="invalid-feedback" v-if="errors.name">{{ errors.name[0] }}</div>

            <label for="lastname">Cognome</label>
            <input type="text" name="lastname" v-model="form.lastname" :class="{'is-invalid': errors.lastname}">
            <div class="invalid-feedback" v-if="errors.name">{{ errors.lastname[0] }}</div>



            <label for="email">Email</label>
            <input type="text" name="email" v-model="form.email" :class="{'is-invalid': errors.email}">
            <div class="invalid-feedback" v-if="errors.name">{{ errors.email[0] }}</div>


            <label for="phone_number">Telefono</label>
            <input type="text" name="phone_number" class="mb-3" v-model="form.phone_number" :class="{'is-invalid': errors.phone_number}">
            <div class="invalid-feedback" v-if="errors.name">{{ errors.phone_number[0] }}</div>

            <label for="message">Messaggio: </label>
            <textarea name="message" id="message" cols="30" rows="10" v-model="form.message" :class="{'is-invalid': errors.message}" ></textarea>
            <div class="invalid-feedback" v-if="errors.name">{{ errors.message[0] }}</div>
            
            <button type="submit" @click.prevent="sendForm()"> clicca</button>
        </form>

    </div>
</template>

<style lang="scss" scoped>
</style>