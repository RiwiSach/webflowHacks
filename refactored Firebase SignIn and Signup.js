/*
Import these first for Firebase to work
https://www.gstatic.com/firebasejs/8.6.3/firebase-app.js
https://www.gstatic.com/firebasejs/8.6.3/firebase-auth.js

*/
const firebaseConfig = {
    apiKey: "AIzaSyAX0S0Bc2cXJzFrwpyNFceliiEOhU9mNdE",
    authDomain: "aasaanwill-71e30.firebaseapp.com",
    projectId: "aasaanwill-71e30",
    storageBucket: "aasaanwill-71e30.appspot.com",
    messagingSenderId: "763808574672",
    appId: "1:763808574672:web:bdc8320f0eb39d24eb02d5",
    measurementId: "G-KBS5KTFL8S"
};
//const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
//import {getAuth, onAuthStateChanged} from "firebase/auth";
//const auth = getAuth();
const privatePages = [
    '/payment',
    '/details'
];
const publicPages = [
    '/signup',
    '/login'
];
auth.onAuthStateChanged(user => {
    const currentPath = window.location.pathname;
    if (user) {
        //User is signed in.
        localStorage.setItem("user", JSON.stringify(user));
        if (publicPages.includes(currentPath)) {
            window.location.replace('/');
        } else {
            //console.log('User is logged in!');
            //console.log('logged in Email:' + user.email);
            // console.log('UID:' + user.uid);  
            navSignupbtn.style.display = 'none';
            loginLink.style.display = 'none';
            const herobtn = document.querySelector('.get_started_text');
            herobtn.innerHTML = "Continue with My Will";
            const gsbtn1 = document.getElementById('gsbtn1');
            gsbtn1.innerHTML = "Continue with My Will";
            const gsbtn2 = document.getElementById('gsbtn2');
            gsbtn2.innerHTML = "Continue with My Will";
            const payment1 = document.getElementById('start_an_aw_text1');
            const payment2 = document.getElementById('start_an_aw_text2');
            payment1.innerHTML = "Continue with My Will";
            payment2.innerHTML = "Continue with My Will for Couples";
            const footer_register_link = document.getElementById("footer-register_link");
            footer_register_link.innerHTML = "My Will";
            //loadingScreen.style.display = 'none';
        }
    } else {
        // User is signed out
        if (privatePages.includes(currentPath)) {
            window.location.replace('/');
            const getstartedlinksignup = document.getElementById("getStarted");
            getstartedlinksignup.setAttribute('href', "/signup");
        } else {
            const herobtn = document.querySelector('.get_started_text');
            const gsbtn1 = document.getElementById('gsbtn1');
            const gsbtn2 = document.getElementById('gsbtn2');
            const getstarted3 = document.getElementById("getStarted3");
            const payment1 = document.getElementById('start_an_aw_text1');
            const payment2 = document.getElementById('start_an_aw_text2');
            const footer_register_link = document.getElementById("footer-register_link");
            //console.log('No User is logged in!');
            logoutLink.style.display = 'none';
            paymentLink.style.display = 'none';
            loadingScreen.style.display = 'none';
            detailsLink.style.display = 'none';
            herobtn.innerHTML = "Get Started Now";
            herobtn.setAttribute('href', "/signup");
            gsbtn1.setAttribute('href', "/signup");
            gsbtn1.innerHTML = "Get Started Now";
            gsbtn2.innerHTML = "Get an AasaanWill today!";
            getstarted3.setAttribute('href', "/signup");
            payment1.innerHTML = "Start an AasaanWill";
            payment2.innerHTML = "Start an AasaanWill for Couples";
            footer_register_link.innerHTML = "Register";
            footer_register_link.setAttribute('href', "/signup");
        }
    }
});
const logout = () => {
    firebase.auth().signOut();
    window.location.replace('/');
    localStorage.clear();
}
logoutLink.addEventListener('click', logout);
const getUserDetails = () => {
    const user = localStorage.getItem("user")
    return user ? JSON.parse(user) : null
}
const getEmail = () => {
    const userDetails = getUserDetails()
    if (userDetails?.email) {
        return userDetails.email
    } else {
        throw new Error("Please log in to perform any operation")
    }
}
const isLoggedIn = () => !!getUserDetails()
console.log("GET USER", getUserDetails());
const doPayment = () => {
    if (isLoggedIn()) {} else {}
}
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
};
window.onload = (event) => {
    fetch("https://v1.nocodeapi.com/riri/webflow/zlqXhoWgqUremgjn/", requestOptions)
        .then(response => response.json())
        .then(data => {
            const emailOfLoggedInUser = getEmail();
            const getstartedlink = document.getElementById("getStarted");
            const getstartedlink2 = document.getElementById("getStarted2");
            const getstarted3 = document.getElementById("getStarted3");
            const footer_register_link = document.getElementById("footer-register_link");
            const herobtn = document.querySelector('.get_started_text');
            const gsbtn1 = document.getElementById('gsbtn1');
            const gsbtn2 = document.getElementById('gsbtn2');
            const payment1 = document.getElementById('start_an_aw_text1');
            const payment2 = document.getElementById('start_an_aw_text2');
            data.items
                .filter(item => item.email === emailOfLoggedInUser)
                .forEach(item => {
                    document.getElementById("paymentLink").style.display = "none";
                    getstartedlink.setAttribute('href', "/profile");
                    getstartedlink2.setAttribute('href', "/profile");
                    footer_register_link.setAttribute('href', "/profile");
                    herobtn.innerHTML = "Continue with My Will";
                    herobtn.setAttribute('href', "/profile");
                    gsbtn1.innerHTML = "Continue with My Will";
                    gsbtn1.setAttribute('href', "/profile");
                    gsbtn2.innerHTML = "Continue with My Will";
                    getstarted3.setAttribute('href', "/profile");
                    payment1.innerHTML = "Continue with My Will";
                    payment2.innerHTML = "Continue with My Will for Couples";
                    payment1.setAttribute('href', "/profile");
                    payment2.setAttribute('href', "/profile");
                })
            data.items
                .filter(item => item.email !== emailOfLoggedInUser)
                .forEach(item => {
                    document.getElementById("detailsLink").style.display = "none";
                    getstartedlinkpayment.setAttribute('href', "/payment");
                    getstartedlinkpayment2.setAttribute('href', "/payment");
                    footer_register_link.setAttribute('href', "/payment");
                    getstarted3.setAttribute('href', "/payment");
                    payment1.innerHTML = "Continue with My Will";
                    payment2.innerHTML = "Continue with My Will for Couples";
                    payment1.setAttribute('href', "/payment");
                    payment2.setAttribute('href', "/payment");
                })
            loadingScreen.style.display = 'none';
        })
        .catch(error => console.log('error', error));
};