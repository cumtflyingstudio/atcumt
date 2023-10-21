<script>
export default {

}
</script>

<template>
  <div />
</template>

<style  scoped>
body {
    background: #cbc0dc;
}

.container{
    margin: auto;
    width: 650px;
    height: 550px;
    /* 相对定位 */
    position: relative;
}

.welcome{
    background: #f6f6f6;
    width: 650px;
    height: 415px;
    /* 绝对定位 */
    position: absolute;
    top: 25%;
    border-radius: 5px;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
}
.pinkbox{
    position: absolute;
    top: -10%;
    left: 5%;
    background: #eac7cc;
    width: 320px;
    height: 500px;
    border-radius: 5px;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
    /* 稍微的慢0.5秒展示 */
    transition: all 0.5s ease-in-out;
    z-index: 2;
}

.nodisplay{
    display: none;
    transition: all 0.5s ease;
}

.leftbox , .rightbox{
    position: absolute;
    width: 50%;
    transition: all 0.5s ease;
}

.leftbox{
    left: -2%;
}

.rightbox{
    right: -2%;
}

h1{
    font-family: "Open Sans", sans-serif;
    text-align: center;
    margin-top: 95px;
    color: #f6f6f6;
    font-size: 2em;
    letter-spacing: 8px;
}

.title{
    font-family: "Lora", serif;
    color: #8E9AAF;
    font-size: 1.8em;
    line-height: 1.1em;
    letter-spacing: 3px;
    text-align: center;
    font-weight: 300;
    margin-top: 20%;
}

.desc{
    margin-top: -8px;
}

.account{
    margin-top: 45%;
    font-size: 10px;
}

p{
    font-family: "Open Sans", sans-serif;
    font-size: 0.7em;
    letter-spacing: 2px;
    color: #8E9AAF;
    text-align: center;
}

span{
    color: #eac7cc;
}

.flower{
    position: absolute;
    width: 120px;
    height: 120px;
    top: 46%;
    left: 29%;
    opacity: 0.7;
}

.smaller{
    width: 90px;
    height: 100px;
    top: 48%;
    left: 38%;
    opacity: 0.9;
}

.button{
    padding: 12px;
    font-family: "Open Sans", sans-serif;
    letter-spacing: 3px;
    font-size: 11px;
    border-radius: 10px;
    margin: auto;
    outline: none;
    display: block;
}

.button:hover{
    background: #eac7cc;
    color: #f6f6f6;
    transition: background-color 1s ease-out ;
}

.button{
    margin-top: 3%;
    background: #f6f6f6;
    color: #eac7cc;
    border: solid 1px #eac7cc;
}

form{
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 7px;
}

.more-padding{
    padding-top: 35px;
}

.more-padding input{
    padding: 12px;
}

.more-padding .submit{
    margin-top: 45px;
}

.submit{
    margin-top: 25px;
    padding: 12px;
    border-color: #ce7d88;
}

.submit:hover{
    background: #CBC0D3;
    border-color: #bfb1c9;
}

input{
    background: #eac7cc;
    width: 65%;
    color: #ce7d88;
    border: none;
    border-bottom: 1px solid rgba(246, 246, 246, 0.5);
    padding: 9px;
    margin: 7px;
}

input::placeholder{
    color: #f6f6f6;
    letter-spacing: 2px;
    font-size: 1.3em;
    font-weight: 100;
}

input:focus{
    color: #ce7d88;
    outline: none;
    border-bottom: 1.2px solid rgba(206, 125, 136, 0.7);
    font-size: 1em;
    transition: 0.8s all ease;

}

input:focus::placeholder{
    opacity: 0;
}

label{
    font-family: "Open Sans", sans-serif;
    color: #ce7d88;
    font-size: 0.8em;
    letter-spacing: 1px;
}

.checkbox{
    display: inline;
    white-space: nowrap;
    position: relative;
    left: -62px;
    top: 5px;
}
input[type=checkbox]{
    width: 7px;
    background: #ce7d88;
}

input[type=checkbox]:checked + label{
    color: #ce7d88;
    transition: 0.5s all ease;
}
</style>
