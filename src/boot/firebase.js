import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDdl-cjpanhdV7tpr5ZbHnS81SJelmQ0u0",
  authDomain: "awesome-todo-f0655.firebaseapp.com",
  databaseURL: "https://awesome-todo-f0655.firebaseio.com",
  projectId: "awesome-todo-f0655",
  storageBucket: "awesome-todo-f0655.appspot.com",
  messagingSenderId: "300235121064",
  appId: "1:300235121064:web:0e384c146121e76bba3d9d"
};

let firebaseApp = firebase.initializeApp(firebaseConfig);

let firebaseAuth = firebaseApp.auth();
let firebaseDb = firebaseApp.database();

export { firebaseAuth, firebaseDb };
